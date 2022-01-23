import { getCurrentSlide, applySlideChanges } from './slides_actions';
import { AreaLocation, Coordinates, Editor, Size, Slide, SlideElement } from './types';

export function changeElementsSize(editor: Editor, cordsAndDimensions: AreaLocation): Editor {
    const currSlide: Slide | undefined = getCurrentSlide(editor);

    if (!currSlide) {
        return editor;
    }

    const slideIndex = editor.presentation.slidesList.findIndex((item) => {
        return item.id === currSlide.id;
    });

    if (!currSlide.elementsList.length) {
        return editor;
    }

    const xy = cordsAndDimensions.xy;
    const dimensions = cordsAndDimensions.dimensions;

    const previosAreaLocation = getElementsAreaLoaction(currSlide, getActiveElementsIds(editor));
    const dXY = {
        dx: previosAreaLocation ? xy.x - previosAreaLocation.xy.x : 0,
        dy: previosAreaLocation ? xy.y - previosAreaLocation.xy.y : 0,
    };
    const dDimensions = {
        dWidth: previosAreaLocation ? dimensions.width - previosAreaLocation.dimensions.width : 0,
        dHeight: previosAreaLocation ? dimensions.height - previosAreaLocation.dimensions.height : 0,
    };

    console.log(dXY);
    console.log(dDimensions);

    const updatedElementList: SlideElement[] = currSlide.elementsList.map((item) => {
        if (editor.selectedSlideElementsIds.includes(item.id)) {
            const size: Size = {
                width: Math.abs(item.size.width + dDimensions.dWidth),
                height: Math.abs(item.size.height + dDimensions.dHeight),
            };
            const startPoint = {
                x: item.startPoint.x + dXY.dx,
                y: item.startPoint.y + dXY.dy,
            };

            return {
                ...item,
                startPoint,
                size,
            };
        }

        return item;
    });

    const updatedSlide: Slide = {
        ...currSlide,
        elementsList: updatedElementList,
    };
    const updatedEditor = applySlideChanges(editor, updatedSlide, slideIndex);

    return {
        ...updatedEditor,
        selectedSlidesIds: [currSlide.id],
    };
}

export function changeElementsOpacity(editor: Editor, opacity: number): Editor {
    const currSlide: Slide | undefined = getCurrentSlide(editor);

    if (!currSlide) {
        return editor;
    }

    const slideIndex = editor.presentation.slidesList.findIndex((item) => {
        return item.id === currSlide.id;
    });

    if (!currSlide.elementsList.length) {
        return editor;
    }

    const newElementsList: SlideElement[] = currSlide.elementsList.filter((item) => {
        if (editor.selectedSlideElementsIds.includes(item.id)) {
            return {
                ...item,
                opacity,
            };
        }
        return item;
    });

    const newSlide: Slide = {
        ...currSlide,
        elementsList: newElementsList,
    };

    const updatedEditor = applySlideChanges(editor, newSlide, slideIndex);

    return {
        ...updatedEditor,
        selectedSlidesIds: [currSlide.id],
    };
}

export function changeElementsPosition(editor: Editor, dx: number, dy: number): Editor {
    const currSlide: Slide | undefined = getCurrentSlide(editor);

    if (!currSlide) {
        return editor;
    }

    const slideIndex = editor.presentation.slidesList.findIndex((item) => {
        return item.id === currSlide.id;
    });

    if (!currSlide.elementsList.length) {
        return editor;
    }

    const updatedElementsList: SlideElement[] = currSlide.elementsList.map((element) => {
        if (editor.selectedSlideElementsIds.includes(element.id)) {
            return {
                ...element,
                startPoint: {
                    x: element.startPoint.x + dx,
                    y: element.startPoint.y + dy,
                },
            };
        }

        return element;
    });

    const updatedSlide: Slide = {
        ...currSlide,
        elementsList: updatedElementsList,
    };

    const updatedEditor = applySlideChanges(editor, updatedSlide, slideIndex);

    return {
        ...updatedEditor,
        selectedSlidesIds: [currSlide.id],
    };
}

export function getSlideElementsAmount(slide: Slide | undefined): number | undefined {
    if (slide) {
        return slide.elementsList.length;
    } else {
        return undefined;
    }
}

export function getActiveElementsIds(editor: Editor): string[] {
    return editor.selectedSlideElementsIds;
}

export function getElementsCoordinates(editor: Editor): Coordinates[] | undefined {
    const activeSlide = getCurrentSlide(editor);

    return activeSlide?.elementsList.map((element) => {
        return element.startPoint;
    });
}

export function getElementsAreaLoaction(slide: Slide, elementsIds: string[]): AreaLocation | undefined {
    type elementLocationInfo = {
        coords: Coordinates;
        dimensions: Size;
    };

    const elementsLocationInfo: (elementLocationInfo | undefined)[] = slide.elementsList
        .map((element) => {
            if (elementsIds.includes(element.id)) {
                return {
                    coords: element.startPoint,
                    dimensions: element.size,
                };
            }
            return undefined;
        })
        .filter((item) => item !== undefined);

    function getSelectedAreaLocation(arr: elementLocationInfo[]): AreaLocation | undefined {
        let index = arr.length - 1;
        const el = arr[index];

        if (el === undefined) {
            return undefined;
        }

        let minX = el.coords.x,
            minY = el.coords.y,
            maxDimenX = el.dimensions.width + minX,
            maxDimenY = el.dimensions.height + minY;

        while (index >= 0) {
            const elXY = arr[index].coords;
            const elDimen = arr[index].dimensions;

            if (elXY.x < minX) {
                minX = elXY.x;
            }
            if (elXY.y < minY) {
                minY = elXY.y;
            }
            if (elXY.x + elDimen.width > maxDimenX) {
                maxDimenX = elXY.x + elDimen.width;
            }
            if (elXY.y + elDimen.height > maxDimenY) {
                maxDimenY = elXY.y + elDimen.height;
            }

            index = index - 1;
        }

        const width = maxDimenX - minX;
        const height = maxDimenY - minY;

        return {
            xy: {
                x: minX,
                y: minY,
            },
            dimensions: {
                width,
                height,
            },
        };
    }

    const res = getSelectedAreaLocation(elementsLocationInfo as elementLocationInfo[]);

    return res;
}

export function moveElementsToBackgroundOrForeground(editor: Editor, way: boolean): Editor {
    const currSlide: Slide | undefined = getCurrentSlide(editor);

    if (!currSlide) {
        return editor;
    }

    const slideIndex = editor.presentation.slidesList.findIndex((item) => {
        return item.id === currSlide.id;
    });

    if (!currSlide.elementsList.length) {
        return editor;
    }

    const movedElementList: SlideElement[] = currSlide.elementsList.filter((item) =>
        editor.selectedSlideElementsIds.includes(item.id),
    );

    const unmovedElementList: SlideElement[] = currSlide.elementsList.filter(
        (item) => !editor.selectedSlideElementsIds.includes(item.id),
    );

    const updatedElementList: SlideElement[] = way
        ? [...movedElementList, ...unmovedElementList]
        : [...unmovedElementList, ...movedElementList];

    const updatedSlide: Slide = {
        ...currSlide,
        elementsList: updatedElementList,
    };
    const updatedEditor = applySlideChanges(editor, updatedSlide, slideIndex);

    return {
        ...updatedEditor,
        selectedSlidesIds: [currSlide.id],
    };
}

export function removeSelectedElements(editor: Editor): Editor {
    const currSlide: Slide | undefined = getCurrentSlide(editor);

    if (!currSlide) {
        return editor;
    }

    const slideIndex = editor.presentation.slidesList.findIndex((item) => {
        return item.id === currSlide.id;
    });

    if (!currSlide.elementsList.length) {
        return editor;
    }

    const updatedElementsList: SlideElement[] = currSlide.elementsList.filter((item) => {
        return !editor.selectedSlideElementsIds.includes(item.id);
    });

    const updatedSlide: Slide = {
        ...currSlide,
        elementsList: updatedElementsList,
    };

    const updatedEditor = applySlideChanges(editor, updatedSlide, slideIndex);

    return {
        ...updatedEditor,
        selectedSlidesIds: [currSlide.id],
        selectedSlideElementsIds: [],
    };
}

import { getCurrentSlide, applySlideChanges } from './slidesActions';
import { Coordinates, Editor, SelectedAreaLocation, Size, Slide, SlideElement } from './types';

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

export function changeElementsSize(editor: Editor, scaleX: number, scaleY: number): Editor {
    const scale: Size = {
        width: scaleX,
        height: scaleY,
    };

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

    const updatedElementList: SlideElement[] = currSlide.elementsList.map((item) => {
        if (editor.selectedSlideElementsIds.includes(item.id)) {
            const size: Size = {
                width: item.size.width * scale.width,
                height: item.size.height * scale.height,
            };

            return {
                ...item,
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

export function getActiveElementsIds(editor: Editor): string[] {
    return editor.selectedSlideElementsIds;
}

export function getElementsAreaLoaction(slide: Slide, elementsIds: string[]): SelectedAreaLocation {
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

    function getSelectedAreaLocation(arr: elementLocationInfo[]): SelectedAreaLocation {
        let index = arr.length - 1;
        const el = arr[index];

        let minX = el.coords.x,
            minY = el.coords.y,
            maxDimenX = el.dimensions.width,
            maxDimenY = el.dimensions.height;

        while (index >= 0) {
            const elXY = arr[index].coords;
            const elDimen = arr[index].dimensions;

            if (elXY.x < minX) {
                minX = elXY.x;
            }
            if (elXY.y < minY) {
                minY = elXY.y;
            }
            if (Math.abs(elXY.x) + elDimen.width > maxDimenX) {
                maxDimenX = Math.abs(elXY.x) + elDimen.width;
            }
            if (Math.abs(elXY.y) + elDimen.height > maxDimenY) {
                maxDimenY = Math.abs(elXY.y) + elDimen.height;
            }

            index = index - 1;
        }

        return {
            xy: {
                x: minX,
                y: minY,
            },
            dimensions: {
                width: maxDimenX - Math.abs(minX),
                height: maxDimenY - Math.abs(minY),
            },
        };
    }

    const res = getSelectedAreaLocation(elementsLocationInfo as elementLocationInfo[]);

    return res;
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

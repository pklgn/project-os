import { generateUUId } from "../utils/uuid";
import { getCurrSlide, applySlideChanges } from "./slidesActions";
import { Editor, Slide, PictureElement, SlideElement, FigureShape, FigureElement, Size } from "./types";
import { isFigure, isPicture } from "../utils/utils";

/*export function insertSelectedSlides(editor: Editor, insertIndex: number): Editor {
    //TODO Лёня
    const slidesList: Slide[] = editor.presentation.slidesList

    if (!(Array.isArray(slidesList) && slidesList.length)) {
        return editor
    }

    const selectedSlides: Slide[] = slidesList.map((slide, index) => {
        if (selectedSlidesIds.includes(index)) {
            return slide
        }
    })

    if (!(Array.isArray(selectedSlides) && selectedSlides.length)) {
        return editor
    }

    const slidesBeforeInsertPosition: Slide[] = slidesList.slice(0, insertIndex)
    const slidesAfterInsertPosition: Slide[] = slidesList.slice(insertIndex)

    const newSlideList: Slide[] = [
        ...slidesBeforeInsertPosition.filter((slide, index) => {
            return selectedSlidesIds.includes(index)
        }),
        ...selectedSlides,
        ...slidesAfterInsertPosition.filter((slide, index) => {
            return !selectedSlidesIds.includes(index + insertIndex)
        })
    ]

    const updatedPresentation: Presentation = {
        ...editor.presentation,
        slidesList: newSlideList,
    }

    const newselectedSlidesIds: string[] = selectedSlidesIds.map((element, elementIndex) => {
        return insertIndex + elementIndex
    })

    return {
        ...editor,
        presentation: updatedPresentation,
        selectedSlidesIds: newselectedSlidesIds,
        selectedSlideElementsIds: []
    }
}*/

export function addPictureElement(
    editor: Editor,
    src: string,
    x: number = 1,
    y: number = 1,
    width: number = 1,
    height: number = 1,
): Editor {
    const currSlide: Slide = getCurrSlide(editor);
    const pictureElement: PictureElement = {
        src
    }

    const element: SlideElement = {
        id: generateUUId(),
        centerPoint: {
            x,
            y,
        },
        size: {
            width,
            height,
        },
        angle: 0,
        opacity: 1,
        content: pictureElement,
    }

    const updatedSlide: Slide = {
        ...currSlide,
        elementsList: [
            ...currSlide.elementsList,
            element,
        ]
    }
    const updatedSlideList: Slide[] = editor.presentation.slidesList.map((slide) => {
        if (currSlide.id === slide.id) {
            return updatedSlide;
        }
        return slide;
    })

    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slidesList: updatedSlideList,
        },
        selectedSlidesIds: [currSlide.id],
        selectedSlideElementsIds: [element.id],
    }
}

export function addFigureElement(
    editor: Editor,
    figureType: FigureShape,
    x: number = 1,
    y: number = 1,
): Editor {
    const currSlide: Slide = getCurrSlide(editor);

    const figureElement: FigureElement = {
        figureType,
        figureColor: '#ffffff',
        borderWidth: 1,
        borderColor: '#000000',
    }

    const element: SlideElement = {
        id: generateUUId(),
        centerPoint: {
            x,
            y,
        },
        size: {
            width: 1,
            height: 1,
        },
        angle: 0,
        opacity: 1,
        content: figureElement,

    }

    const updatedSlide: Slide = {
        ...currSlide,
        elementsList: [
            ...currSlide.elementsList,
            element,
        ]
    }

    const updatedSlideList: Slide[] = editor.presentation.slidesList.map((slide) => {
        if (currSlide.id === slide.id) {
            return updatedSlide;
        }
        return slide;
    })

    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slidesList: updatedSlideList,
        },
        selectedSlidesIds: [currSlide.id],
        selectedSlideElementsIds: [element.id],
    }
}

export function moveElementsToBackground(editor: Editor) {
    //TODO Раф

}

export function moveElementsToForeground(editor: Editor) {
    //TODO Раф
}

export function moveElementsToPosition(editor: Editor, elementsLayoutPosition: number) {
    //TODO Раф
}

export function changeElementsSize(editor: Editor, scaleX: number, scaleY: number): Editor {
    const scale: Size = {
        width: scaleX,
        height: scaleY,
    };

    const currSlide: Slide = getCurrSlide(editor);
    const slideIndex = editor.presentation.slidesList.findIndex(item => {
        return item.id === currSlide.id
    })
    const elementsList: SlideElement[] = currSlide.elementsList;

    if (elementsList.length === 0) {
        return editor;
    }

    const updatedElementList: SlideElement[] = elementsList.map(item => {
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
    })

    const updatedSlide: Slide = {
        ...currSlide,
        elementsList: updatedElementList,
    }
    const updatedEditor = applySlideChanges(editor, updatedSlide, slideIndex);

    return {
        ...updatedEditor,
        selectedSlidesIds: [currSlide.id],
    }
}

export function changeElementsOpacity(editor: Editor, opacity: number): Editor {
    //TODO Лёня
    const selectedSlidesIds = editor.selectedSlidesIds;
    if (!selectedSlidesIds) {
        return editor;
    }

    const activeSlideId = selectedSlidesIds[selectedSlidesIds.length - 1];
    const slideIndex = editor.presentation.slidesList.findIndex(item => {
        return item.id === activeSlideId
    })
    const slidesList: Slide[] = editor.presentation.slidesList;
    if (!(Array.isArray(slidesList) && slidesList.length)) {
        return editor;
    }

    const slide: Slide = slidesList[slideIndex];
    const elementsList: SlideElement[] = slide.elementsList;
    if (!(Array.isArray(elementsList) && elementsList.length)) {
        return editor;
    }

    const newElementsList: SlideElement[] = elementsList.filter(item => {
        if (editor.selectedSlideElementsIds.includes(item.id)) {
            return {
                ...item,
                opacity,
            }
        }
        return item;
    })

    const newSlide: Slide = {
        ...slide,
        elementsList: newElementsList,
    }

    return applySlideChanges(editor, newSlide, slideIndex);
}

export function changeFiguresColor(editor: Editor, figureColor: string): Editor {
    const selectedSlideIds: string[] = editor.selectedSlidesIds;
    const slidesList: Slide[] = editor.presentation.slidesList;

    if (!selectedSlideIds.length || !slidesList.length) {
        return editor;
    }

    const selectedSlideId: string = selectedSlideIds[selectedSlideIds.length - 1];
    const slideIndex: number = slidesList.findIndex(slide => {
        return slide.id === selectedSlideId
    })
    const slide: Slide = slidesList[slideIndex];
    const elementsList: SlideElement[] = slide.elementsList;

    if (!elementsList.length) {
        return editor;
    }

    const updatedElementsList: SlideElement[] = elementsList.map(item => {
        if (editor.selectedSlideElementsIds.includes(item.id) && isFigure(item.content)) {
            return {
                ...item,
                content: {
                    ...item.content,
                    figureColor
                }
            }
        }

        return item;
    })

    const updatedSlide: Slide = {
        ...slide,
        elementsList: updatedElementsList,
    }
    const updatedEditor = applySlideChanges(editor, updatedSlide, slideIndex);

    return {
        ...updatedEditor,
        selectedSlidesIds: [selectedSlideId]
    }
}

export function removeSelectedElements(editor: Editor): Editor {
    const selectedSlideIds: string[] = editor.selectedSlidesIds;
    const slidesList: Slide[] = editor.presentation.slidesList;

    if (!selectedSlideIds.length || !slidesList.length) {
        return editor;
    }

    const selectedSlideId: string = selectedSlideIds[selectedSlideIds.length - 1];
    const slideIndex: number = slidesList.findIndex(slide => {
        return slide.id === selectedSlideId
    })
    const slide: Slide = slidesList[slideIndex];
    const elementsList: SlideElement[] = slide.elementsList;

    if (!elementsList.length) {
        return editor;
    }

    const updatedElementsList: SlideElement[] = elementsList.filter(item => {
        return !editor.selectedSlideElementsIds.includes(item.id)
    })

    const updatedSlide: Slide = {
        ...slide,
        elementsList: updatedElementsList,
    }

    const updatedEditor = applySlideChanges(editor, updatedSlide, slideIndex);

    return {
        ...updatedEditor,
        selectedSlidesIds: [selectedSlideId],
        selectedSlideElementsIds: [],
    }
}

export function changePicture(editor: Editor, src: string): Editor {
    //TODO Раф
    const selectedSlidesIds = editor.selectedSlidesIds;
    if (!selectedSlidesIds) {
        return editor;
    }

    const activeSlideId = selectedSlidesIds[selectedSlidesIds.length - 1];
    const slideIndex: number = editor.presentation.slidesList.findIndex(item => {
        return item.id === activeSlideId;
    })
    const slidesList: Slide[] = editor.presentation.slidesList
    if (!(Array.isArray(slidesList) && slidesList.length)) {
        return editor;
    }

    const slide: Slide = slidesList[slideIndex];
    const elementsList: SlideElement[] = slide.elementsList;
    if (!(Array.isArray(elementsList) && elementsList.length)) {
        return editor;
    }

    const newElementsList: SlideElement[] = elementsList.filter(item => {
        if (editor.selectedSlideElementsIds.includes(item.id) && isPicture(item.content)) {
            return {
                ...item,
                content: {
                    ...item.content,
                    src,
                }
            }
        }
        return item;
    })

    const newSlide: Slide = {
        ...slide,
        elementsList: newElementsList
    }

    return applySlideChanges(editor, newSlide, slideIndex);
}

//TODO Раф
// rotateElement(editor: Editor, angle: number)

//TODO Лёня
// save centerPoint func(t: Coordinates)

export function changeElementsPosition(editor: Editor, dx: number, dy: number): Editor {
    const selectedSlideIds: string[] = editor.selectedSlidesIds;
    const slidesList: Slide[] = editor.presentation.slidesList;

    if (!selectedSlideIds.length || !slidesList.length) {
        return editor;
    }

    const selectedSlideId: string = selectedSlideIds[selectedSlideIds.length - 1];
    const slideIndex: number = slidesList.findIndex(slide => {
        return slide.id === selectedSlideId
    })
    const slide: Slide = slidesList[slideIndex];
    const elementsList: SlideElement[] = slide.elementsList;

    if (!elementsList.length) {
        return editor;
    }

    const updatedElementsList: SlideElement[] = elementsList.map(element => {
        if (editor.selectedSlideElementsIds.includes(element.id)) {
            return {
                ...element,
                centerPoint: {
                    x: element.centerPoint.x + dx,
                    y: element.centerPoint.y + dy,
                }
            }
        }

        return element;
    })

    const updatedSlide: Slide = {
        ...slide,
        elementsList: updatedElementsList,
    }

    const updatedEditor = applySlideChanges(editor, updatedSlide, slideIndex);

    return {
        ...updatedEditor,
        selectedSlidesIds: [selectedSlideId],
    }
}
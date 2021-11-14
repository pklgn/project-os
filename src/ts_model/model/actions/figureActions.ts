import { isFigure } from "../../utils/tools";
import { generateUUId } from "../../utils/uuid";
import { getCurrSlide, applySlideChanges } from "../slidesActions";
import { Editor, FigureShape, Slide, FigureElement, SlideElement } from "../types";

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

export function changeFiguresColor(editor: Editor, figureColor: string): Editor {
    if (!editor.selectedSlidesIds.length || !editor.presentation.slidesList.length) {
        return editor;
    }

    const currSlide: Slide = getCurrSlide(editor);
    const slideIndex = editor.presentation.slidesList.findIndex(item => {
        return item.id === currSlide.id;
    })

    if (!editor.presentation.slidesList[slideIndex].elementsList.length) {
        return editor;
    }

    const updatedElementsList: SlideElement[] = editor.presentation.slidesList[slideIndex].elementsList.map(item => {
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
        ...currSlide,
        elementsList: updatedElementsList,
    }
    const updatedEditor = applySlideChanges(editor, updatedSlide, slideIndex);

    return {
        ...updatedEditor,
        selectedSlidesIds: [currSlide.id]
    }
}

export function changeFiguresBorderColor(editor: Editor, borderColor: string): Editor {
    if (!editor.selectedSlidesIds.length || !editor.presentation.slidesList.length) {
        return editor;
    }

    const currSlide: Slide = getCurrSlide(editor);
    const slideIndex = editor.presentation.slidesList.findIndex(item => {
        return item.id === currSlide.id;
    })

    if (!editor.presentation.slidesList[slideIndex].elementsList.length) {
        return editor;
    }

    const updatedElementsList: SlideElement[] = editor.presentation.slidesList[slideIndex].elementsList.map(item => {
        if (editor.selectedSlideElementsIds.includes(item.id) && isFigure(item.content)) {
            return {
                ...item,
                content: {
                    ...item.content,
                    borderColor
                }
            }
        }

        return item;
    })

    const updatedSlide: Slide = {
        ...currSlide,
        elementsList: updatedElementsList,
    }
    const updatedEditor = applySlideChanges(editor, updatedSlide, slideIndex);

    return {
        ...updatedEditor,
        selectedSlidesIds: [currSlide.id]
    }
}

export function changeFiguresBorderWidth(editor: Editor, borderWidth: number): Editor {
    if (!editor.selectedSlidesIds.length || !editor.presentation.slidesList.length) {
        return editor;
    }

    const currSlide: Slide = getCurrSlide(editor);
    const slideIndex = editor.presentation.slidesList.findIndex(item => {
        return item.id === currSlide.id;
    })

    if (!editor.presentation.slidesList[slideIndex].elementsList.length) {
        return editor;
    }

    const updatedElementsList: SlideElement[] = editor.presentation.slidesList[slideIndex].elementsList.map(item => {
        if (editor.selectedSlideElementsIds.includes(item.id) && isFigure(item.content)) {
            return {
                ...item,
                content: {
                    ...item.content,
                    borderWidth
                }
            }
        }

        return item;
    })

    const updatedSlide: Slide = {
        ...currSlide,
        elementsList: updatedElementsList,
    }
    const updatedEditor = applySlideChanges(editor, updatedSlide, slideIndex);

    return {
        ...updatedEditor,
        selectedSlidesIds: [currSlide.id]
    }
}
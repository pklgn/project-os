import { isPicture } from "../../utils/tools";
import { generateUUId } from "../../utils/uuid";
import { getCurrSlide, applySlideChanges } from "../slidesActions";
import { Editor, Slide, PictureElement, SlideElement } from "../types";

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
        startPoint: {
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

export function changePicture(editor: Editor, src: string): Editor {
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

    const newElementsList: SlideElement[] = currSlide.elementsList.filter(item => {
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
        ...currSlide,
        elementsList: newElementsList
    }

    return applySlideChanges(editor, newSlide, slideIndex);
}
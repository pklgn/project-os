import { generateUUId } from "../../utils/uuid";
import { getCurrSlide, applySlideChanges } from "../slidesActions";
import { Editor, Slide, TextElement, SlideElement } from "../types";
import { isText } from "../../utils/tools";

export function addTextElement(editor: Editor, x: number = 1, y: number = 1): Editor {
    const currSlide: Slide = getCurrSlide(editor);
    console.log(currSlide.id);
    const textElement: TextElement = {
        content: 'Введите текст',
        fontSize: 10,
        fontColor: '#ffffff',
        fontStyle: 'italic'
    }
    const element: SlideElement = {
        id: generateUUId(),
        centerPoint: {
            x,
            y,
        },
        angle: 0,
        size: {
            width: 30,
            height: 25,
        },
        opacity: 1,
        content: textElement,
    }

    const updatedSlide: Slide = {
        ...currSlide,
        elementsList: [
            ...currSlide.elementsList,
            element,
        ]
    }

    const updatedSlideList: Slide[] = editor.presentation.slidesList.map((slide) => {
        if (slide.id === currSlide.id) {
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

export function changeTextsSize(editor: Editor, fontSize: number): Editor {
    const currSlide: Slide = getCurrSlide(editor);
    const slideIndex: number = editor.presentation.slidesList.findIndex(slide => {
        return slide.id === currSlide.id
    });
    const elementsList: SlideElement[] = currSlide.elementsList;

    if (!elementsList.length) {
        return editor;
    }

    const newElementsList: SlideElement[] = elementsList.map(element => {
        if (editor.selectedSlideElementsIds.includes(element.id) && isText(element.content)) {
            return {
                ...element,
                content: {
                    ...element.content,
                    fontSize,
                }
            }
        }
        return element;
    })

    const updatedSlide: Slide = {
        ...currSlide,
        elementsList: newElementsList,
    }

    const updatedEditor = applySlideChanges(editor, updatedSlide, slideIndex);

    return {
        ...updatedEditor,
        selectedSlidesIds: [currSlide.id]
    }
}

export function changeTextsColor(editor: Editor, fontColor: string): Editor {
    const currSlide: Slide = getCurrSlide(editor);
    const slideIndex: number = editor.presentation.slidesList.findIndex(slide => {
        return slide.id === currSlide.id
    });

    const elementsList: SlideElement[] = currSlide.elementsList;
    if (!(Array.isArray(elementsList) && elementsList.length)) {
        return editor;
    }

    const newElementsList: SlideElement[] = elementsList.map(item => {
        if (editor.selectedSlideElementsIds.includes(item.id) && isText(item.content)) {
            return {
                ...item,
                content: {
                    ...item.content,
                    fontColor
                }
            }
        }
        return item;
    })

    const newSlide: Slide = {
        ...currSlide,
        elementsList: newElementsList,
    }

    return applySlideChanges(editor, newSlide, slideIndex);
}

export function changeTextsStyle(editor: Editor, fontStyle: string): Editor {
    const currSlide: Slide = getCurrSlide(editor);
    console.log(currSlide.id);
    const slideIndex: number = editor.presentation.slidesList.findIndex(slide => {
        return slide.id === currSlide.id
    });

    const elementsList: SlideElement[] = currSlide.elementsList;
    if (!(Array.isArray(elementsList) && elementsList.length)) {
        return editor;
    }

    const newElementsList: SlideElement[] = elementsList.map(item => {
        if (editor.selectedSlideElementsIds.includes(item.id) && isText(item.content)) {
            return {
                ...item,
                content: {
                    ...item.content,
                    fontStyle
                }
            }
        }
        return item;
    })

    const newSlide: Slide = {
        ...currSlide,
        elementsList: newElementsList,
    }

    return applySlideChanges(editor, newSlide, slideIndex);
}

export function changeTextsContent(editor: Editor, content: string): Editor {
    const currSlide: Slide = getCurrSlide(editor);
    console.log(currSlide.id);
    const slideIndex: number = editor.presentation.slidesList.findIndex(slide => {
        return slide.id === currSlide.id
    });

    const elementsList: SlideElement[] = currSlide.elementsList;
    if (!(Array.isArray(elementsList) && elementsList.length)) {
        return editor;
    }

    const newElementsList: SlideElement[] = elementsList.map(item => {
        if (editor.selectedSlideElementsIds.includes(item.id) && isText(item.content)) {
            return {
                ...item,
                content: {
                    ...item.content,
                    content
                }
            }
        }
        return item;
    })

    const newSlide: Slide = {
        ...currSlide,
        elementsList: newElementsList,
    }

    return applySlideChanges(editor, newSlide, slideIndex);
}

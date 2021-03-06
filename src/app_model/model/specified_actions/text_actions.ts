import { generateUUId } from '../utils/uuid';
import { getCurrentSlide, applySlideChanges } from '../slides_actions';
import { Editor, Slide, TextElement, SlideElement } from '../types';
import { isText } from '../utils/tools';

export function addTextElement(editor: Editor, x = 1, y = 1): Editor {
    const currSlide: Slide | undefined = getCurrentSlide(editor);

    if (!currSlide) {
        return editor;
    }

    const textElement: TextElement = {
        content: ['Введите текст'],
        fontSize: 20,
        fontColor: 'black',
        fontStyle: '',
        fontFamily: 'sans-serif',
    };
    const element: SlideElement = {
        id: generateUUId(),
        startPoint: {
            x,
            y,
        },
        size: {
            width: 20,
            height: 20,
        },
        opacity: 1,
        content: textElement,
    };

    const updatedSlide: Slide = {
        ...currSlide,
        elementsList: [...currSlide.elementsList, element],
    };

    const updatedSlideList: Slide[] = editor.presentation.slidesList.map((slide) => {
        if (slide.id === currSlide.id) {
            return updatedSlide;
        }
        return slide;
    });

    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slidesList: updatedSlideList,
        },
        selectedSlidesIds: [currSlide.id],
        selectedSlideElementsIds: [element.id],
    };
}

export function changeTextsColor(editor: Editor, fontColor: string): Editor {
    const currSlide: Slide | undefined = getCurrentSlide(editor);

    if (!currSlide) {
        return editor;
    }

    const slideIndex = editor.presentation.slidesList.findIndex((item) => {
        return item.id === currSlide.id;
    });

    const elementsList: SlideElement[] = currSlide.elementsList;

    if (!elementsList.length) {
        return editor;
    }

    const newElementsList: SlideElement[] = elementsList.map((item) => {
        if (editor.selectedSlideElementsIds.includes(item.id) && isText(item.content)) {
            return {
                ...item,
                content: {
                    ...item.content,
                    fontColor,
                },
            };
        }
        return item;
    });

    const newSlide: Slide = {
        ...currSlide,
        elementsList: newElementsList,
    };

    return applySlideChanges(editor, newSlide, slideIndex);
}

export function changeTextsContent(editor: Editor, content: string[]): Editor {
    const currSlide: Slide | undefined = getCurrentSlide(editor);

    if (!currSlide) {
        return editor;
    }

    const slideIndex = editor.presentation.slidesList.findIndex((item) => {
        return item.id === currSlide.id;
    });

    const elementsList: SlideElement[] = currSlide.elementsList;

    if (!elementsList.length) {
        return editor;
    }

    const newElementsList: SlideElement[] = elementsList.map((item) => {
        if (
            editor.selectedSlideElementsIds[editor.selectedSlideElementsIds.length - 1] === item.id &&
            isText(item.content)
        ) {
            return {
                ...item,
                content: {
                    ...item.content,
                    content,
                },
            };
        }
        return item;
    });

    const newSlide: Slide = {
        ...currSlide,
        elementsList: newElementsList,
    };

    return applySlideChanges(editor, newSlide, slideIndex);
}

export function changeTextsSize(editor: Editor, fontSize: number): Editor {
    const currSlide: Slide | undefined = getCurrentSlide(editor);

    if (!currSlide) {
        return editor;
    }

    const slideIndex = editor.presentation.slidesList.findIndex((item) => {
        return item.id === currSlide.id;
    });

    const elementsList: SlideElement[] = currSlide.elementsList;

    if (!elementsList.length) {
        return editor;
    }

    const newElementsList: SlideElement[] = elementsList.map((element) => {
        if (editor.selectedSlideElementsIds.includes(element.id) && isText(element.content)) {
            return {
                ...element,
                content: {
                    ...element.content,
                    fontSize,
                },
            };
        }
        return element;
    });

    const updatedSlide: Slide = {
        ...currSlide,
        elementsList: newElementsList,
    };

    const updatedEditor = applySlideChanges(editor, updatedSlide, slideIndex);

    return {
        ...updatedEditor,
        selectedSlidesIds: [currSlide.id],
    };
}

export function textsSizeUp(editor: Editor): Editor {
    const currSlide: Slide | undefined = getCurrentSlide(editor);

    if (!currSlide) {
        return editor;
    }

    const slideIndex = editor.presentation.slidesList.findIndex((item) => {
        return item.id === currSlide.id;
    });

    const elementsList: SlideElement[] = currSlide.elementsList;

    if (!elementsList.length) {
        return editor;
    }

    const newElementsList: SlideElement[] = elementsList.map((element) => {
        if (editor.selectedSlideElementsIds.includes(element.id) && isText(element.content)) {
            return {
                ...element,
                content: {
                    ...element.content,
                    fontSize: element.content.fontSize + 1,
                },
            };
        }
        return element;
    });

    const updatedSlide: Slide = {
        ...currSlide,
        elementsList: newElementsList,
    };

    const updatedEditor = applySlideChanges(editor, updatedSlide, slideIndex);

    return {
        ...updatedEditor,
        selectedSlidesIds: [currSlide.id],
    };
}

export function textsSizeDown(editor: Editor): Editor {
    const currSlide: Slide | undefined = getCurrentSlide(editor);

    if (!currSlide) {
        return editor;
    }

    const slideIndex = editor.presentation.slidesList.findIndex((item) => {
        return item.id === currSlide.id;
    });

    const elementsList: SlideElement[] = currSlide.elementsList;

    if (!elementsList.length) {
        return editor;
    }

    const newElementsList: SlideElement[] = elementsList.map((element) => {
        if (editor.selectedSlideElementsIds.includes(element.id) && isText(element.content)) {
            return {
                ...element,
                content: {
                    ...element.content,
                    fontSize: element.content.fontSize - 1,
                },
            };
        }
        return element;
    });

    const updatedSlide: Slide = {
        ...currSlide,
        elementsList: newElementsList,
    };

    const updatedEditor = applySlideChanges(editor, updatedSlide, slideIndex);

    return {
        ...updatedEditor,
        selectedSlidesIds: [currSlide.id],
    };
}

export function changeTextsStyle(editor: Editor, fontStyle: string): Editor {
    const currSlide: Slide | undefined = getCurrentSlide(editor);

    if (!currSlide) {
        return editor;
    }

    const slideIndex = editor.presentation.slidesList.findIndex((item) => {
        return item.id === currSlide.id;
    });

    const elementsList: SlideElement[] = currSlide.elementsList;

    if (!elementsList.length) {
        return editor;
    }

    const newElementsList: SlideElement[] = elementsList.map((item) => {
        if (editor.selectedSlideElementsIds.includes(item.id) && isText(item.content)) {
            return {
                ...item,
                content: {
                    ...item.content,
                    fontStyle,
                },
            };
        }
        return item;
    });

    const newSlide: Slide = {
        ...currSlide,
        elementsList: newElementsList,
    };

    return applySlideChanges(editor, newSlide, slideIndex);
}

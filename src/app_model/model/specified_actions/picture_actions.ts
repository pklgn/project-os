import { isPicture } from '../utils/tools';
import { generateUUId } from '../utils/uuid';
import { getCurrentSlide, applySlideChanges } from '../slides_actions';

export function addPictureElement(editor: Editor, picture: PictureData): Editor {
    const { src, alt, width, height } = picture;
    const currSlide: Slide | undefined = getCurrentSlide(editor);

    if (!currSlide) {
        return editor;
    }

    const pictureElement: PictureElement = {
        src,
        alt,
    };

    const element: SlideElement = {
        id: generateUUId(),
        startPoint: {
            x: 0,
            y: 0,
        },
        size: {
            width,
            height,
        },
        opacity: 1,
        content: pictureElement,
    };

    const updatedSlide: Slide = {
        ...currSlide,
        elementsList: [...currSlide.elementsList, element],
    };
    const updatedSlideList: Slide[] = editor.presentation.slidesList.map((slide) => {
        if (currSlide.id === slide.id) {
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

import { Editor, Slide, PictureElement, SlideElement } from '../types';
import { PictureData } from '../../redux_model/actions_model/action_creators/picture_action_creators';

export function changePicture(editor: Editor, src: string): Editor {
    const currSlide: Slide | undefined = getCurrentSlide(editor);

    if (!currSlide) {
        return editor;
    }

    const slideIndex = editor.presentation.slidesList.findIndex((item) => {
        return item.id === currSlide.id;
    });

    if (!editor.presentation.slidesList[slideIndex].elementsList.length) {
        return editor;
    }

    const newElementsList: SlideElement[] = currSlide.elementsList.filter((item) => {
        if (editor.selectedSlideElementsIds.includes(item.id) && isPicture(item.content)) {
            return {
                ...item,
                content: {
                    ...item.content,
                    src,
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

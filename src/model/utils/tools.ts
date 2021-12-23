import { TextElement, FigureElement, PictureElement } from "../types";

export type SlideElementType = 'TEXT' | 'FIGURE' | 'PICTURE';

export function isText(element: TextElement | FigureElement | PictureElement): element is TextElement {
    return (element as TextElement).fontSize !== undefined;
}

export function isFigure(element: TextElement | FigureElement | PictureElement): element is FigureElement {
    return (element as FigureElement).figureType !== undefined;
}

export function isPicture(element: TextElement | FigureElement | PictureElement): element is PictureElement {
    return (element as PictureElement).src !== undefined;
}

export function getSlideElementType(element: TextElement | FigureElement | PictureElement): SlideElementType {
    if (isText(element)) {
        return 'TEXT'
    }
    else if (isFigure(element)) {
        return 'FIGURE'
    }
    else {
        return 'PICTURE'
    }
}
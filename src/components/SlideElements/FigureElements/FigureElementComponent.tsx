import { Coordinates, FigureElement, FigureShape, Size, SlideElement } from '../../../app_model/model/types';
import { isFigure } from '../../../app_model/model/utils/tools';
import { CircleFigure } from './Circle/CircleFigure';
import { RectangleFigure } from './Rectangle/RectangleFigure';
import { TriangleFigure } from './Triangle/TriangleFigure';

type FigureElementProps = {
    element: SlideElement;
    elementIndex: number;
};

export type FigureProps = {
    elementIndex: number;
    startPoint: Coordinates;
    size: Size;
    opacity: number;
    content: FigureElement;
};

function getFigureElement(element: SlideElement): FigureElement | undefined {
    let figureElement: FigureElement | undefined;

    if (isFigure(element.content)) {
        figureElement = element.content;
    } else {
        figureElement = undefined;
    }

    return figureElement;
}

function FigureElementComponent(props: FigureElementProps) {
    const figureElement = getFigureElement(props.element);

    if (!figureElement) {
        return null;
    }

    const figureProps: FigureProps = {
        elementIndex: props.elementIndex,
        startPoint: props.element.startPoint,
        size: props.element.size,
        opacity: props.element.opacity,
        content: figureElement,
    };
    const figureShape = figureElement.figureType;

    switch (figureShape) {
        case FigureShape.Circle:
            return CircleFigure(figureProps);
        case FigureShape.Rectangle:
            return RectangleFigure(figureProps);
        case FigureShape.Triangle:
            return TriangleFigure(figureProps);
    }
}

export { FigureElementComponent };

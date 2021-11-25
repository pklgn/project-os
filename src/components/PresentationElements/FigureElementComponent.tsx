import {Coordinates, FigureElement, FigureShape, Size, SlideElement} from "../../model/types";
import {isFigure} from "../../model/utils/tools";
import {CircleFigure} from "./FigureElements/CircleFigure";
import {RectangleFigure} from "./FigureElements/RectangleFigure";
import {TriangleFigure} from "./FigureElements/TriangleFigure";

type FigureElementProps = {
    element: SlideElement,
}

export type FigureProps = {
    startPoint: Coordinates,
    size: Size,
    opacity: number,
    content: FigureElement,
}

function getFigureElement(element: SlideElement): FigureElement|undefined {
    let figureElement: FigureElement|undefined;

    if (isFigure(element.content)) {
        figureElement = element.content;
    }
    else {
        figureElement = undefined;
    }

    return figureElement;
}

function FigureElementComponent(props: FigureElementProps) {
    const figureElement = getFigureElement(props.element)

    if (!figureElement) {
        return null;
    }
    const figureProps: FigureProps = {
        startPoint: props.element.startPoint,
        size: props.element.size,
        opacity: props.element.opacity,
        content: figureElement,
    }
    const figureShape = figureElement.figureType

    switch (figureShape) {
        case FigureShape.Circle:
            return CircleFigure(figureProps);
        case FigureShape.Rectangle:
            return RectangleFigure(figureProps);
        case FigureShape.Triangle:
            return TriangleFigure(figureProps);
    }
}

export {
    FigureElementComponent,
}
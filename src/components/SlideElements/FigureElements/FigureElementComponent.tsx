import style from './CommonFigureStyle.module.css';

import { Coordinates, FigureElement, FigureShape, Size, SlideElement } from '../../../app_model/model/types';
import { ElementsRatioType } from '../../../app_model/view_model/types';

import { isFigure } from '../../../app_model/model/utils/tools';
import { joinClassNames } from '../../utils/joinClassNames';

import { getElementsRenderRatio } from '../../../app_model/view_model/slide_render_actions';
import { store } from '../../../app_model/redux_model/store';

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

export function FigureElementComponent(props: FigureElementProps) {
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

    const renderScale = getElementsRenderRatio(store.getState().viewModel);

    switch (figureShape) {
        case FigureShape.Circle:
            return CircleFigure(figureProps, renderScale);
        case FigureShape.Rectangle:
            return RectangleFigure(figureProps, renderScale);
        case FigureShape.Triangle:
            return TriangleFigure(figureProps, renderScale);
    }
}

function TriangleFigure(props: FigureProps, renderScale: ElementsRatioType) {
    const leftVertex = {
        x: props.startPoint.x * renderScale.width,
        y: (props.startPoint.y + props.size.height) * renderScale.height,
    };
    const topVertex = {
        x: (props.startPoint.x + props.size.width / 2) * renderScale.width,
        y: props.startPoint.y * renderScale.height,
    };
    const rightVertex = {
        x: (props.startPoint.x + props.size.width) * renderScale.width,
        y: (props.startPoint.y + props.size.height) * renderScale.height,
    };
    const pointsString = `${leftVertex.x},
        ${leftVertex.y} ${topVertex.x},
        ${topVertex.y}  ${rightVertex.x},
        ${rightVertex.y}`;

    return (
        <polygon
            id={`${props.elementIndex}`}
            fill={props.content.figureColor}
            stroke={props.content.borderColor}
            strokeWidth={props.content.borderWidth}
            points={pointsString}
            className={joinClassNames([style.figure])}
            transform={`scale(${renderScale})`}
        />
    );
}

function RectangleFigure(props: FigureProps, renderScale: ElementsRatioType) {
    return (
        <rect
            id={`${props.elementIndex}`}
            x={props.startPoint.x * renderScale.width}
            y={props.startPoint.y * renderScale.height}
            width={props.size.width * renderScale.width}
            height={props.size.height * renderScale.height}
            opacity={props.opacity}
            fill={props.content.figureColor}
            stroke={props.content.borderColor}
            strokeWidth={props.content.borderWidth}
            className={joinClassNames([style.figure])}
        />
    );
}

function CircleFigure(props: FigureProps, renderScale: ElementsRatioType): JSX.Element {
    const { startPoint, size, opacity, content } = props;

    const rx = size.width / 2;
    const ry = size.height / 2;

    return (
        <ellipse
            id={`${props.elementIndex}`}
            cx={(startPoint.x + rx) * renderScale.width}
            cy={(startPoint.y + ry) * renderScale.height}
            rx={rx * renderScale.width}
            ry={ry * renderScale.height}
            fill={content.figureColor}
            stroke={content.borderColor}
            strokeWidth={content.borderWidth}
            opacity={opacity}
            className={joinClassNames([style.figure])}
        />
    );
}

function getFigureElement(element: SlideElement): FigureElement | undefined {
    let figureElement: FigureElement | undefined;

    if (isFigure(element.content)) {
        figureElement = element.content;
    } else {
        figureElement = undefined;
    }

    return figureElement;
}

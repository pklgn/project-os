import style from './CommonFigureStyle.module.css';
import CSS from 'csstype';

import { Coordinates, FigureElement, FigureShape, Size, SlideElement } from '../../../app_model/model/types';

import { isFigure } from '../../../app_model/model/utils/tools';
import { joinClassNames } from '../../utils/joinClassNames';
import { getActiveElementsIds } from '../../../app_model/model/element_actions';
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

function getFigureElement(element: SlideElement): FigureElement | undefined {
    let figureElement: FigureElement | undefined;

    if (isFigure(element.content)) {
        figureElement = element.content;
    } else {
        figureElement = undefined;
    }

    return figureElement;
}

export function FigureElementComponent(props: FigureElementProps) {
    const figureElement = getFigureElement(props.element);

    const elementId = props.element.id;
    const cursorStyle: CSS.Properties = getActiveElementsIds(store.getState().model).includes(elementId)
        ? { cursor: 'move' }
        : { cursor: 'pointer' };

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
            return CircleFigure(figureProps, cursorStyle);
        case FigureShape.Rectangle:
            return RectangleFigure(figureProps, cursorStyle);
        case FigureShape.Triangle:
            return TriangleFigure(figureProps, cursorStyle);
    }
}

function TriangleFigure(props: FigureProps, cursorStyle: CSS.Properties) {
    const leftVertex = {
        x: props.startPoint.x,
        y: props.startPoint.y + props.size.height,
    };
    const topVertex = {
        x: props.startPoint.x + props.size.width / 2,
        y: props.startPoint.y,
    };
    const rightVertex = {
        x: props.startPoint.x + props.size.width,
        y: props.startPoint.y + props.size.height,
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
            style={cursorStyle}
        />
    );
}

function RectangleFigure(props: FigureProps, cursorStyle: CSS.Properties) {
    return (
        <rect
            id={`${props.elementIndex}`}
            x={props.startPoint.x}
            y={props.startPoint.y}
            width={props.size.width}
            height={props.size.height}
            opacity={props.opacity}
            fill={props.content.figureColor}
            stroke={props.content.borderColor}
            strokeWidth={props.content.borderWidth}
            className={joinClassNames([style.figure])}
            style={cursorStyle}
        />
    );
}

function CircleFigure(props: FigureProps, cursorStyle: CSS.Properties): JSX.Element {
    const { startPoint, size, opacity, content } = props;

    const r = size.width === size.height ? size.width / 2 : 0;

    return (
        <circle
            id={`${props.elementIndex}`}
            cx={startPoint.x + r}
            cy={startPoint.y + r}
            r={r}
            fill={content.figureColor}
            stroke={content.borderColor}
            strokeWidth={content.borderWidth}
            opacity={opacity}
            className={joinClassNames([style.figure])}
            style={cursorStyle}
        />
    );
}

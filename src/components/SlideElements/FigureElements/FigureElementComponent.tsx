import CSS from 'csstype';
import style from './CommonFigureStyle.module.css';

import { Coordinates, FigureElement, FigureShape, Size, SlideElement } from '../../../app_model/model/types';
import { ElementsRatioType } from '../../../app_model/view_model/types';

import { isFigure } from '../../../app_model/model/utils/tools';
import { joinClassNames } from '../../utils/joinClassNames';

import { getElementsRenderRatio, getWindowRatio } from '../../../app_model/view_model/slide_render_actions';
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
    transfrom?: CSS.Properties;
    renderScale: {
        width: number;
        height: number;
    };
    windowRatio: number;
};

export function FigureElementComponent(props: FigureElementProps) {
    const figureElement = getFigureElement(props.element);

    if (!figureElement) {
        return null;
    }

    const renderScale = getElementsRenderRatio(store.getState().viewModel);
    const windowRatio = getWindowRatio(store.getState().viewModel);

    const figureProps: FigureProps = {
        elementIndex: props.elementIndex,
        startPoint: props.element.startPoint,
        size: props.element.size,
        opacity: props.element.opacity,
        content: figureElement,
        renderScale: renderScale,
        windowRatio: windowRatio,
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

function TriangleFigure(props: FigureProps) {
    const leftVertex = {
        x: props.startPoint.x * props.renderScale.width,
        y: (props.startPoint.y + props.size.height) * props.renderScale.height,
    };
    const topVertex = {
        x: (props.startPoint.x + props.size.width / 2) * props.renderScale.width,
        y: props.startPoint.y * props.renderScale.height,
    };
    const rightVertex = {
        x: (props.startPoint.x + props.size.width) * props.renderScale.width,
        y: (props.startPoint.y + props.size.height) * props.renderScale.height,
    };
    const pointsString = `${leftVertex.x},
        ${leftVertex.y} ${topVertex.x},
        ${topVertex.y}  ${rightVertex.x},
        ${rightVertex.y}`;

    return (
        <polygon
            id={`${props.elementIndex}`}
            opacity={props.opacity}
            fill={props.content.figureColor}
            stroke={props.content.borderColor}
            strokeWidth={props.content.borderWidth}
            points={pointsString}
            className={joinClassNames([style.figure])}
        />
    );
}

function RectangleFigure(props: FigureProps) {
    return (
        <rect
            id={`${props.elementIndex}`}
            x={props.startPoint.x * props.renderScale.width * props.windowRatio}
            y={props.startPoint.y * props.renderScale.height * props.windowRatio}
            width={props.size.width * props.renderScale.width * props.windowRatio}
            height={props.size.height * props.renderScale.height * props.windowRatio}
            opacity={props.opacity}
            fill={props.content.figureColor}
            stroke={props.content.borderColor}
            strokeWidth={props.content.borderWidth}
            className={joinClassNames([style.figure])}
        />
    );
}

function CircleFigure(props: FigureProps): JSX.Element {
    const { startPoint, size, opacity, content } = props;

    const rx = size.width / 2;
    const ry = size.height / 2;

    return (
        <ellipse
            id={`${props.elementIndex}`}
            cx={(startPoint.x + rx) * props.renderScale.width}
            cy={(startPoint.y + ry) * props.renderScale.height}
            rx={rx * props.renderScale.width}
            ry={ry * props.renderScale.height}
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

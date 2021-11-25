import {FigureProps} from "../FigureElementComponent";

function RectangleFigure(props: FigureProps) {
    return <rect
        x={props.startPoint.x}
        y={props.startPoint.y}
        width={props.size.width}
        height={props.size.height}
        opacity={props.opacity}
        fill={props.content.figureColor}
        stroke={props.content.borderColor}
        strokeWidth={props.content.borderWidth}
    />
}

export {
    RectangleFigure,
}
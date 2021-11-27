import {FigureProps} from "../FigureElementComponent";
import {joinClassNames} from "../../utils/joinClassNames";
import commonStyles from "./CommonFigureStyle.module.css"

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
        className={joinClassNames([
            commonStyles.figure,
        ])}
    />
}

export {
    RectangleFigure,
}
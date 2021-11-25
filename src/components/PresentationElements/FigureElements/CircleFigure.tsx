import {Coordinates, Size} from "../../../model/types";
import {FigureProps} from "../FigureElementComponent";
import commonStyles from "./CommonFigureStyle.module.css"
import {joinClassNames} from "../../utils/joinClassNames";

function getCenterPointCoordinates(
    startPoint: Coordinates,
    size: Size,
): Coordinates {
    const x = startPoint.x + size.width / 2
    const y = startPoint.y + size.height / 2

    return {
        x,
        y,
    }
}

function CircleFigure(props: FigureProps) {
    const {
        startPoint,
        size,
        opacity,
        content,
    } = props

    const {
        x: cx,
        y: cy,
    } = getCenterPointCoordinates(startPoint, size);
    const r = size.width === size.height
        ? size.width / 2
        : 0

    if (!r) {
        return null;
    }

    return <circle
        cx={cx}
        cy={cy}
        r={r}
        fill={content.figureColor}
        stroke={content.borderColor}
        strokeWidth={content.borderWidth}
        opacity={opacity}
        className={joinClassNames([
            commonStyles.figure,
        ])}
    />
}

export {
    CircleFigure,
}
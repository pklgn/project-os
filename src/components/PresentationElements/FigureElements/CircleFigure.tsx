import {Coordinates, Size} from "../../../model/types";
import {FigureProps} from "../FigureElementComponent";

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

    const r = size.width / 2;

    return <circle
        cx={cx}
        cy={cy}
        r={r}
        fill={content.figureColor}
        stroke={content.borderColor}
        strokeWidth={content.borderWidth}
        opacity={opacity}
    />
}

export {
    CircleFigure,
}
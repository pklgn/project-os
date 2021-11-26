import {FigureProps} from "../FigureElementComponent";
import {useEffect} from "react";

function TriangleFigure(props: FigureProps) {
    const leftVertex = {
        x: props.startPoint.x,
        y: props.startPoint.y + props.size.height,
    };
    const topVertex = {
        x: props.startPoint.x + props.size.width / 2,
        y: props.startPoint.y + props.size.height / 2,
    };
    const rightVertex = {
        x: props.startPoint.x + props.size.width,
        y: props.startPoint.y + props.size.height,
    };

    const pointsString = `${leftVertex.x},${leftVertex.y} ${topVertex.x},${topVertex.y} ${rightVertex.x},${rightVertex.y}`

    useEffect(() => {
    }, [])

    return <polygon
        fill={props.content.figureColor}
        stroke={props.content.borderColor}
        strokeWidth={props.content.borderWidth}
        points={pointsString}
    />
}

export {
    TriangleFigure,
}
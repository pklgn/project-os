import commonStyles from '../CommonFigureStyle.module.css';

import { FigureProps } from '../FigureElementComponent';
import { joinClassNames } from '../../../utils/joinClassNames';

function TriangleFigure(props: FigureProps) {
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
            className={joinClassNames([commonStyles.figure])}
        />
    );
}

export { TriangleFigure };

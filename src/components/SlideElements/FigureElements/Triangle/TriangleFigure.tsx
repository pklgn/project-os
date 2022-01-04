import commonStyles from './CommonFigureStyle.module.css';

import { FigureProps } from '../FigureElementComponent';
import { joinClassNames } from '../../../utils/joinClassNames';
import { useDragAndDrop } from '../../../utils/useDragAndDrop';
import { useRef, useState } from 'react';

function TriangleFigure(props: FigureProps) {
    const [position, setPosition] = useState({
        x: props.startPoint.x,
        y: props.startPoint.y,
    });

    const leftVertex = {
        x: position.x,
        y: position.y + props.size.height,
    };
    const topVertex = {
        x: position.x + props.size.width / 2,
        y: position.y + props.size.height / 2,
    };
    const rightVertex = {
        x: position.x + props.size.width,
        y: position.y + props.size.height,
    };
    const pointsString = 
        `${leftVertex.x},
         ${leftVertex.y} ${topVertex.x},
         ${topVertex.y} ${rightVertex.x},
         ${rightVertex.y}`;
    const ref = useRef<SVGPolygonElement>(null);
    useDragAndDrop(ref.current, position, setPosition);

    return (
        <polygon
            ref={ref}
            fill={props.content.figureColor}
            stroke={props.content.borderColor}
            strokeWidth={props.content.borderWidth}
            points={pointsString}
            className={joinClassNames([commonStyles.figure])}
        />
    );
}

export { TriangleFigure };

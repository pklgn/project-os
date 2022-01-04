import commonStyles from './CommonFigureStyle.module.css';

import { FigureProps } from '../FigureElementComponent';
import { joinClassNames } from '../../../utils/joinClassNames';
import { useDragAndDrop } from '../../../utils/useDragAndDrop';
import { useRef, useState } from 'react';

function RectangleFigure(props: FigureProps) {
    const [position, setPosition] = useState({
        x: props.startPoint.x,
        y: props.startPoint.y,
    });
    const ref = useRef<SVGRectElement>(null);
    useDragAndDrop(ref.current, position, setPosition);

    return (
        <rect
            ref={ref}
            x={position.x}
            y={position.y}
            width={props.size.width}
            height={props.size.height}
            opacity={props.opacity}
            fill={props.content.figureColor}
            stroke={props.content.borderColor}
            strokeWidth={props.content.borderWidth}
            className={joinClassNames([commonStyles.figure])}
        />
    );
}

export { RectangleFigure };

import commonStyles from '../CommonFigureStyle.module.css';

import { Coordinates, Size } from '../../../../model/types';
import { FigureProps } from '../FigureElementComponent';
import { joinClassNames } from '../../../utils/joinClassNames';
import { useRef, useState } from 'react';
import { useDragAndDrop } from '../../../utils/useDragAndDrop';

function getCenterPointCoordinates(
    startPoint: Coordinates,
    size: Size,
): Coordinates {
    const x = startPoint.x + size.width / 2;
    const y = startPoint.y + size.height / 2;

    return {
        x,
        y,
    };
}

function CircleFigure(props: FigureProps): JSX.Element | null {
    const { startPoint, size, opacity, content } = props;

    const [position, setPosition] = useState(
        getCenterPointCoordinates(startPoint, size),
    );
    const ref = useRef<SVGCircleElement>(null);
    useDragAndDrop(ref.current, position, setPosition);

    const r = size.width === size.height ? size.width / 2 : 0;

    if (!r) {
        return null;
    }

    return (
        <circle
            ref={ref}
            cx={position.x}
            cy={position.y}
            r={r}
            fill={content.figureColor}
            stroke={content.borderColor}
            strokeWidth={content.borderWidth}
            opacity={opacity}
            className={joinClassNames([commonStyles.figure])}
        />
    );
}

export { CircleFigure };

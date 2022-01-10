import commonStyles from '../CommonFigureStyle.module.css';

import { FigureProps } from '../FigureElementComponent';
import { joinClassNames } from '../../../utils/joinClassNames';

function CircleFigure(props: FigureProps): JSX.Element | null {
    const { startPoint, size, opacity, content } = props;

    const r = size.width === size.height ? size.width / 2 : 0;

    if (!r) {
        return null;
    }

    return (
        <circle
            id={`${props.elementIndex}`}
            cx={startPoint.x}
            cy={startPoint.y}
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

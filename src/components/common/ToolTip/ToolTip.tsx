import { useState } from 'react';
import styles from './ToolTip.module.css';
import { joinClassNames } from '../../utils/joinClassNames';

export type ToolTipPropsType = {
    title: string;
    toolTipId?: string;
    position?: 'above' | 'under';
    child: JSX.Element;
};

export default function ToolTip(props: ToolTipPropsType): JSX.Element {
    const { title, position, child } = props;

    const [isVisible, setVisibleState] = useState(false);

    return (
        <div className={styles.container} id="tooltip">
            <div
                className={styles['tooltip-placeholder']}
                onMouseOver={(event) => {
                    event.preventDefault();
                    setVisibleState(true);
                }}
                onMouseOut={() => setVisibleState(false)}
                onClick={() => setVisibleState(false)}
            >
                {child}
            </div>
            {isVisible && (
                <span
                    className={`${styles['tooltip-content']} ${position ? styles[position] : ''}`}
                    id={props.toolTipId}
                >
                    {title}
                </span>
            )}
        </div>
    );
}

import { useState } from 'react';
import styles from './ToolTip.module.css';

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
                onMouseEnter={() => setVisibleState(true)}
                onMouseLeave={() => setVisibleState(false)}
                onClick={() => setVisibleState(false)}
            >
                {child}
            </div>
            {isVisible && (
                <div
                    className={`${styles['tooltip-content']} ${position ? styles[position] : ''}`}
                    id={props.toolTipId}
                >
                    {title}
                </div>
            )}
        </div>
    );
}

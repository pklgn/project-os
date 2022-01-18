import { useState } from 'react';
import styles from './ToolTip.module.css';

export type ToolTipPropsType = {
    title: string;
    id?: string;
    position?: 'above' | 'under';
    child: JSX.Element;
};

export default function ToolTip(props: ToolTipPropsType): JSX.Element {
    const { title, id, position, child } = props;

    const [isVisible, setVisibleState] = useState(false);

    return (
        <div className={styles.container} id={`${id ?? 'element'}-tooltip`}>
            <div
                className={styles['tooltip-placeholder']}
                onMouseOver={() => setVisibleState(true)}
                onMouseOut={() => setVisibleState(false)}
                onClick={() => setVisibleState(false)}
            >
                {child}
            </div>
            {isVisible && (
                <span
                    className={`${styles['tooltip-content']} ${position ? styles[position] : ''}`}
                    id="tooltip-content"
                >
                    {title}
                </span>
            )}
        </div>
    );
}

import styles from './Button.module.css';
import CSS from 'csstype';

import { joinClassNames } from '../../utils/joinClassNames';
import { BaseSyntheticEvent, MouseEvent, useEffect, useRef, useState } from 'react';

type ButtonState = 'pressed' | 'active' | 'disabled' | 'independently';
type ButtonType = 'in-list' | 'default';

export type ButtonProps = {
    type: ButtonType;
    state: ButtonState;
    id: string;
    text?: string;
    optionalText?: string;
    iconLeft?: JSX.Element;
    iconRight?: JSX.Element;
    cssMix?: CSS.Properties;
    onClick: (_: BaseSyntheticEvent) => void;
};

export function Button(props: ButtonProps) {
    const { type, state, id, text, optionalText, iconLeft, iconRight, cssMix, onClick } = props;
    const buttonRef = useRef<HTMLButtonElement>(null);

    const disabled = state === 'disabled';

    const [classes, setClasses] = useState(
        joinClassNames(['button', type ?? '', state ?? ''])
            .trim()
            .split(' '),
    );

    const onMouseDownHandler = () => {
        console.log('mousedown');
        // if (state === 'independently') {
        //     setClasses(
        //         joinClassNames(['button', type ?? '', 'active'])
        //             .trim()
        //             .split(' '),
        //     );
        // }
    };

    const onEnter = (event: MouseEvent) => {
        if (event.buttons === 1) {
            console.log('entered and pressed');
        }
    };

    const onMouseUpHandler = () => {
        if (state === 'independently') {
            setClasses(
                joinClassNames(['button', type ?? '', 'disabled'])
                    .trim()
                    .split(' '),
            );
        }
    };

    useEffect(() => {
        document.addEventListener('mouseup', onMouseUpHandler);

        return () => {
            document.removeEventListener('mouseup', onMouseUpHandler);
        };
    }, [onMouseUpHandler]);

    return (
        <button
            ref={buttonRef}
            className={`${styles[classes[0]] ?? ''} ${styles[classes[1]] ?? ''} ${styles[classes[2]] ?? ''}`}
            onMouseDown={onMouseDownHandler}
            onMouseEnter={onEnter}
            onClick={onClick}
            style={cssMix}
            id={id}
            disabled={disabled}
        >
            {iconLeft}
            {text}
            {optionalText ? <div className={styles['optional-text']}>{optionalText}</div> : <></>}
            {iconRight}
        </button>
    );
}

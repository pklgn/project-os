import styles from './Button.module.css';
import CSS from 'csstype';

import { joinClassNames } from '../../utils/joinClassNames';
import { BaseSyntheticEvent, MouseEvent, useRef, useState } from 'react';

type ButtonState = 'pressed' | 'active' | 'disabled' | 'independently' | 'hover';
type ButtonType = 'in-list' | 'default' | 'round';

export type ButtonProps = {
    type?: ButtonType;
    state?: ButtonState;
    id: string;
    text?: string;
    optionalText?: string;
    iconLeft?: JSX.Element;
    iconRight?: JSX.Element;
    cssMix?: CSS.Properties;
    onClick?: (event: BaseSyntheticEvent) => void;
    onMouseUp?: (event: BaseSyntheticEvent) => void;
};

export function Button(props: ButtonProps) {
    const {
        type = 'default',
        state = 'independently',
        id,
        text,
        optionalText,
        iconLeft = null,
        iconRight = null,
        cssMix,
        onClick,
        onMouseUp,
    } = props;
    const buttonRef = useRef<HTMLButtonElement>(null);
    const disabled = state === 'disabled';
    const [buttonState, setButtonState] = useState(state);
    const classNames = joinClassNames([styles['button'], styles[`button--${buttonState}`], styles[`button--${type}`]]);

    const onMouseDownHandler = () => {
        setButtonState('active');
    };

    const onMouseEnterHandler = (event: MouseEvent) => {
        if (event.buttons === 1) {
            !disabled && setButtonState('active');
        } else {
            !disabled && setButtonState('hover');
        }
    };
    const onMouseLeaveHandler = () => {
        if (!disabled) {
            setButtonState('independently');
        }
    };
    const textElement = text ? <span className={styles['text']}>{text}</span> : null;
    const optionalTextElement = optionalText ? <span className={styles['optional-text']}>{optionalText}</span> : null;

    const onMouseUpHandler = (event: BaseSyntheticEvent) => {
        if (onMouseUp) {
            onMouseUp(event);
        }
        setButtonState('independently');
    };

    return (
        <button
            ref={buttonRef}
            className={classNames}
            onMouseLeave={onMouseLeaveHandler}
            onMouseDown={onMouseDownHandler}
            onMouseUp={onMouseUpHandler}
            onMouseEnter={onMouseEnterHandler}
            onClick={onClick}
            style={cssMix}
            id={id}
            disabled={disabled}
        >
            {iconLeft}
            {textElement}
            {optionalTextElement}
            {iconRight}
        </button>
    );
}

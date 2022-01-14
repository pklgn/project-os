import styles from './Button.module.css';
import CSS from 'csstype';

import { joinClassNames } from '../../utils/joinClassNames';
import { BaseSyntheticEvent } from 'react';

type ButtonState = 'pressed' | 'active' | 'disabled' | 'regardless';
type ButtonType = 'in-list' | 'default';

export type ButtonProps = {
    type: ButtonType;
    state: ButtonState;
    id: string;
    shouldStopPropagation: boolean;
    text: string | undefined;
    optionalText: string | undefined;
    iconLeft: JSX.Element | undefined;
    iconRight: JSX.Element | undefined;
    cssMix: CSS.Properties | undefined;
    func: () => void;
};

export function Button(props: ButtonProps) {
    const { type, state, id, shouldStopPropagation, text, optionalText, iconLeft, iconRight, cssMix, func } = props;

    const disabled = state === 'disabled';

    const classes = joinClassNames(['button', type, state ?? ''])
        .trim()
        .split(' ');
    const onMouseDownHandler = (event: BaseSyntheticEvent) => {
        if (shouldStopPropagation) {
            event.stopPropagation();
        }
    };

    const onClick = (event: BaseSyntheticEvent) => {
        func();
    };

    return (
        <button
            className={`${styles[classes[0]] ?? ''} ${styles[classes[1]] ?? ''} ${styles[classes[2]] ?? ''}`}
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

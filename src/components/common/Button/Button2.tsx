import { joinClassNames } from '../../utils/joinClassNames';
import { BaseSyntheticEvent } from 'react';

export type Button2State = 'pressed' | 'active' | 'disabled' | undefined;
export type Button2Type = 'list' | 'normal';

export type Button2Props = {
    type: Button2Type;
    text: string | undefined;
    optionalText: string | undefined;
    iconLeft: JSX.Element | undefined;
    iconRight: JSX.Element | undefined;
    state: Button2State;
    onClick: (e: BaseSyntheticEvent) => void | undefined;
};

function Button2(props: Button2Props) {
    const { type, text, optionalText, iconLeft, iconRight, onClick, state } = props;
    const disabled = state === 'disabled';
    const classes = joinClassNames(['button', type, state ?? '']);
    return (
        <button className={classes} onClick={onClick} disabled={disabled}>
            {iconLeft}
            {text}
            {optionalText}
            {iconRight}
        </button>
    );
}

export { Button2 };

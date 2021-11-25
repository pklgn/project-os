import { BaseSyntheticEvent, useEffect, useState } from 'react';
import styles from './Button.module.css';

type ButtonProps = {
    text: string,
    state: 'disabled' | 'active' | 'focused',
    contentType: 'text' | 'icon' | 'leftSideIconAndTextInSubMenu' | 'rightSideIconAndTextInSubMenu' | 'rightSideHotKeyInfoAndTextInSubMenu' | 'textInSubMenu',
    content: {
        hotkeyInfo: string,
        icon: JSX.Element,
    } | undefined,
    foo: Function | undefined
}

export function Button(props: ButtonProps = {
    text: '',
    state: 'disabled',
    contentType: 'text',
    content: undefined,
    foo: () => { },
}): JSX.Element {
    const { text, content, contentType, state, foo } = props;

    const onClickHandler = (_: BaseSyntheticEvent) => {
        if (foo !== undefined) {
            foo();
        }
        console.log(`${state} ${contentType}`);
    }

    const [buttonStyle, setButtonStyle] = useState(
        (contentType === 'icon')
            ? (state === 'disabled') ? styles.icon : (state === 'active') ? styles['icon-pressed'] : styles['icon-focused']
            :
        (contentType === 'leftSideIconAndTextInSubMenu')
            ? (state === 'disabled') ? styles.button : (state === 'active') ? styles['button-pressed'] : styles['button-focused']
            :
        (contentType === 'rightSideIconAndTextInSubMenu')
            ? (state === 'disabled') ? styles.button : (state === 'active') ? styles['button-pressed'] : styles['button-focused']
            :
        (contentType === 'rightSideHotKeyInfoAndTextInSubMenu')
            ? (state === 'disabled') ? styles.button : (state === 'active') ? styles['button-pressed'] : styles['button-focused']
            :
        (contentType === 'textInSubMenu')
            ? (state === 'disabled') ? styles.button : (state === 'active') ? styles['button-pressed'] : styles['button-focused']
            :
        (contentType === 'text')
            ? (state === 'disabled') ? styles.button : (state === 'active') ? styles['button-pressed'] : styles['button-focused']
            : 
        styles.button
    );

    const [preventingMouseUp, setPreventMouseUpStatus] = useState(false);

    const onMouseDownHandler = (contentType === 'text')
        ? (_: BaseSyntheticEvent) => {
            setButtonStyle(styles['button-pressed']);
        }
        : (_: BaseSyntheticEvent) => {
        }

    const onMouseUpHandler = (contentType === 'text')
        ? (event: BaseSyntheticEvent) => {
            setButtonStyle(styles.button);
            if (preventingMouseUp) {
                setPreventMouseUpStatus(false);
                event.target.blur();
            } else {
                setPreventMouseUpStatus(true);
            }
        }
        : (_: BaseSyntheticEvent) => {
        }

    const onFocusHandler = (_: BaseSyntheticEvent) => {
    }

    const onBlurHandler = (_: BaseSyntheticEvent) => {
    }

    const onMouseEnterHandler = (_: BaseSyntheticEvent) => {
    }

    const onMouseLeaveHandler = (_: BaseSyntheticEvent) => {
    }

    const button: JSX.Element =
        <button
            className={buttonStyle}
            onMouseDown={onMouseDownHandler}
            onMouseUp={onMouseUpHandler}
            onClick={onClickHandler}
        >
            {text}
            {(content !== undefined)
                ? (content.hotkeyInfo === "")
                    ? content.icon
                    : content.hotkeyInfo
                : ''
            }
        </button>;

    return button;
}
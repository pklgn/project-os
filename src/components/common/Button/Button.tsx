import { BaseSyntheticEvent, useEffect, useState } from 'react';
import styles from './Button.module.css';

type ButtonProps = {
    text: string,
    state: 'disabled' | 'active' | 'focused' | 'default',
    contentType: 'text' | 'icon' | 'leftSideIconAndTextInSubMenu' | 'rightSideIconAndTextInSubMenu' | 'rightSideHotKeyInfoAndTextInSubMenu' | 'textInSubMenu',
    content: {
        hotkeyInfo: string,
        icon: JSX.Element,
    } | undefined,
    foo: () => void | undefined
}

export function Button(props: ButtonProps = {
    text: '',
    state: 'disabled',
    contentType: 'text',
    content: undefined,
    foo: () => {},
}): JSX.Element {
    const { text, content, contentType, state, foo } = props;

    const onClickHandler = (_: BaseSyntheticEvent) => {
        if (foo !== undefined) {
            foo();
        }
    }

    const [buttonStyle, setButtonStyle] = useState(styles.default);

    useEffect(() => {
        if (state !== 'default') {
            const style = (contentType === 'icon')
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
                                ? (state === 'disabled') ? styles['button-in-submenu'] : (state === 'active') ? styles['button-pressed'] : styles['button-focused']
                                :
                                (contentType === 'text')
                                    ? (state === 'disabled') ? styles.button : (state === 'active') ? styles['button-pressed'] : styles['button-focused']
                                        : styles.button;
            setButtonStyle(style);
        }
    }, [state, contentType]);

    const [preventingMouseUp, setPreventMouseUpStatus] = useState(false);

    const onMouseDownHandler = (state === 'default')
        ? (_: BaseSyntheticEvent) => {
            setButtonStyle(styles['default-pressed']);
        }
        : (_: BaseSyntheticEvent) => {
            return undefined;
        }

    const onMouseUpHandler = (state === 'default')
        ? (event: BaseSyntheticEvent) => {
            setButtonStyle(styles.default);
            if (preventingMouseUp) {
                setPreventMouseUpStatus(false);
                event.target.blur();
            } else {
                setPreventMouseUpStatus(true);
            }
        }
        : (_: BaseSyntheticEvent) => {
            return undefined;
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
                    : <div className="hotkey-info">
                        {content.hotkeyInfo}
                    </div>
                : ''
            }
        </button>;

    return button;
}
import React, { BaseSyntheticEvent, useState } from "react";
import styles from "./Button.module.css";

type ButtonProps = {
    title: string,
    content: {
        hotkeyInfo: string,
        icon: JSX.Element | undefined,
    } | undefined,
    foo: Function | undefined
}

export type Button = {
    button: JSX.Element,
    isOn: boolean,
    setOnOffButton: (s: boolean) => void,
    setOnOffFocusStyle: (s: boolean) => void
}

export function Button(props: ButtonProps = {
    title: "",
    content: undefined,
    foo: () => { },
}): Button {
    const { title, content } = props;

    const [buttonStyle, setButtonStyle] = useState(styles.button);
    const [isButtonOn, setButtonState] = useState(false);
    const [preventMouseUp, setPreventMouseUp] = useState(false);
    const [stayFocusStyle, setStayFocusStyle] = useState(false);

    const setOnOffButton = (state: boolean) => {
        setButtonState(state);
    }


    const onMouseDownButton = (event: BaseSyntheticEvent) => {
        setButtonStyle(styles["button-on"]);
        event.target.focus();
    }

    const onMouseUpButton = (event: BaseSyntheticEvent) => {
        if (preventMouseUp) {
            setPreventMouseUp(false);
        } else {
            setButtonState(false);
            event.target.blur();
        }
        setButtonStyle(styles.button);
    }

    const onFocusButton = (_: BaseSyntheticEvent) => {
        setButtonStyle(styles["button-on"]);
        setButtonState(true);
        setPreventMouseUp(true);
    }

    const onBlurButton = (_: BaseSyntheticEvent) => {
        console.log('disabling');
        if (!stayFocusStyle) {
            setButtonStyle(styles.button);
        } else {
            setButtonStyle(styles["button-wo-focus-active"]);
        }
    }

    const setOnOffFocusButton = (state: boolean) => {
        setStayFocusStyle(state);
    }

    const onClickButton = (_: BaseSyntheticEvent) => {
        if (props.foo !== undefined) {
            props.foo();
        }
    }

    const onMouseEnterButtonWithContent = (_: BaseSyntheticEvent) => {
        setButtonState(true);
    }

    const onMouseLeaveButtonWithContent = (_: BaseSyntheticEvent) => {
        setButtonState(false);
    }

    const button: JSX.Element = (content === undefined)
        ? <button
            className={buttonStyle}
            onMouseDown={onMouseDownButton}
            onMouseUp={onMouseUpButton}
            onFocus={onFocusButton}
            onBlur={onBlurButton}
            onClick={onClickButton}
        >
            {title}
        </button>
        : <button
            className={styles["button-with-content"]}
            onMouseEnter={onMouseEnterButtonWithContent}
            onMouseLeave={onMouseLeaveButtonWithContent}
            onClick={(props.content?.hotkeyInfo !== undefined)
                ? onClickButton
                : () => {}
            }
        >
            {title}
            {(content.icon !== undefined)
                ? content.icon
                : ''
            }
            {(content.icon === undefined && content.hotkeyInfo !== undefined)
                ? <div className="hotkey">{content.hotkeyInfo}</div>
                : ''
            }
        </button>;

    return {
        button: button,
        isOn: isButtonOn,
        setOnOffButton: setOnOffButton,
        setOnOffFocusStyle: setOnOffFocusButton
    }
}
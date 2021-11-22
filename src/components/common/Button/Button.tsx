import React, { BaseSyntheticEvent, useEffect, useState } from "react";
import styles from "./Button.module.css";

type ButtonProps = {
    title: string,
    content: {
        hotkeyInfo: string;
        icon: JSX.Element | undefined;
    } | undefined,
    foo: Function | undefined
}

export type Button = {
    button: JSX.Element,
    isOn: boolean
}

export function Button(props: ButtonProps = {
    title: "",
    content: undefined,
    foo: () => {}
}): Button {
    const { title, content } = props;

    const [buttonStyle, setButtonStyle] = useState(styles.button);
    const [isButtonOn, setButtonState] = useState(false);

    const onMouseDownButton = (event: BaseSyntheticEvent) => {
        setButtonStyle(styles["button-on"]);
        event.preventDefault();
    }

    const onMouseUpButton = (event: BaseSyntheticEvent) => {
        setButtonStyle(styles.button);
        if (!isButtonOn) {
            event.target.focus();
        } else {
            event.target.blur();
        }
    }

    const onClickButton = (_: BaseSyntheticEvent) => {
        if (props.foo !== undefined) {
            props.foo();
        }
    }

    const onMouseEnterButtonWithContent = (event: BaseSyntheticEvent) => {
        setButtonState(true);
    }

    const onMouseLeaveButtonWithContent = (event: BaseSyntheticEvent) => {
        setButtonState(false);
    }

    const button: JSX.Element = (content === undefined)
        ? <button
            className={buttonStyle}
            onMouseDown={onMouseDownButton}
            onMouseUp={onMouseUpButton}
            onClick={onClickButton}
        >
            {title}
        </button>
        : <button
            className={styles["button-with-content"]}
            onMouseEnter={onMouseEnterButtonWithContent}
            onMouseLeave={onMouseLeaveButtonWithContent}
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
        isOn: isButtonOn
    }
}
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
    isOn: boolean,
    setButtonOn: React.Dispatch<React.SetStateAction<boolean>>
}

export function Button(props: ButtonProps = {
    title: "",
    content: undefined,
    foo: () => { }
}): Button {
    const { title, content } = props;

    const [buttonStyle, setButtonStyle] = useState(styles.button);
    const [isButtonOn, setButtonState] = useState(false);

    const onMouseDownButton = (event: BaseSyntheticEvent) => {
        console.log('down');
        setButtonStyle(styles["button-on"]);
        event.target.focus();
    }

    const onMouseUpButton = (event: BaseSyntheticEvent) => {
        console.log('up');
        if (isButtonOn) {
            event.target.blur();
            console.log('blur');
            setButtonState(false);
        } else {
            setButtonState(true);
        }
        setButtonStyle(styles.button);
    }

    const onFocusButton = (event: BaseSyntheticEvent) => {
        //console.log('focus');
    }

    const onBlurButton = (event: BaseSyntheticEvent) => {
        //console.log('blur');
        if (isButtonOn) {
            event.target.focus();
        }
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
        setButtonOn: setButtonState
    }
}
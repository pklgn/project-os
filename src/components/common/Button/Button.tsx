import { BaseSyntheticEvent, useState } from "react";
import styles from "./Button.module.css";

type ButtonProps = {
    title: string;
    content: {
        hotkeyInfo: string;
        icon: JSX.Element | undefined;
    } | undefined
}

export type Button = {
    button: JSX.Element,
    isOn: boolean,
}

export function Button(props: ButtonProps = {
    title: "",
    content: undefined,
}): Button {
    const { title, content } = props;

    const [buttonStyle, setButtonStyle] = useState(styles.button);
    const [buttonWithContentStyle, setButtonWithContentStyle] = useState(styles["button-with-content"]);
    const [isButtonOn, setButtonState] = useState(false);

    const onMouseDownOnButton = (event: BaseSyntheticEvent) => {
        console.log('Down');
        setButtonStyle(styles["button-on"]);
        event.preventDefault();
    }

    const onMouseUpOnButton = (event: BaseSyntheticEvent) => {
        console.log('Up');
        setButtonStyle(styles.button);
        if (!isButtonOn) {
            event.target.focus();
        } else {
            event.target.blur();
        }
    }

    const onFocusButton = (_: BaseSyntheticEvent) => {
        console.log('focus');
        setButtonState(true);
    }

    const onBlurButton = (_: BaseSyntheticEvent) => {
        console.log('blur');
        setButtonState(false);
    }

    const onFocusButtonWithContent = (_: BaseSyntheticEvent) => {
        console.log('focus');
        setButtonState(true);
        setButtonWithContentStyle(styles["button-with-content-active"]);
    }

    const onBlurButtonWithContent = (_: BaseSyntheticEvent) => {
        console.log('blur');
        setButtonState(false);
        setButtonWithContentStyle(styles["button-with-content"]);
    }

    const onMouseEnterButtonWithContent = (_: BaseSyntheticEvent) => {
        console.log('enter');
        setButtonState(true);
        setButtonWithContentStyle(styles["button-with-content-active"]);
    }

    const onMouseLeaveButtonWithContent = (_: BaseSyntheticEvent) => {
        console.log('leave');
        setButtonState(false);
        setButtonWithContentStyle(styles["button-with-content"]);
    }

    const button: JSX.Element = (content === undefined)
        ? <button
            className={buttonStyle}
            onFocus={onFocusButton}
            onBlur={onBlurButton}
            onMouseDown={onMouseDownOnButton}
            onMouseUp={onMouseUpOnButton}
        >
            {title}
        </button>
        : <button
            className={buttonWithContentStyle}
            onMouseEnter={onMouseEnterButtonWithContent}
            onMouseLeave={onMouseLeaveButtonWithContent}
            onFocus={onFocusButtonWithContent}
            onBlur={onBlurButtonWithContent}
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
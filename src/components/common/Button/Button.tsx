import { BaseSyntheticEvent, useState } from "react";
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
}

export function Button(props: ButtonProps = {
    title: "",
    content: undefined,
    foo: () => {}
}): Button {
    const { title, content } = props;

    const [buttonStyle, setButtonStyle] = useState(styles.button);
    const [buttonWithContentStyle, setButtonWithContentStyle] = useState(styles["button-with-content"]);
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

    const onFocusButton = (_: BaseSyntheticEvent) => {
        setButtonState(true);
    }

    const onBlurButton = (_: BaseSyntheticEvent) => {
        setButtonState(false);
    }

    const onClickButton = (_: BaseSyntheticEvent) => {
        if (props.foo !== undefined) {
            props.foo();
        }
    }

    const onFocusButtonWithContent = (_: BaseSyntheticEvent) => {
        setButtonState(true);
        setButtonWithContentStyle(styles["button-with-content-active"]);
    }

    const onBlurButtonWithContent = (_: BaseSyntheticEvent) => {
        setButtonState(false);
        setButtonWithContentStyle(styles["button-with-content"]);
    }

    const onMouseEnterButtonWithContent = (_: BaseSyntheticEvent) => {
        setButtonState(true);
        setButtonWithContentStyle(styles["button-with-content-active"]);
    }

    const onMouseLeaveButtonWithContent = (_: BaseSyntheticEvent) => {
        setButtonState(false);
        setButtonWithContentStyle(styles["button-with-content"]);
    }

    const button: JSX.Element = (content === undefined)
        ? <button
            className={buttonStyle}
            onFocus={onFocusButton}
            onBlur={onBlurButton}
            onMouseDown={onMouseDownButton}
            onMouseUp={onMouseUpButton}
            onClick={onClickButton}
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
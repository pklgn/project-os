import { BaseSyntheticEvent, useState } from "react";
import styles from "./Button.module.css";

type ButtonProps = {
    text: string | undefined,
    content: {
        hotkeyInfo: string,
        icon: JSX.Element | undefined,
    } | undefined,
    foo: Function | undefined
}

export function Button(props: ButtonProps = {
    text: "",
    content: undefined,
    foo: () => { },
}): JSX.Element {
    const { text, content } = props;

    const onClickButton = (_: BaseSyntheticEvent) => {
        if (props.foo !== undefined) {
            props.foo();
        }
    }

    const [buttonTextStyle, setButtonWithTextStyle] = useState(styles.button);

    const [preventMouseUpOnButtonWithText, setPreventMouseUpOnButtonWithText] = useState(false);
    const [isButtonWithTextFocused, setButtonWithTextFocus] = useState(false);

    const onMouseDownButtonWithText = (event: BaseSyntheticEvent) => {
        setButtonWithTextStyle(styles["button-on"]);
        event.target.focus();
    }

    const onMouseUpButtonWithText = (event: BaseSyntheticEvent) => {
        if (preventMouseUpOnButtonWithText) {
            setPreventMouseUpOnButtonWithText(false);
        } else {
            event.target.blur();
        }
        setButtonWithTextStyle(styles.button);
    }

    const onFocusButtonWithText = () => {
        setButtonWithTextStyle(styles["button-on"]);
        setPreventMouseUpOnButtonWithText(true);
    }

    const onBlurButtonWithText = () => {
        console.log(`blur! ${text}`);
        if (!isButtonWithTextFocused) {
            setButtonWithTextStyle(styles.button);
        } else {
            setButtonWithTextStyle(styles["button-wo-focus-active"]);
        }
    }

    const buttonWithText: JSX.Element | undefined = (props.text !== undefined && props.content === undefined)
        ?
        <button
            className={buttonTextStyle}
            onMouseDown={onMouseDownButtonWithText}
            onMouseUp={onMouseUpButtonWithText}
            onFocus={onFocusButtonWithText}
            onBlur={onBlurButtonWithText}
            onClick={onClickButton}
        >
            {text}
        </button>
        : undefined;

    const onMouseEnterButtonWithContent = (_: BaseSyntheticEvent) => {
    }

    const onMouseLeaveButtonWithContent = (_: BaseSyntheticEvent) => {
    }

    const buttonWithTextAndRightIcon: JSX.Element | undefined =
        (props.content !== undefined && props.content?.icon !== undefined && text !== undefined)
            ? <button
                className={styles["button-with-content"]}
                onMouseEnter={onMouseEnterButtonWithContent}
                onMouseLeave={onMouseLeaveButtonWithContent}
                onClick={onClickButton}
            >
                {text}
                {content!.icon}
            </button>
            : undefined;

    const buttonWithTextAndRightHotKeyInfo: JSX.Element | undefined =
        (props.content !== undefined && props.content?.hotkeyInfo !== undefined && text !== undefined)
            ? <button
                className={styles["button-with-content"]}
                onMouseEnter={onMouseEnterButtonWithContent}
                onMouseLeave={onMouseLeaveButtonWithContent}
                onClick={onClickButton}
            >
                {text}
                <div className="hotkey-info">
                    {content!.hotkeyInfo}
                </div>
            </button>
            : undefined;

    const buttonWithTextInSubMenu: JSX.Element | undefined =
        (text !== undefined)
            ? <button
                className={styles["button-with-content"]}
                onMouseEnter={onMouseEnterButtonWithContent}
                onMouseLeave={onMouseLeaveButtonWithContent}
                onClick={onClickButton}
            >
                {text}
            </button>
            : undefined;

    return (
        (buttonWithText !== undefined) ? buttonWithText
            : (buttonWithTextAndRightIcon) ? buttonWithTextAndRightIcon
                : (buttonWithTextInSubMenu !== undefined) ? buttonWithTextInSubMenu
                    : <div></div>
    );
}
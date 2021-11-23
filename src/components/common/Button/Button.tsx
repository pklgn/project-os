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

export type ButtonType = {
    buttons: {
        buttonWithText: JSX.Element | undefined,
        buttonWithTextAndRightIcon: JSX.Element | undefined,
        buttonWithTextAndRightHotKeyInfo: JSX.Element | undefined,
        buttonWithTextInSubMenu: JSX.Element | undefined
    },
    info: {
        isOn: boolean,
        forButtonWithText: {
            isButtonWithTextFocused: boolean
        },
        forButtonWithTextAndRightIcon: {
            isButtonWithTextAndRightIconFocused: boolean
        },
    },
    actions: {
        setOnOffButton: (s: boolean) => void,
        toggleOnOffButton: () => void,
        forButtonWithText: {
            setOnOffFocusStyle: (s: boolean) => void,
            toggleOnOffFocusStyleButton: () => void
        }
    }
}

export function Button(props: ButtonProps = {
    text: "",
    content: undefined,
    foo: () => { },
}): ButtonType {
    const { text, content } = props;
    const [isButtonOn, setButtonState] = useState(false);

    const setOnOffButton = (state: boolean) => {
        setButtonState(state);
    }

    const toggleOnOffButton = () => {
        setButtonState(!isButtonOn);
    }

    const onClickButton = (_: BaseSyntheticEvent) => {
        if (props.foo !== undefined) {
            props.foo();
        }
    }

    const [buttonTextStyle, setButtonWithTextStyle] = useState(styles.button);

    const [preventMouseUpOnButtonWithText, setPreventMouseUpOnButtonWithText] = useState(false);
    const [isButtonWithTextFocused, setButtonWithTextFocus] = useState(false);

    const setOnOffFocusButtonWithText = (state: boolean) => {
        setButtonWithTextFocus(state);
    }

    const toggleOnOffFocusStyleButtonWithText = () => {
        setOnOffFocusButtonWithText(!isButtonWithTextFocused);
    }

    const onMouseDownButtonWithText = (event: BaseSyntheticEvent) => {
        setButtonWithTextStyle(styles["button-on"]);
        event.target.focus();
    }

    const onMouseUpButtonWithText = (event: BaseSyntheticEvent) => {
        if (preventMouseUpOnButtonWithText) {
            setPreventMouseUpOnButtonWithText(false);
        } else {
            setButtonState(false);
            event.target.blur();
        }
        setButtonWithTextStyle(styles.button);
    }

    const onFocusButtonWithText = () => {
        setButtonWithTextStyle(styles["button-on"]);
        setButtonState(true);
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

    const buttonWithText: JSX.Element | undefined = (props.text !== undefined)
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
        setButtonState(true);
    }

    const onMouseLeaveButtonWithContent = (_: BaseSyntheticEvent) => {
        setButtonState(false);
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

    return {
        buttons: {
            buttonWithText: buttonWithText,
            buttonWithTextAndRightIcon: buttonWithTextAndRightIcon,
            buttonWithTextAndRightHotKeyInfo: buttonWithTextAndRightHotKeyInfo,
            buttonWithTextInSubMenu: buttonWithTextInSubMenu
        },
        info: {
            isOn: isButtonOn,
            forButtonWithText: {
                isButtonWithTextFocused: isButtonWithTextFocused
            },
            forButtonWithTextAndRightIcon: {
                isButtonWithTextAndRightIconFocused: false
            }
        },
        actions: {
            setOnOffButton: setOnOffButton,
            toggleOnOffButton: toggleOnOffButton,
            forButtonWithText: {
                setOnOffFocusStyle: setOnOffFocusButtonWithText,
                toggleOnOffFocusStyleButton: toggleOnOffFocusStyleButtonWithText
            }
        }
    }
}
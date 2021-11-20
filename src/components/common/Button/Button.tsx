import { BaseSyntheticEvent, useState } from "react";
import styles from "./Button.module.css";

type ButtonProps = {
    title: string;
    content: {
        hotkeyInfo: string;
        icon: JSX.Element | undefined;
    } | undefined
}

export function Button(props: ButtonProps = {
    title: "",
    content: undefined,
}): JSX.Element {
    const { title, content } = props;

    const [buttonStyle, setButtonStyle] = useState(styles["button"]);

    const handlerMouseDown = (_: BaseSyntheticEvent) => {
        setButtonStyle(styles["button-on"]);
    }

    const handlerMouseUp = (_: BaseSyntheticEvent) => {
        setButtonStyle(styles.button);
    }

    const handlerMouseFocus = (event: BaseSyntheticEvent) => {
        console.log(event);
    }

    const handlerBlur = (_: BaseSyntheticEvent) => {
    }

    const button: JSX.Element = (content === undefined)
        ? <button
            className={buttonStyle}
            onMouseDown={handlerMouseDown}
            onMouseUp={handlerMouseUp}
            onFocus={handlerMouseFocus}
            onBlur={handlerBlur}
        >
            {title}
        </button>
        : <button
            className={styles["button-with-content"]}
            onMouseDown={handlerMouseDown}
            onMouseUp={handlerMouseUp}
            onFocus={handlerMouseFocus}
            onBlur={handlerBlur}
        >
            {title}
            {(content.icon !== undefined)
                ? content.icon
                : ''
            }
            {(content.hotkeyInfo !== undefined)
                ? content.hotkeyInfo
                : ''
            }
        </button>;

    return button;
}
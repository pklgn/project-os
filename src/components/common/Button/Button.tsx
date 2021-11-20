import { BaseSyntheticEvent, useState } from "react";
import styles from "./Button.module.css";

type ButtonProps = {
    title: string;
    elements: {
        triangle: JSX.Element | undefined;
        hotkeyInfo: string;
        icon: JSX.Element | undefined;
    }
}

export function Button(props: ButtonProps = {
    title: "",
    elements: {
        triangle: undefined,
        hotkeyInfo: "",
        icon: undefined
    }
}): JSX.Element {
    const { title, elements } = props;
    const triangle: JSX.Element | undefined = elements.triangle;
    const icon: JSX.Element | undefined = elements.icon;
    const hotkeyInfo: string = elements.hotkeyInfo;

    const [buttonStyle, setButtonStyle] = useState(styles["button"]);

    const handlerMouseDown = (_: BaseSyntheticEvent) => {
        setButtonStyle(styles["button-on"]);
    }

    const handlerMouseUp = (_: BaseSyntheticEvent) => {
        setButtonStyle(styles.button);
    }

    const handlerMouseFocus = (_: BaseSyntheticEvent) => {
    }

    const handlerBlur = (_: BaseSyntheticEvent) => {
    }

    const button: JSX.Element = (triangle === undefined && icon === undefined && hotkeyInfo === "")
        ? <button
            className={buttonStyle}
            onMouseDown={handlerMouseDown}
            onMouseUp={handlerMouseUp}
            onFocus={handlerMouseFocus}
            onBlur={handlerBlur}
            id="button"
        >
            {title}
        </button>
        : <button
            className={styles["button-with-content"]}
            onMouseDown={handlerMouseDown}
            onMouseUp={handlerMouseUp}
            onFocus={handlerMouseFocus}
            onBlur={handlerBlur}
            id="button-in-dropdown"
        >
            <div
                className={styles["button-content"]}
            >
                {(triangle === undefined)
                    ? icon
                    : ''
                }
                {title}
                {(icon === undefined)
                    ? triangle
                    : ''
                }
                {(icon === undefined && triangle === undefined)
                    ? <div className="hotkeyInfo">{hotkeyInfo}</div>
                    : ''
                }
            </div>
        </button>;

    return button;
}
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

    const [buttonStyle, setButtonStyle] = useState(styles.button);
    const [isButtonOn, setButtonState] = useState(false);

    const handlerMouseDown = (_: BaseSyntheticEvent) => {
        console.log('mouse down');
        setButtonStyle(styles["button-on"]);
    }

    const handlerMouseUp = (_: BaseSyntheticEvent) => {
        console.log('mouse up');
        setButtonStyle(styles.button);
    }

    const handlerClick = (event: BaseSyntheticEvent) => {
        console.log('click');
        if (isButtonOn) {
            event.target.blur();
            setButtonState(false);
        } else {
            setButtonState(true);
        }
    }

    const handlerBlur = (_: BaseSyntheticEvent) => {
        console.log('mouse up');
        setButtonStyle(styles.button);
    }


    const button: JSX.Element = (content === undefined)
        ? <button
            className={buttonStyle}
            onMouseDown={handlerMouseDown}
            onMouseUp={handlerMouseUp}
            onClick={handlerClick}
            onBlur={handlerBlur}
        >
            {title}
        </button>
        : <button
            className={styles["button-with-content"]}
            onMouseDown={handlerMouseDown}
            onMouseUp={handlerMouseUp}
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

    return button;
}
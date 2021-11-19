import { BaseSyntheticEvent, useState } from "react";
import styles from "./Button.module.css";

type ButtonProps = {
    title: string;
    isInDropDown: boolean;
    atDropDownMenuProps: {
        hasTriangleAndSubMenu: boolean;
        isBlockEnd: boolean;
    };
    hotkeyInfo: string;
}

export function Button(props: ButtonProps = {
    title: "",
    isInDropDown: false,
    atDropDownMenuProps: {
        hasTriangleAndSubMenu: false,
        isBlockEnd: false
    },
    hotkeyInfo: "",
}): JSX.Element {
    const { title, isInDropDown } = props;
    const hasTriangleAndSubMenu: boolean = props.atDropDownMenuProps.hasTriangleAndSubMenu;
    const isBlockEnd: boolean = props.atDropDownMenuProps.isBlockEnd;
    const hotkeyInfo: string = props.hotkeyInfo;

    const [buttonStyle, setButtonStyle] = useState(styles["button-default"]);
    const [buttonInDropDownMenuStyle, setbuttonInDropDownMenuStyle] = useState(styles["dropdown-button-content"]);

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

    const button: JSX.Element = (isInDropDown)
        ? <button
            className={styles["dropdown-button"]}
            onMouseDown={handlerMouseDown}
            onMouseUp={handlerMouseUp}
            onFocus={handlerMouseFocus}
            onBlur={handlerBlur}
            id="button-in-dropdown"
        >
            <div
                className={buttonInDropDownMenuStyle}
            >
                {title}
                {(hasTriangleAndSubMenu)
                    ? <div className={styles.triangle}></div>
                    : ''
                }
                {(hotkeyInfo)
                  ? <div>{hotkeyInfo}</div> 
                  : ''
                }
            </div>
        </button>
        : <button
            className={buttonStyle}
            onMouseDown={handlerMouseDown}
            onMouseUp={handlerMouseUp}
            onFocus={handlerMouseFocus}
            onBlur={handlerBlur}
            id="button"
        >
            {title}
        </button>;

    return (
        <div className={styles.button}>
            {button}
            {(isBlockEnd)
                ? <div className={styles["block-end-line"]}></div>
                : ''
            }
        </div>
    );
}
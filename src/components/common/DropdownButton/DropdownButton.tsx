import { BaseSyntheticEvent, useState } from "react";
import styles from "./DropdownButton.module.css";

export function DropdownButton(props: {
    title: string;
    menu: Map<string, boolean[]>;
}): JSX.Element {
    const {
        title,
        menu,
    } = props;

    const [triangleState, setTrianglesStyle] = useState(['']);
    const [dropdownMenuStyle, setDropdownMenuStyle] = useState(styles["dropdown-menu-hidden"]);

    const trianglesStyle: string[] = [];
    const handlerOnMouseEnter = (event: BaseSyntheticEvent) => {
        const targetId: number = parseInt(event.target.getAttribute("id"));
        trianglesStyle[targetId] = styles["triangle-hovered"];
        setTrianglesStyle(trianglesStyle);
    }

    const handlerOnMouseLeave = (event: BaseSyntheticEvent) => {
        const targetId: number = parseInt(event.target.getAttribute("id"));
        trianglesStyle[targetId] = styles.triangle;
        setTrianglesStyle(trianglesStyle);
    }

    const handlerFocus = () => {
        setDropdownMenuStyle(styles["dropdown-menu"]);
    }

    const handleBlur = () => {
        setDropdownMenuStyle(styles["dropdown-menu-hidden"]);
    }

    const menuElements: JSX.Element[] = [];
    let key: number = 0;
    menu.forEach((info, title) => {
        const hasSubMenu: boolean = info[0];
        const isBlockEnd: boolean = info[1];
        if (hasSubMenu) {
            trianglesStyle.push(styles.triangle);
        } else {
            trianglesStyle.push('');
        }

        const element: JSX.Element = (hasSubMenu)
            ? <button
                className={styles.subbuton}
                onMouseEnter={handlerOnMouseEnter}
                onMouseLeave={handlerOnMouseLeave}
                id={key.toString()}
            >
                {title}
                <div className={trianglesStyle[key]} id={key.toString()}></div>
            </button>
            : <button
                className={styles.subbuton}
                onMouseEnter={handlerOnMouseEnter}
                onMouseLeave={handlerOnMouseLeave}
                id={key.toString()}
            >
                {title}
            </button>

        const finElement: JSX.Element = (isBlockEnd)
            ? <div className={styles["block-end"]}>
                {element}
                <div className={styles["block-end-line"]}></div>
            </div>
            : element;

        key++;
        menuElements.push(finElement);
    });

    return (
        <div className={styles.dropdown}>
            <button 
              className={styles.button}
              onFocus={handlerFocus}
              onBlur={handleBlur}
            >
                {title}
            </button>
            <div className={dropdownMenuStyle}>
                {menuElements}
            </div>
        </div>
    );
}
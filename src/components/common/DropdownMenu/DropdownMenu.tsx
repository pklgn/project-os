import { BaseSyntheticEvent, useState } from "react";
import { Button } from "../Button/Button";
import styles from "./DropdownMenu.module.css";

type DropdownMenuProps = {
    summoningButtonPlace: 'above'|'left'|'default',
    elementsArray: JSX.Element[],
    summoningButton: Button | undefined,
    bottomBorderAfterElement : number[] | undefined,
}

export function DropdownMenu(props: DropdownMenuProps = {
    summoningButtonPlace: 'default',
    summoningButton: undefined,
    elementsArray: [],
    bottomBorderAfterElement : undefined,
}): JSX.Element {

    const [menuRender, setMenuRender] = useState(false);

    const menu: JSX.Element[] = (props.bottomBorderAfterElement !== undefined) 
        ? props.elementsArray.map((element, index) => {
            if (props.bottomBorderAfterElement ?.includes(index)) {
                return <div className="element-with-hr">
                    {element}
                    <div className={styles["block-end-line"]}></div>
                </div>
            }
            return element;
        })
        : props.elementsArray;


    return (
        <div className={styles.dropdown}>
            {props.summoningButton?.button}
            {(props.summoningButton?.isOn)
                ? (props.summoningButtonPlace === "above") 
                    ? <div className={styles["dropdown-menu"]}>{menu}</div>
                    : <div className={styles["dropdown-menu-rightside"]}>{menu}</div>
                : ''}
        </div>
    );
}
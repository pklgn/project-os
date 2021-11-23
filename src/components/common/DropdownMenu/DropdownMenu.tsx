import { BaseSyntheticEvent, useContext, useEffect, useState } from "react";
import { Button } from "../Button/Button";
import styles from "./DropdownMenu.module.css";

type DropdownMenuProps = {
    summoningButtonPlace: 'above' | 'left' | 'default',
    elementsArray: JSX.Element[],
    summoningButton: Button | undefined,
    bottomBorderAfterElement: number[] | undefined
}

export function DropdownMenu(props: DropdownMenuProps = {
    summoningButtonPlace: 'default',
    summoningButton: undefined,
    elementsArray: [],
    bottomBorderAfterElement: undefined
}): JSX.Element {

    const [menuRender, setMenuRender] = useState(false);

    useEffect(() => {
        setMenuRender(props.summoningButton!.isOn);
    }, [props.summoningButton?.isOn]);

    const onMouseClick = (_: BaseSyntheticEvent) => {
        console.log('click dropdown!');
    }

    const menu: JSX.Element[] = (props.bottomBorderAfterElement !== undefined)
        ? props.elementsArray.map((element, index) => {
            if (props.bottomBorderAfterElement?.includes(index)) {
                return <div className="element-with-hr">
                    {element}
                    <div className={styles["block-end-line"]}></div>
                </div>
            }
            return element;
        })
        : props.elementsArray;

    return (
        <div
            className={styles.dropdown}
        >
            {props.summoningButton?.button}
            {(menuRender)
                ? (props.summoningButtonPlace === "above")
                    ? <div
                        className={styles["dropdown-menu"]}
                        onClick={onMouseClick}
                    >
                        {menu}
                    </div>
                    : <div
                        className={styles["dropdown-menu-rightside"]}
                        onClick={onMouseClick}
                    >
                        {menu}
                    </div>
                : ''}
        </div>
    );
}
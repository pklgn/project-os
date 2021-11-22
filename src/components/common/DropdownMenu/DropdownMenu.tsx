import { BaseSyntheticEvent, useEffect, useState } from "react";
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

    // useEffect(() => {
    //     if (props.summoningButton?.isOn) {
    //         setMenuRender(true);
    //     } else {
    //         setMenuRender(false);
    //     }
    // }, [props.summoningButton?.isOn]);

    const onMouseClick = (_: BaseSyntheticEvent) => {
        //console.log('click dropdown!');
    }

    const onMouseOver = (_: BaseSyntheticEvent) => {
        //console.log('over dropdown');
        //props.summoningButton?.setOn(false);
    }

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
        <div
          className={styles.dropdown}
          onClick={onMouseClick}
          onMouseOver={onMouseOver}
        >
            {props.summoningButton?.button}
            {(props.summoningButton?.isOn)
                ? (props.summoningButtonPlace === "above") 
                    ? <div className={styles["dropdown-menu"]}>{menu}</div>
                    : <div className={styles["dropdown-menu-rightside"]}>{menu}</div>
                : ''}
        </div>
    );
}
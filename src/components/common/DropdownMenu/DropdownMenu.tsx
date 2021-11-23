import React, { BaseSyntheticEvent, useEffect, useRef, useState } from "react";
import { generateUUId } from "../../../model/utils/uuid";
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

    const summoningButton: Button = props.summoningButton!;
    const [menuRender, setMenuRender] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        
        const hendler = (event: MouseEvent) => {
            const target = event.target as Node;
            summoningButton.setOnOffFocusStyle(false);
            if (summoningButton.isOn) {
                if (menuRef!.current!.contains(target)) {
                    summoningButton.setOnOffFocusStyle(true);
                    console.log(`match sumoningState: ${summoningButton.isOn}`);
                } else {
                    summoningButton.setOnOffButton(false);
                    summoningButton.setOnOffFocusStyle(false);
                    summoningButton.makeBlur();
                    console.log(`miss sumoningState: ${summoningButton.isOn}`);
                }
                console.log(menuRef!.current!.contains(target));
            }
        }

        setMenuRender(summoningButton.isOn);

        document.addEventListener("mousedown", hendler);

        return () => {
            document.removeEventListener("mousedown", hendler);
        }
    }, [summoningButton.isOn]);

    const onMouseClick = (_: BaseSyntheticEvent) => {
        console.log('click dropdown!');
        const eventTarget = _.target;
        console.log(_.target);
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
            onClick={onMouseClick}
            ref={menuRef}
        >
            {summoningButton.button}
            {(menuRender)
                ? (props.summoningButtonPlace === "above")
                    ? <div
                        className={styles["dropdown-menu"]}
                    >
                        {menu}
                    </div>
                    : <div
                        className={styles["dropdown-menu-rightside"]}
                    >
                        {menu}
                    </div>
                : ''}
        </div>
    );
}
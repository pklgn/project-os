import React, { BaseSyntheticEvent, useEffect, useRef, useState } from "react";
import { ButtonType } from "../Button/Button";
import styles from "./DropdownMenu.module.css";

type DropdownMenuProps = {
    summoningButtonPlace: 'above' | 'left' | 'default',
    elementsArray: JSX.Element[],
    summoningButtonType: ButtonType | undefined,
    bottomBorderAfterElement: number[] | undefined
}

export function DropdownMenu(props: DropdownMenuProps = {
    summoningButtonPlace: 'default',
    summoningButtonType: undefined,
    elementsArray: [],
    bottomBorderAfterElement: undefined
}): JSX.Element {

    const summoningButtonType: ButtonType = props.summoningButtonType!;
    const [menuRender, setMenuRender] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const isSummoningButtonWithIcon: boolean = props.summoningButtonType!.buttons.buttonWithTextAndRightIcon !== undefined;

    useEffect(() => {

        const handler = (isSummoningButtonWithIcon)
            ? (_: MouseEvent) => {

            }
            : (event: MouseEvent) => {
                const target = event.target as Node;

                const buttonWithTextOnlyActions = summoningButtonType.actions.forButtonWithText;

                buttonWithTextOnlyActions.setOnOffFocusStyle(false);
                if (summoningButtonType.info.isOn) {
                    if (menuRef!.current!.contains(target)) {
                        buttonWithTextOnlyActions.setOnOffFocusStyle(true);
                        buttonWithTextOnlyActions.setOnOffFocusStyle(true);
                        console.log(`match summoningState: ${summoningButtonType.info.isOn}`);
                    } else {
                        summoningButtonType.actions.setOnOffButton(false);
                        buttonWithTextOnlyActions.setOnOffFocusStyle(false);
                        console.log(`miss summoningState: ${summoningButtonType.info.isOn}`);
                    }
                } else {
                    console.log('button is off');
                }
            }

        console.log(`batton state: ${summoningButtonType.info.isOn}`);
        setMenuRender(summoningButtonType.info.isOn);

        document.addEventListener("mousedown", handler);

        return () => {
            document.removeEventListener("mousedown", handler);
        }
    }, [summoningButtonType.info.isOn]);

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
            onClick={onMouseClick}
            ref={menuRef}
        >
            {(isSummoningButtonWithIcon)
                ? summoningButtonType.buttons.buttonWithTextAndRightIcon
                : summoningButtonType.buttons.buttonWithText
            }
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
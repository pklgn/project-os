import { BaseSyntheticEvent, useEffect, useRef, useState } from "react";
import { Button } from "../Button/Button";
import styles from "./DropdownMenu.module.css";

type DropdownMenuProps = {
    summoningButtonPlace: 'above' | 'left' | 'default',
    elementsArray: JSX.Element[],
    summoningButtonText: string,
    bottomBorderAfterElement: number[] | undefined
}

export function DropdownMenu(props: DropdownMenuProps = {
    summoningButtonPlace: 'default',
    summoningButtonText: "",
    elementsArray: [],
    bottomBorderAfterElement: undefined
}): JSX.Element {

    const [menuRender, setMenuRender] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    // useEffect(() => {

    //     const handler = (isSummoningButtonWithIcon)
    //         ? (_: MouseEvent) => {

    //         }
    //         : (event: MouseEvent) => {
                
    //         }

    //     document.addEventListener("mousedown", handler);

    //     return () => {
    //         document.removeEventListener("mousedown", handler);
    //     }
    // });

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
            <Button text={props.summoningButtonText} content={undefined} foo={undefined}/>
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
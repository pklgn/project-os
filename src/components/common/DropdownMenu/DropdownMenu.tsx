import { useState } from "react";
import styles from "./DropdownMenu.module.css";

type DropdownMenuProps = {
    summoningButtonPlace: 'above'|'left'|'default',
    elementsArray: JSX.Element[],
    summoningButton: JSX.Element | undefined,
    hrAfterElement: number[] | undefined,
}

export function DropdownMenu(props: DropdownMenuProps = {
    summoningButtonPlace: 'default',
    summoningButton: undefined,
    elementsArray: [],
    hrAfterElement: undefined,
},
): JSX.Element {

    const [menuRender, setMenuRender] = useState(false);
    const hendlerClick = () => {
        setMenuRender(!menuRender);
    }

    const menu: JSX.Element[] = (props.hrAfterElement !== undefined) 
        ? props.elementsArray.map((element, index) => {
            if (props.hrAfterElement?.includes(index)) {
                return <div className="element-with-hr">
                    {element}
                    <div className={styles["block-end-line"]}></div>
                </div>
            }
            return element;
        })
        : props.elementsArray;


    return (
        <div className={styles.dropdown} onClick={hendlerClick} onBlur={hendlerClick}>
            {props.summoningButton}
            {/* {(menuRender)
                ? <div className={styles["dropdown-menu"]}>{menu}</div>
                : ''} */}
        </div>
    );
}
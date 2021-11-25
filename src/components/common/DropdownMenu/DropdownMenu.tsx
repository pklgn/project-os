import { BaseSyntheticEvent, useEffect, useRef, useState } from "react";
import { Button } from "../Button/Button";
import styles from "./DropdownMenu.module.css";

type DropdownMenuProps = {
    summoningButtonPlace: 'above' | 'left' | 'default',
    summoningButtonType: 'text' | 'textInSubMenu',
    elementsArray: JSX.Element[],
    summoningButtonText: string,
    bottomBorderAfterElement: number[] | undefined
}

type buttonState = 'disabled' | 'active' | 'focused'

export function DropdownMenu(props: DropdownMenuProps = {
    summoningButtonPlace: 'default',
    summoningButtonType: 'text',
    summoningButtonText: '',
    elementsArray: [],
    bottomBorderAfterElement: undefined
}): JSX.Element {

    const {
        summoningButtonPlace,
        summoningButtonType,
        summoningButtonText,
        elementsArray,
        bottomBorderAfterElement
    } = props;

    const [menuRender, setMenuRender] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const summoningButtonRef = useRef<HTMLDivElement>(null);
    let summoningButtonState: buttonState = 'disabled';

    useEffect(() => {
        const handler =
            (event: MouseEvent) => {
                const target = event.target as Node;

                if (summoningButtonRef.current?.contains(target)) {
                    console.log('yes!');
                    setMenuRender(true);
                    if (menuRender) {
                        setMenuRender(false);
                    }
                }

            }

        document.addEventListener("mousedown", handler);

        return () => {
            document.removeEventListener("mousedown", handler);
        }
    }, [menuRender]);

    const onMouseClick = (_: BaseSyntheticEvent) => {
        // console.log('click dropdown!');
    }

    const menu: JSX.Element[] = (bottomBorderAfterElement !== undefined)
        ? elementsArray.map((element, index) => {
            if (bottomBorderAfterElement?.includes(index)) {
                return <div className="element-with-hr">
                    {element}
                    <div className={styles["block-end-line"]}></div>
                </div>
            }
            return element;
        })
        : elementsArray;

    return (
        <div
            className={styles.dropdown}
            onClick={onMouseClick}
            ref={menuRef}
        >
            <div
                ref={summoningButtonRef}
            >
                <Button
                    text={summoningButtonText}
                    state={summoningButtonState}
                    contentType={summoningButtonType}
                    content={undefined}
                    foo={undefined}
                />
            </div>
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
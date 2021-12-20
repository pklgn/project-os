import { useEffect, useRef, useState } from "react";
import { Button } from "../Button/Button";
import { Triangle } from "../icons/Triangle/Triangle";
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
    const rightSideSubMenuRef = useRef<HTMLDivElement>(null);
    const bottomSideSubMenuRef = useRef<HTMLDivElement>(null);
    const [
        buttonDisabledState,
        buttonActiveState,
        buttonFocusedState
    ]: buttonState[] = ['disabled', 'active', 'focused'];

    const [buttonCurrentState, setButtonCurrentState] = useState(buttonDisabledState);

    const mouseDownOnSummoningButtonHandler =
        (event: MouseEvent) => {
            const target = event.target as Node;
            if (summoningButtonRef.current?.contains(target)) {
                setButtonCurrentState(buttonActiveState);
            } else {
                if (!menuRef.current?.contains(target) && menuRender) {
                    setMenuRender(false);
                    setButtonCurrentState(buttonDisabledState);
                }
            }
        }

    const mouseUpOnSummoningButtonHandler =
        (event: MouseEvent) => {
            const target = event.target as Node;
            if (summoningButtonRef.current?.contains(target)) {
                if (menuRender) {
                    setMenuRender(false);
                    setButtonCurrentState(buttonDisabledState);
                } else {
                    setMenuRender(true);
                    setButtonCurrentState(buttonFocusedState);
                }
            }
        }

    const mouseOverOnSummoningButtonHandler =
        (event: MouseEvent) => {
            const target = event.target as Node;
            if (summoningButtonRef.current?.contains(target)) {
                setMenuRender(true);
            }
        }

    const mouseOutOnSummoningButtonHandler =
        (event: MouseEvent) => {
            const target = event.target as Node;
            if (menuRef.current?.contains(target)) {
                setMenuRender(true);
            } else {
                setMenuRender(false);
            }
        }

    const clickHandler =
        (event: MouseEvent) => {
            const target = event.target as Node;
            if (rightSideSubMenuRef.current?.contains(target) || bottomSideSubMenuRef.current?.contains(target)) {
                let isNodeSummoningSubMenu = false;
                target.childNodes.forEach((value) => {
                    if (typeof value.lastChild?.nodeValue === "object") {
                        isNodeSummoningSubMenu = true;
                    }
                });
                if (!isNodeSummoningSubMenu) {
                    setMenuRender(false);
                    setButtonCurrentState(buttonDisabledState);
                }
            }
        }

    useEffect(() => {

        if (summoningButtonPlace === 'above') {
            document.addEventListener("mousedown", mouseDownOnSummoningButtonHandler);
            document.addEventListener("mouseup", mouseUpOnSummoningButtonHandler);
            document.addEventListener("click", clickHandler);
        }

        if (summoningButtonPlace === 'left') {
            document.addEventListener("mouseover", mouseOverOnSummoningButtonHandler);
            document.addEventListener("mouseout", mouseOutOnSummoningButtonHandler);
            document.addEventListener("click", clickHandler);
        }

        return () => {
            if (summoningButtonPlace === 'above') {
                document.removeEventListener("mousedown", mouseDownOnSummoningButtonHandler);
                document.removeEventListener("mouseup", mouseUpOnSummoningButtonHandler);
            }
            if (summoningButtonPlace === 'left') {
                document.removeEventListener("mouseover", mouseOverOnSummoningButtonHandler);
                document.removeEventListener("mouseout", mouseOutOnSummoningButtonHandler);
                document.removeEventListener("click", clickHandler);
            }
        }
    });

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
            ref={menuRef}
        >
            <div
                ref={summoningButtonRef}
            >
                <Button
                    text={summoningButtonText}
                    state={buttonCurrentState}
                    contentType={summoningButtonType}
                    content={(summoningButtonType === 'text')
                        ? undefined
                        : (summoningButtonType === 'textInSubMenu')
                            ? { hotkeyInfo: "", icon: <Triangle width={10} height={10} color="grey" /> }
                            : undefined
                    }
                    foo={() => undefined}
                />
            </div>
            {(menuRender)
                ? (props.summoningButtonPlace === "above")
                    ? <div
                        className={styles["dropdown-menu"]}
                        ref={bottomSideSubMenuRef}
                    >
                        {menu}
                    </div>
                    : <div
                        className={styles["dropdown-menu-rightside"]}
                        ref={rightSideSubMenuRef}
                    >
                        {menu}
                    </div>
                : ''}
        </div>
    );
}
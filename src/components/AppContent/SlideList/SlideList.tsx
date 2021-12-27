import styles from "./SlideList.module.css";

import { BaseSyntheticEvent, useEffect, useRef, useState } from "react";

import { SlideListItem } from "./SlideListItem";

import { Slide } from "../../../model/types";

type SlideListProps = {
    slidesList: Slide[],
}

export function SlideList(props: SlideListProps) {
    const ref = useRef<HTMLUListElement>(null);

    const [itemStatusList, changeStatusList] = useState([false]);
    useEffect(() => {
        changeStatusList(
            props.slidesList.map((_) => {
                return false
            })
        );
    }, [props.slidesList]);

    function getVariantOfItemListClickHandlers(key: 'default' | 'ctrlPressed' | 'shiftPressed'): (event: BaseSyntheticEvent) => void {
        switch (key) {
            case 'default':
                return (event: BaseSyntheticEvent) => {
                    const itemIndex: number = event.target.getAttribute("id");
                    const newItemStatusList: boolean[] = itemStatusList.map((itemStatus, index) => {
                        if (index == itemIndex) {
                            return !itemStatus;
                        } else {
                            return false;
                        }
                    });

                    changeStatusList(newItemStatusList);
                }
            case 'ctrlPressed':
                return (event: BaseSyntheticEvent) => {
                    const itemIndex: number = event.target.getAttribute("id");
                    const newItemStatusList: boolean[] = itemStatusList.map((itemStatus, index) => {
                        if (index == itemIndex) {
                            return !itemStatus;
                        } else {
                            return itemStatus;
                        }
                    });

                    changeStatusList(newItemStatusList);
                }

            case 'shiftPressed':
                return (event: BaseSyntheticEvent) => {
                    const itemIndex: number = event.target.getAttribute("id");
                    const newItemStatusList: boolean[] = (itemStatusList.some(itemStatus => itemStatus))
                        ? itemStatusList.map((itemStatus, index) => {
                            if (index == itemIndex) {
                                return !itemStatus;
                            } else {
                                return itemStatus;
                            }
                        })
                        : itemStatusList.map((itemStatus, index) => {
                            if (index == itemIndex) {
                                return !itemStatus;
                            } else {
                                return itemStatus;
                            }
                        });

                    changeStatusList(newItemStatusList);
                }

            default:
                return (event: BaseSyntheticEvent) => {
                    const itemIndex: number = event.target.getAttribute("id");
                    const newItemStatusList: boolean[] = itemStatusList.map((itemStatus, index) => {
                        if (index == itemIndex) {
                            return !itemStatus;
                        } else {
                            return false;
                        }
                    });

                    changeStatusList(newItemStatusList);
                }
        }
    }

    const [handlerKey, changeClickHandlerKey] = useState('default' as 'default' | 'ctrlPressed' | 'shiftPressed');
    const onClickListHandler = getVariantOfItemListClickHandlers(handlerKey);

    useEffect(() => {
        const handlerKeyDown = (event: KeyboardEvent) => {
            if (event.code === 'ControlLeft') {
                changeClickHandlerKey('ctrlPressed');
            } else if (event.code === 'ShiftLeft') {
                changeClickHandlerKey('shiftPressed');
            }
        }

        const handlerKeyUp = (event: KeyboardEvent) => {
            if (event.code === 'ShiftLeft' || event.code === 'ControlLeft') {
                changeClickHandlerKey('default');
            }
        }

        const handlerMouseClick = (event: MouseEvent) => {
        }

        document.addEventListener('keydown', handlerKeyDown);
        document.addEventListener('keyup', handlerKeyUp);
        document.addEventListener('click', handlerMouseClick);

        return () => {
            document.removeEventListener('keydown', handlerKeyDown);
            document.removeEventListener('keyup', handlerKeyUp);
            document.removeEventListener('click', handlerMouseClick);
        }
    });

    return <ul
        className={`${styles.list} ${styles['list-wrapper']}`}
        ref={ref}
        onClick={onClickListHandler}
    >
        {
            props.slidesList.map((slide, index) => {
                return <SlideListItem item={slide} itemIndex={index} status={itemStatusList[index]} key={slide.id} />
            })
        }
    </ul>;
}
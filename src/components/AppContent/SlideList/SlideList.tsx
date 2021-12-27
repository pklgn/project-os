import styles from "./SlideList.module.css";

import { BaseSyntheticEvent, useEffect, useRef, useState } from "react";

import { SlideListItem } from "./SlideListItem";

import { Slide } from "../../../model/types";

import { bindActionCreators } from "redux";
import { useDispatch } from "react-redux";
import { setSelectedIdInEditor } from "../../../redux/action-creators/editorActionCreators";
import { store, StoreType } from "../../../redux/store";

type SlideListProps = {
    slidesList: Slide[],
}

export function SlideList(props: SlideListProps) {
    const ref = useRef<HTMLUListElement>(null);

    const dispatch = useDispatch();
    const dispatchSetIdAction = bindActionCreators(setSelectedIdInEditor, dispatch);

    const [lastActiveItemIndex, changeLastActiveItemIndex] = useState(getActiveSlideIndex(store));
    const [itemStatusList, changeStatusList] = useState(
        props.slidesList.map((_, index) => {
            console.log(`last ${lastActiveItemIndex} index:${index}`);
            
            if (index === lastActiveItemIndex) {
                return true;
            }
            return false;
        })
    );
    const [itemHrStatus, changeItemHrStatus] = useState([] as boolean[]);

    useEffect(() => {
        changeStatusList(
            props.slidesList.map((_) => {
                return false
            })
        );
        changeItemHrStatus(
            [
                ...props.slidesList.map((_) => {
                    return false
                }),
                false
            ]
        );
    }, [props.slidesList]);

    function getVariantOfItemListClickHandlers(key: 'default' | 'ctrlPressed' | 'shiftPressed'):
        (event: BaseSyntheticEvent) => void {
        switch (key) {
            case 'default':
                return (event: BaseSyntheticEvent) => {
                    if (event.target.getAttribute("id")) {
                        const itemIndex: number = event.target.getAttribute("id") - 1;

                        const newItemStatusList: boolean[] = itemStatusList.map((_, index) => {
                            if (index == itemIndex) {
                                return true;
                            } else {
                                return false;
                            }
                        });

                        changeLastActiveItemIndex(itemIndex);

                        changeStatusList(newItemStatusList);

                        dispatchSetIdAction({
                            selectedSlidesIds: [props.slidesList[itemIndex].id],
                            selectedSlideElementsIds: []
                        });
                    }

                }
            case 'ctrlPressed':
                return (event: BaseSyntheticEvent) => {
                    if (event.target.getAttribute("id")) {
                        const itemIndex: number = event.target.getAttribute("id") - 1;
                        console.log(`find index ${itemIndex}`);

                        const newItemStatusList: boolean[] = itemStatusList.map((itemStatus, index) => {
                            if (index == itemIndex) {
                                return !itemStatus;
                            } else {
                                return itemStatus;
                            }
                        });

                        const indexOfSameIdInModel: number =
                            store.getState().model.selectedSlidesIds.findIndex(item =>
                                item === props.slidesList[itemIndex].id)
                            ;

                        const newSelectedSlideId =
                            (indexOfSameIdInModel === -1)
                                ? [
                                    ...store.getState().model.selectedSlidesIds,
                                    props.slidesList[itemIndex].id
                                ]
                                : [
                                    ...store.getState().model.selectedSlidesIds.slice(0, indexOfSameIdInModel),
                                    ...store.getState().model.selectedSlidesIds.slice(indexOfSameIdInModel + 1)
                                ];
                        changeLastActiveItemIndex(itemIndex);
                        changeStatusList(newItemStatusList);

                        dispatchSetIdAction({
                            selectedSlidesIds: newSelectedSlideId,
                            selectedSlideElementsIds: []
                        });
                    }
                }

            case 'shiftPressed':
                return (event: BaseSyntheticEvent) => {
                    if (event.target.getAttribute("id")) {
                        const itemIndex: number = event.target.getAttribute("id") - 1;
                        const newItemStatusList: boolean[] = itemStatusList.map((_, index) => {
                            if (index >= lastActiveItemIndex && index <= itemIndex ||
                                index >= itemIndex && index <= lastActiveItemIndex) {
                                return true;
                            } else {
                                return false;
                            }
                        });

                        changeStatusList(newItemStatusList);
                        let newSelectedSlidesIds: string[] = [];
                        props.slidesList.map((item, index) => {
                            if (newItemStatusList[index]) {
                                newSelectedSlidesIds.push(item.id);
                            }
                        });

                        dispatchSetIdAction({
                            selectedSlidesIds: newSelectedSlidesIds,
                            selectedSlideElementsIds: []
                        });
                    }

                }
        }
    }

    const [handlerKey, changeClickHandlerKey] = useState('default' as 'default' | 'ctrlPressed' | 'shiftPressed');
    const onClickListHandler = getVariantOfItemListClickHandlers(handlerKey);

    const [isMouseClickedDown, setMouseClicked] = useState(false);

    useEffect(() => {
        const handlerMouseDown = (event: MouseEvent) => {
            setMouseClicked(true);
            const node = event.target as Node;
            changeClickHandlerKey('default');
            if (ref.current?.contains(node)) {
                if (event.ctrlKey) {
                    changeClickHandlerKey('ctrlPressed');
                } else if (event.shiftKey) {
                    changeClickHandlerKey('shiftPressed');
                }
            } else {
                const lastActiveSlideIndex: number = getActiveSlideIndex(store);
                changeStatusList(itemStatusList.map((itemStatus, index) => {
                    if (index != lastActiveSlideIndex) {
                        return false;
                    }
                    return itemStatus;
                }));
                dispatchSetIdAction({
                    selectedSlidesIds: [getIdOfLastActiveSlideIndex(store)],
                    selectedSlideElementsIds: []
                });
            }
        }

        const handlerMouseUp = (_: MouseEvent) => {
            setMouseClicked(false);
            changeItemHrStatus(
                itemHrStatus.map(_ => {
                    return false;
                })
            );
        }

        const handlerMouseOver = (event: MouseEvent) => {
            if (isMouseClickedDown) {
                const node = event as unknown as React.BaseSyntheticEvent<object, any, any>;
                const itemId: number = node.target.getAttribute("id");
                if (itemId) {
                    changeItemHrStatus(
                        itemHrStatus.map((_, index) => {
                            if (index == itemId) {
                                return true;
                            }
                            return false;
                        })
                    );
                }
            }
        }

        document.addEventListener('mousedown', handlerMouseDown);
        document.addEventListener('mouseup', handlerMouseUp);
        document.addEventListener('mouseover', handlerMouseOver);

        return () => {
            document.removeEventListener('mousedown', handlerMouseDown);
            document.removeEventListener('mouseup', handlerMouseUp);
            document.removeEventListener('mouseover', handlerMouseOver);
        }
    });

    return <ul
        className={`${styles.list} ${styles['list-wrapper']}`}
        ref={ref}
        onClick={onClickListHandler}
    >
        {
            props.slidesList.map((slide, index) => {
                return <>
                    <div
                        className={
                            (itemHrStatus[index])
                                ? styles['before-list-element-hr-active']
                                : styles['before-list-element-hr-disabled']
                        }
                        id={`${index}`}
                        key={index}
                    ></div>

                    <SlideListItem
                        item={slide}
                        itemIndex={index}
                        status={itemStatusList[index]}
                        key={slide.id}
                    />

                    <div
                        className={
                            (itemHrStatus[index + 1])
                                ? styles['after-list-element-hr-active']
                                : styles['after-list-element-hr-disabled']
                        }
                        id={`${index + 1}`}
                        key={index + 1}
                    ></div>
                </>;
            })
        }
    </ul>;
}

function getActiveSlideIndex(store: StoreType): number {
    const slideId: string = store.getState().model.selectedSlidesIds.slice(-1)[0];
    console.log(`${store.getState().model.presentation.slidesList.findIndex(slide => slide.id === slideId)}`);
    
    return store.getState().model.presentation.slidesList.findIndex(slide => slide.id === slideId);
}

function getIdOfLastActiveSlideIndex(store: StoreType): string {
    return store.getState().model.selectedSlidesIds.slice(-1)[0];
}
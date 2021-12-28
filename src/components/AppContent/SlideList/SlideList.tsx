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
    const dispatchSetIdAction =
        bindActionCreators(setSelectedIdInEditor, dispatch);

    const [preLastActiveSlideIndex, changePreLastActiveSlideIndex] =
        useState(getActiveSlideIndex(store));
    const [itemActiveStatusList, changeActiveStatusItemList] =
        useState([] as boolean[]);
    const [itemHrStatus, changeItemHrStatus] = useState([] as boolean[]);

    useEffect(() => {
        changeActiveStatusItemList(
            props.slidesList.map((_, index) => {
                if (index === preLastActiveSlideIndex) {
                    return true;
                }
                if (preLastActiveSlideIndex === -1 && index === 0) {
                    changePreLastActiveSlideIndex(0);
                    return true;
                }
                return false;
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

    function getVariantOfItemListClickHandlers(
        key: 'default' | 'ctrlPressed' | 'shiftPressed'
    ): (event: BaseSyntheticEvent) => void {
        const selectedSlidesIdsFromModel =
            store.getState().model.selectedSlidesIds;
        switch (key) {
            case 'default':
                return (event: BaseSyntheticEvent) => {
                    if (event.target.getAttribute("id")) {
                        const itemIndex: number =
                            event.target.getAttribute("id") - 1;

                        const newitemActiveStatusList: boolean[] =
                            itemActiveStatusList.map((_, index) => {
                                if (index == itemIndex) {
                                    return true;
                                } else {
                                    return false;
                                }
                            });

                        changePreLastActiveSlideIndex(itemIndex);

                        changeActiveStatusItemList(newitemActiveStatusList);

                        dispatchSetIdAction({
                            selectedSlidesIds: [props.slidesList[itemIndex].id],
                            selectedSlideElementsIds: []
                        });
                    }
                }
            case 'ctrlPressed':
                return (event: BaseSyntheticEvent) => {
                    if (event.target.getAttribute("id")) {
                        const itemIndex: number =
                            event.target.getAttribute("id") - 1;

                        const newitemActiveStatusList: boolean[] =
                            itemActiveStatusList.map((itemStatus, index) => {
                                if (index == itemIndex) {
                                    return !itemStatus;
                                } else {
                                    return itemStatus;
                                }
                            });

                        const indexOfSameIdInModel: number =
                            selectedSlidesIdsFromModel.findIndex(item =>
                                item === props.slidesList[itemIndex].id
                            );

                        const newSelectedSlideId =
                            (indexOfSameIdInModel === -1)
                                ? [
                                    ...selectedSlidesIdsFromModel,
                                    props.slidesList[itemIndex].id
                                ]
                                : [
                                    ...selectedSlidesIdsFromModel.slice(0, indexOfSameIdInModel),
                                    ...selectedSlidesIdsFromModel.slice(indexOfSameIdInModel + 1)
                                ];

                        changePreLastActiveSlideIndex(itemIndex);
                        changeActiveStatusItemList(newitemActiveStatusList);

                        dispatchSetIdAction({
                            selectedSlidesIds: newSelectedSlideId,
                            selectedSlideElementsIds: []
                        });
                    }
                }

            case 'shiftPressed':
                return (event: BaseSyntheticEvent) => {
                    if (event.target.getAttribute("id")) {
                        const itemIndex: number =
                            event.target.getAttribute("id") - 1;
                        const newitemActiveStatusList: boolean[] =
                            itemActiveStatusList.map((_, index) => {
                                if (index >= preLastActiveSlideIndex && index <= itemIndex ||
                                    index >= itemIndex && index <= preLastActiveSlideIndex) {
                                    return true;
                                } else {
                                    return false;
                                }
                            });

                        changeActiveStatusItemList(newitemActiveStatusList);
                        let newSelectedSlidesIds: string[] = [];
                        props.slidesList.map((item, index) => {
                            if (newitemActiveStatusList[index]) {
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

    const [handlerKey, changeClickHandlerKey] =
        useState('default' as 'default' | 'ctrlPressed' | 'shiftPressed');
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
                const lastActiveSlideIndex: number =
                    getActiveSlideIndex(store);
                changeActiveStatusItemList(
                    itemActiveStatusList.map((itemStatus, index) => {
                        if (index != preLastActiveSlideIndex) {
                            return false;
                        }
                        return itemStatus;
                    })
                );

                const savingIndex: number = (handlerKey === 'shiftPressed')
                    ? preLastActiveSlideIndex
                    : lastActiveSlideIndex;

                if (store.getState().model.selectedSlidesIds.length !== 1 &&
                    props.slidesList.length) {
                    dispatchSetIdAction({
                        selectedSlidesIds: [props.slidesList[savingIndex].id],
                        selectedSlideElementsIds: []
                    });
                }
                changePreLastActiveSlideIndex(preLastActiveSlideIndex);
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
                return <span key={index}>
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
                        status={itemActiveStatusList[index]}
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
                </span>;
            })
        }
    </ul>;
}

function getActiveSlideIndex(store: StoreType): number {
    const slideId: string = store.getState().model.selectedSlidesIds.slice(-1)[0];

    return store.getState().model.presentation.slidesList.findIndex(slide => slide.id === slideId);
}
import styles from "./SlideList.module.css";

import { BaseSyntheticEvent, useEffect, useRef, useState } from "react";

import { SlideListItem } from "./SlideListItem";

import { Slide } from "../../../model/types";

import { bindActionCreators } from "redux";
import { insertSelectedSlidesAtIndexAction } from "../../../redux/action-creators/slideActionCreators";
import { keepModelAction, setSelectedIdInEditor } from "../../../redux/action-creators/editorActionCreators";
import { useDispatch } from "react-redux";
import { store, StoreType } from "../../../redux/store";

type SlideListProps = {
    slidesList: Slide[],
}

export function SlideList(props: SlideListProps) {
    const ref = useRef<HTMLUListElement>(null);

    const dispatch = useDispatch();
    const dispatchSetIdAction =
        bindActionCreators(setSelectedIdInEditor, dispatch);
    const dispatchInsertSelectedSlides =
        bindActionCreators(insertSelectedSlidesAtIndexAction, dispatch);
    const dispatchKeepModelAction =
        bindActionCreators(keepModelAction, dispatch);

    const [preLastActiveSlideIndex, changePreLastActiveSlideIndex] =
        useState(getActiveSlideIndex(store));
    const [itemActiveStatusList, changeActiveStatusItemList] =
        useState([] as boolean[]);
    const [itemHrStatus, changeItemHrStatus] = useState([] as boolean[]);

    useEffect(() => {
        changeActiveStatusItemList(
            props.slidesList.map((_, index) => {
                const didntFindActiveSlideIndex = preLastActiveSlideIndex === -1;
                if (index === preLastActiveSlideIndex) {
                    return true;
                }
                if (didntFindActiveSlideIndex && index === 0) {
                    changePreLastActiveSlideIndex(0);
                    return true;
                }
                return false;
            })
        );
        changeItemHrStatus(
            [
                ...props.slidesList.map(_ => {
                    return false
                }),
                false
            ]
        );
    }, [props.slidesList]);

    const [handlerKey, changeClickHandlerKey] =
        useState('default' as 'default' | 'ctrlPressed' | 'shiftPressed');
    const onClickListHandler = getVariantOfItemListClickHandlers(handlerKey);

    const [isMouseReadyToDrag, setMouseReadyToDrag] = useState(false);
    const [slideIndexToGrag, changeSlideIndexToDrag] = useState(0);

    useEffect(() => {
        const handlerMouseDown = (event: MouseEvent) => {
            const node = event.target as Node;

            const nodeAsBaseEvent = event as unknown as React.BaseSyntheticEvent<object, any, any>;
            const newSlideIndexToGrag = nodeAsBaseEvent.target.getAttribute("id") - 1;
            changeSlideIndexToDrag(newSlideIndexToGrag);
            const isMouseDownOnActiveListElement = newSlideIndexToGrag !== undefined && itemActiveStatusList[newSlideIndexToGrag];
            if (isMouseDownOnActiveListElement) {
                setMouseReadyToDrag(true);
            }

            changeClickHandlerKey('default');

            const isMouseDownOnList = ref.current?.contains(node);

            if (isMouseDownOnList) {
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

        const handlerMouseUp = (event: MouseEvent) => {
            const nodeAsBaseEvent = event as unknown as
                React.BaseSyntheticEvent<object, any, any>;

            const slideIndexToInsert: number =
                nodeAsBaseEvent.target.getAttribute("id");

            const findInsertPlace =
                (slideIndexToGrag !== slideIndexToInsert - 1) &&
                (slideIndexToInsert === 0 || slideIndexToInsert);

            if (findInsertPlace && isMouseReadyToDrag) {
                //TODO обновить boolean[] стейты активностей, после того, как слайды переместились
                // changeActiveStatusItemList(
                //     itemActiveStatusList.map((_, index) => {
                //         const isThatSlideThatWasInserted =
                //             store.getState().model.selectedSlidesIds
                //                 .includes(props.slidesList[index].id);
                //         console.log(`index:${index} id:${props.slidesList[index].id} ${isThatSlideThatWasInserted}`);

                //         if (isThatSlideThatWasInserted) {
                //             return true;
                //         }
                //         return false;
                //     })
                // );
                dispatchInsertSelectedSlides(slideIndexToInsert);
                dispatchKeepModelAction();
            }
            setMouseReadyToDrag(false);
            changeItemHrStatus(
                itemHrStatus.map(_ => {
                    return false;
                })
            );
        }

        const handlerMouseOver = (event: MouseEvent) => {
            if (isMouseReadyToDrag) {
                const node = event as unknown as React.BaseSyntheticEvent<object, any, any>;
                const insertIndex: number = node.target.getAttribute("id");

                if (insertIndex) {
                    changeItemHrStatus(
                        itemHrStatus.map((_, index) => {
                            if (index == insertIndex) {
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

    function getVariantOfItemListClickHandlers(
        key: 'default' | 'ctrlPressed' | 'shiftPressed'
    ): (event: BaseSyntheticEvent) => void {
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

                        let amountOfActiveItems: number = 0;
                        itemActiveStatusList.forEach(status => {
                            if (status) {
                                amountOfActiveItems = amountOfActiveItems + 1;
                            }
                        });

                        console.log(amountOfActiveItems);

                        const newItemActiveStatusList: boolean[] =
                            itemActiveStatusList.map((itemStatus, index) => {
                                if (index == itemIndex) {
                                    if (amountOfActiveItems > 1) {
                                        amountOfActiveItems = amountOfActiveItems - 1;
                                        return !itemStatus;
                                    } else {
                                        return true;
                                    }
                                } else {
                                    return itemStatus;
                                }
                            });

                        const indexOfSameIdInModel: number =
                            props.slidesList.findIndex(item =>
                                item.id === props.slidesList[itemIndex].id
                            );

                        let newSelectedSlidesIds: string[] = [];
                        props.slidesList.map((item, index) => {
                            if (newItemActiveStatusList[index]) {
                                newSelectedSlidesIds.push(item.id);
                            }
                        });

                        const shouldAddNewIdInSelected = indexOfSameIdInModel !== -1;

                        if (shouldAddNewIdInSelected) {
                            newSelectedSlidesIds.push(props.slidesList[indexOfSameIdInModel].id);
                        } else {
                            newSelectedSlidesIds = [
                                ...newSelectedSlidesIds.slice(0, indexOfSameIdInModel),
                                ...newSelectedSlidesIds.slice(indexOfSameIdInModel + 1)
                            ];
                        }

                        changePreLastActiveSlideIndex(itemIndex);
                        changeActiveStatusItemList(newItemActiveStatusList);

                        dispatchSetIdAction({
                            selectedSlidesIds: newSelectedSlidesIds,
                            selectedSlideElementsIds: []
                        });
                    }
                }

            case 'shiftPressed':
                return (event: BaseSyntheticEvent) => {
                    if (event.target.getAttribute("id")) {
                        const itemIndex: number =
                            event.target.getAttribute("id") - 1;
                        const newItemActiveStatusList: boolean[] =
                            itemActiveStatusList.map((_, index) => {
                                if (index >= preLastActiveSlideIndex && index <= itemIndex ||
                                    index >= itemIndex && index <= preLastActiveSlideIndex) {
                                    return true;
                                } else {
                                    return false;
                                }
                            });
                        changeActiveStatusItemList(newItemActiveStatusList);

                        let newSelectedSlidesIds: string[] = [];
                        props.slidesList.map((item, index) => {
                            if (newItemActiveStatusList[index]) {
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
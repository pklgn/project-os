import styles from "./SlideList.module.css";

import { BaseSyntheticEvent, useEffect, useRef, useState } from "react";

import { SlideListItem } from "./SlideListItem";

import { Slide } from "../../../model/types";

import { bindActionCreators } from "redux";
import { addSlide, deleteSelectedSlides, insertSelectedSlidesAtIndexAction }
    from "../../../redux/action-creators/slideActionCreators";
import { keepModelAction, setSelectedIdInEditor }
    from "../../../redux/action-creators/editorActionCreators";
import { useDispatch } from "react-redux";
import { store } from "../../../redux/store";

type SlideListProps = {
    slidesList: Slide[],
}

type MouseDownHandlerType = 'default' | 'ctrlPressed' | 'shiftPressed';

export function SlideList(props: SlideListProps) {
    const ref = useRef<HTMLUListElement>(null);

    const dispatch = useDispatch();
    const dispatchSetIdAction =
        bindActionCreators(setSelectedIdInEditor, dispatch);
    const dispatchInsertSelectedSlides =
        bindActionCreators(insertSelectedSlidesAtIndexAction, dispatch);
    const dispatchKeepModelAction =
        bindActionCreators(keepModelAction, dispatch);
    const dispatchAddSlideAction =
        bindActionCreators(addSlide, dispatch);
    const dispatchDeleteSlideAction =
        bindActionCreators(deleteSelectedSlides, dispatch);

    const [itemActiveStatusList, changeActiveStatusItemList] =
        useState([] as boolean[]);
    const [itemHrStatus, changeItemHrStatus] = useState([] as boolean[]);
    const [readyForHotkeys, setHotkeysMode] = useState(false);

    useEffect(() => {
        changeActiveStatusItemList(
            props.slidesList.map((_, index) => {
                if (getActiveSlidesIndexes(props).includes(index)) {
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
        setHotkeysMode(true);
    }, [props.slidesList]);

    const [handlerKey, changeClickHandlerKey] =
        useState('default' as MouseDownHandlerType);
    const onClickListHandler = getVariantOfItemListClickHandlers(handlerKey);

    const [isMouseReadyToDrag, setMouseReadyToDrag] = useState(false);
    const [slideIndexToGrag, changeSlideIndexToDrag] = useState(0);

    useEffect(() => {
        const handlerMouseDown = (event: MouseEvent) => {
            const node = event.target as Node;

            const nodeAsBaseEvent =
                event as unknown as React.BaseSyntheticEvent<object, any, any>;
            const newSlideIndexToGrag =
                nodeAsBaseEvent.target.getAttribute("id") - 1;

            changeSlideIndexToDrag(newSlideIndexToGrag);

            const isMouseDownOnActiveListElement =
                newSlideIndexToGrag !== undefined &&
                itemActiveStatusList[newSlideIndexToGrag];

            if (isMouseDownOnActiveListElement) {
                setMouseReadyToDrag(true);
            }

            changeClickHandlerKey('default');

            const isMouseDownOnList = ref.current?.contains(node);

            if (isMouseDownOnList) {
                setHotkeysMode(true);
                if (event.ctrlKey) {
                    changeClickHandlerKey('ctrlPressed');
                } else if (event.shiftKey) {
                    changeClickHandlerKey('shiftPressed');
                }
            } else {
                const lastActiveSlideIndex =
                    getLastActiveSlideIndex(props);

                setHotkeysMode(false);

                changeActiveStatusItemList(
                    itemActiveStatusList.map((itemStatus, index) => {
                        if (index != lastActiveSlideIndex) {
                            return false;
                        }
                        return itemStatus;
                    })
                );

                if (props.slidesList.length) {
                    dispatchSetIdAction({
                        selectedSlidesIds: [props.slidesList[lastActiveSlideIndex].id],
                        selectedSlideElementsIds: []
                    });
                }
            }
        }

        const handlerMouseUp = (event: MouseEvent) => {
            if (isMouseReadyToDrag) {
                const nodeAsBaseEvent = event as unknown as
                    React.BaseSyntheticEvent<object, any, any>;

                const slideIndexToInsert: number =
                    nodeAsBaseEvent.target.getAttribute("id");

                const findInsertPlace =
                    (slideIndexToGrag !== slideIndexToInsert - 1) &&
                    (slideIndexToInsert === 0 || slideIndexToInsert);

                if (findInsertPlace) {
                    dispatchInsertSelectedSlides(slideIndexToInsert);
                    dispatchKeepModelAction();
                }
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

        const onKeyDownHandler = (e: KeyboardEvent) => {
            if (readyForHotkeys) {
                console.clear();
                switch (e.code) {
                    case 'Delete':
                        dispatchDeleteSlideAction();
                        break;
                    case 'ArrowUp':
                        if (e.shiftKey) {
                            const startChooseSlideIndex =
                                getLastActiveSlideIndex(props);
                            const nextChosenSlideId =
                                (startChooseSlideIndex)
                                    ? props.slidesList[startChooseSlideIndex - 1].id
                                    : props.slidesList[startChooseSlideIndex].id;
                            const activeSlidesIds = [
                                nextChosenSlideId,
                                ...getActiveSlidesIds()
                            ];

                            changeActiveStatusItemList(
                                itemActiveStatusList.map((status, index) => {
                                    if (index === startChooseSlideIndex - 1) {
                                        return true;
                                    } else {
                                        return status;
                                    }
                                })
                            );

                            dispatchSetIdAction({
                                selectedSlidesIds: activeSlidesIds,
                                selectedSlideElementsIds: []
                            });
                            console.log('Up with shift');
                        } else if (e.ctrlKey) {
                            console.log('Up with ctrl');
                        } else {
                            
                        }
                        break;
                    case 'ArrowDown':
                        if (e.shiftKey) {
                            const startChooseSlideIndex =
                                getLastActiveSlideIndex(props);
                            const nextChosenSlideId =
                                (startChooseSlideIndex !== props.slidesList.length - 1)
                                    ? props.slidesList[startChooseSlideIndex + 1].id
                                    : props.slidesList[startChooseSlideIndex].id;
                            const activeSlidesIds = [
                                ...getActiveSlidesIds(),
                                nextChosenSlideId
                            ];

                            changeActiveStatusItemList(
                                itemActiveStatusList.map((status, index) => {
                                    if (index === startChooseSlideIndex + 1) {
                                        return true;
                                    } else {
                                        return status;
                                    }
                                })
                            );

                            dispatchSetIdAction({
                                selectedSlidesIds: activeSlidesIds,
                                selectedSlideElementsIds: []
                            });
                            console.log('Down with shift');
                        } else if (e.ctrlKey) {
                            console.log('Down with ctrl');
                        } else {
                            
                        }
                        break;
                    case 'KeyM':
                        if (e.ctrlKey) {
                            dispatchAddSlideAction();
                        }
                        break;
                }
            }
        }

        document.addEventListener('mousedown', handlerMouseDown);
        document.addEventListener('mouseup', handlerMouseUp);
        document.addEventListener('mouseover', handlerMouseOver);
        document.addEventListener('keydown', onKeyDownHandler);

        return () => {
            document.removeEventListener('mousedown', handlerMouseDown);
            document.removeEventListener('mouseup', handlerMouseUp);
            document.removeEventListener('mouseover', handlerMouseOver);
            document.removeEventListener('keydown', onKeyDownHandler);
        }
    });

    function getVariantOfItemListClickHandlers(
        key: MouseDownHandlerType
    ): (event: BaseSyntheticEvent) => void {
        switch (key) {
            case 'default':
                return (event: BaseSyntheticEvent) => {
                    if (event.target.getAttribute("id")) {
                        const itemIndex: number =
                            event.target.getAttribute("id") - 1;

                        const newItemActiveStatusList: boolean[] =
                            itemActiveStatusList.map((_, index) => {
                                if (index == itemIndex) {
                                    return true;
                                } else {
                                    return false;
                                }
                            });

                        changeActiveStatusItemList(newItemActiveStatusList);

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

                        let amountOfSlidesCanBeDisabled = 0;
                        itemActiveStatusList.forEach(status => {
                            if (status) {
                                amountOfSlidesCanBeDisabled =
                                    amountOfSlidesCanBeDisabled + 1;
                            }
                        });

                        const lastActiveSlideIndex = getLastActiveSlideIndex(props);
                        let wasEverChangedWayOfChoose = false;

                        const newItemActiveStatusList: boolean[] =
                            itemActiveStatusList.map((itemStatus, index) => {
                                if (index == itemIndex) {
                                    if (lastActiveSlideIndex > index && !wasEverChangedWayOfChoose) {
                                        wasEverChangedWayOfChoose = true
                                    }
                                    if (amountOfSlidesCanBeDisabled > 1) {
                                        amountOfSlidesCanBeDisabled =
                                            amountOfSlidesCanBeDisabled - 1;
                                        return !itemStatus;
                                    } else {
                                        return true;
                                    }
                                } else {
                                    return itemStatus;
                                }
                            });

                        let newSelectedSlidesIds: string[] = [];
                        props.slidesList.forEach((item, index) => {
                            if (newItemActiveStatusList[index]) {
                                newSelectedSlidesIds.push(item.id);
                            }
                        });

                        if (wasEverChangedWayOfChoose) {
                            newSelectedSlidesIds.reverse();
                        }

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

                        const lastActiveSlideIndex = getLastActiveSlideIndex(props);
                        let wasEverChangedWayOfChoose = false;

                        const newItemActiveStatusList: boolean[] =
                            itemActiveStatusList.map((_, index) => {
                                const wasChosenSlideAfterLastActive =
                                    index >= lastActiveSlideIndex &&
                                    index <= itemIndex;
                                const wasChosenSlideBeforeLastActive =
                                    index >= itemIndex &&
                                    index <= lastActiveSlideIndex;

                                if (!wasEverChangedWayOfChoose &&
                                    wasChosenSlideAfterLastActive) {
                                    wasEverChangedWayOfChoose = true;
                                }

                                if (wasChosenSlideAfterLastActive ||
                                    wasChosenSlideBeforeLastActive) {
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

                        if (wasEverChangedWayOfChoose) {
                            newSelectedSlidesIds.reverse();
                        }

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
                return <li className={styles['slide-list-item']} key={index}>
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
                </li>;
            })
        }
    </ul>;
}

function getLastActiveSlideIndex(props: SlideListProps): number {
    const slideId: string = store.getState().model.selectedSlidesIds.slice(-1)[0];

    return props.slidesList.findIndex(slide => slide.id === slideId);
}

function getActiveSlidesIndexes(props: SlideListProps): number[] {
    const slidesIds: string[] = store.getState().model.selectedSlidesIds;

    let result: number[] = [];
    props.slidesList.forEach((slide, index) => {
        if (slidesIds.includes(slide.id)) {
            result.push(index);
        }
    });

    return result;
}

function getActiveSlidesIds(): string[] {
    return store.getState().model.selectedSlidesIds;
}
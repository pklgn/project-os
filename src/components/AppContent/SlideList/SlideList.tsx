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
import { log } from "console";

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
                console.log('haha!');
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
        changeActiveSlideIndex(getActiveSlideIndex(props));
        changeLastChosenSlideIndex(getActiveSlideIndex(props));
        setHotkeysMode(true);
    }, [props.slidesList.length]);

    const [handlerKey, changeClickHandlerKey] =
        useState('default' as MouseDownHandlerType);
    const onClickListHandler = getVariantOfItemListClickHandlers(handlerKey);

    const [isMouseReadyToDrag, setMouseReadyToDrag] = useState(false);
    const [slideIndexToGrag, changeSlideIndexToDrag] = useState(0);
    const [activeSlideIndex, changeActiveSlideIndex] =
        useState(getActiveSlideIndex(props));
    const [lastChosenSlideIndex, changeLastChosenSlideIndex] = useState(getActiveSlideIndex(props));
    const [intersectionObserver, _] = useState(new IntersectionObserver((entries) => {
        if (!entries[0].isIntersecting) {
            const slideAtTop =
                (entries[0].boundingClientRect.top !== entries[0].intersectionRect.top);

            const slideHeight = Math.max(
                entries[0].target.clientHeight,
                entries[0].target.scrollHeight
            );

            const yToScroll = (slideAtTop)
                ? -slideHeight
                : slideHeight;

            ref.current?.scrollBy(0, yToScroll);
        }
    }, { threshold: 1 }));

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
                setHotkeysMode(false);

                changeActiveStatusItemList(
                    itemActiveStatusList.map((_, index) => {
                        if (index === activeSlideIndex) {
                            return true;
                        } else {
                            return false;
                        }
                    })
                );

                if (props.slidesList.length) {
                    if (!getActiveSlidesIds()
                        .includes(props.slidesList[activeSlideIndex].id)) {
                        dispatchSetIdAction({
                            selectedSlidesIds:
                                [props.slidesList[activeSlideIndex].id],
                            selectedSlideElementsIds: []
                        });
                    }
                }
            }
        }

        const handlerMouseUp = (event: MouseEvent) => {
            if (isMouseReadyToDrag) {
                const nodeAsBaseEvent = event as unknown as
                    React.BaseSyntheticEvent<object, any, any>;

                const slideIndexToInsert: number =
                    nodeAsBaseEvent.target.getAttribute("id");

                const findInsertPlace = (slideIndexToGrag !== slideIndexToInsert) && (slideIndexToInsert === 0 || slideIndexToInsert);

                if (findInsertPlace) {
                    dispatchInsertSelectedSlides(slideIndexToInsert);
                    dispatchKeepModelAction();
                }
            }

            setMouseReadyToDrag(false);
            intersectionObserver.disconnect();
            changeItemHrStatus(
                itemHrStatus.map(_ => {
                    return false;
                })
            );
        }

        const handlerMouseOver = (event: MouseEvent) => {
            if (isMouseReadyToDrag) {
                const node = event as unknown as
                    React.BaseSyntheticEvent<object, any, any>;
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
                switch (e.code) {
                    case 'Delete':
                        dispatchDeleteSlideAction();
                        dispatchKeepModelAction();
                        break;
                    case 'ArrowUp':
                        if (e.shiftKey) {
                            const newChosenSlideIndex = (lastChosenSlideIndex > 0)
                                ? lastChosenSlideIndex - 1
                                : lastChosenSlideIndex;
                            changeLastChosenSlideIndex(newChosenSlideIndex);
                            const newActiveItemStatusList: boolean[] =
                                itemActiveStatusList.map((_, index) => {
                                    if (activeSlideIndex >= index &&
                                        index >= newChosenSlideIndex ||
                                        activeSlideIndex <= index &&
                                        index <= newChosenSlideIndex) {
                                        return true;
                                    } else {
                                        return false;
                                    }
                                });

                            const activatedSlidesIds = [
                                ...props.slidesList
                                    .map((slide, index) => {
                                        if (newActiveItemStatusList[index]) {
                                            return slide.id;
                                        } else {
                                            return '';
                                        }
                                    })
                                    .filter(id => id !== ''),
                            ];

                            changeActiveStatusItemList(newActiveItemStatusList);

                            dispatchSetIdAction({
                                selectedSlidesIds: activatedSlidesIds,
                                selectedSlideElementsIds: []
                            });
                        } else if (e.ctrlKey) {
                            if (getActiveSlidesIds().length === 1) {
                                const indexToInsertSelectedSlides =
                                    (activeSlideIndex > 0)
                                        ? activeSlideIndex - 1
                                        : activeSlideIndex;
                                changeActiveSlideIndex(indexToInsertSelectedSlides);
                                changeLastChosenSlideIndex(indexToInsertSelectedSlides);
                                changeActiveStatusItemList(itemActiveStatusList
                                    .map((_, index) => {
                                        if (index === indexToInsertSelectedSlides) {
                                            return true;
                                        }
                                        return false;
                                    })
                                );
                                dispatchInsertSelectedSlides(indexToInsertSelectedSlides);
                                dispatchKeepModelAction();
                            }
                        } else {
                            const newActiveSlideIndex = (activeSlideIndex > 0)
                                ? activeSlideIndex - 1
                                : activeSlideIndex;
                            changeActiveSlideIndex(newActiveSlideIndex);
                            changeLastChosenSlideIndex(newActiveSlideIndex);
                            const newActiveItemStatusList: boolean[] =
                                itemActiveStatusList.map((_, index) => {
                                    if (index === newActiveSlideIndex) {
                                        return true;
                                    } else {
                                        return false;
                                    }
                                });
                            const activatedSlidesIds = [
                                ...props.slidesList
                                    .map((slide, index) => {
                                        if (newActiveItemStatusList[index]) {
                                            return slide.id;
                                        } else {
                                            return '';
                                        }
                                    })
                                    .filter(id => id !== ''),
                            ];
                            changeActiveStatusItemList(newActiveItemStatusList);

                            dispatchSetIdAction({
                                selectedSlidesIds: activatedSlidesIds,
                                selectedSlideElementsIds: []
                            });
                        }
                        break;
                    case 'ArrowDown':
                        if (e.shiftKey) {
                            const newChosenSlideIndex =
                                (lastChosenSlideIndex < props.slidesList.length - 1)
                                    ? lastChosenSlideIndex + 1
                                    : lastChosenSlideIndex;
                            changeLastChosenSlideIndex(newChosenSlideIndex);
                            const newActiveItemStatusList: boolean[] =
                                itemActiveStatusList.map((_, index) => {
                                    if (activeSlideIndex >= index &&
                                        index >= newChosenSlideIndex ||
                                        activeSlideIndex <= index &&
                                        index <= newChosenSlideIndex) {
                                        return true;
                                    } else {
                                        return false;
                                    }
                                });

                            const activatedSlidesIds = [
                                ...props.slidesList
                                    .map((slide, index) => {
                                        if (newActiveItemStatusList[index]) {
                                            return slide.id;
                                        } else {
                                            return '';
                                        }
                                    })
                                    .filter(id => id !== ''),
                            ];

                            changeActiveStatusItemList(newActiveItemStatusList);

                            dispatchSetIdAction({
                                selectedSlidesIds: activatedSlidesIds,
                                selectedSlideElementsIds: []
                            });
                        } else if (e.ctrlKey) {
                            if (getActiveSlidesIds().length === 1) {
                                const indexToInsertSelectedSlides =
                                    (activeSlideIndex < props.slidesList.length - 1)
                                        ? activeSlideIndex + 2
                                        : activeSlideIndex;

                                changeActiveSlideIndex(indexToInsertSelectedSlides - 1);
                                changeLastChosenSlideIndex(indexToInsertSelectedSlides - 1);
                                changeActiveStatusItemList(itemActiveStatusList
                                    .map((_, index) => {
                                        if (index === indexToInsertSelectedSlides) {
                                            return true;
                                        }
                                        return false;
                                    })
                                );

                                dispatchInsertSelectedSlides(indexToInsertSelectedSlides);
                                dispatchKeepModelAction();
                            }
                        } else {
                            const newActiveSlideIndex =
                                (activeSlideIndex < props.slidesList.length - 1)
                                    ? activeSlideIndex + 1
                                    : activeSlideIndex;
                            changeActiveSlideIndex(newActiveSlideIndex);
                            changeLastChosenSlideIndex(newActiveSlideIndex);
                            const newActiveItemStatusList: boolean[] =
                                itemActiveStatusList.map((_, index) => {
                                    if (index === newActiveSlideIndex) {
                                        return true;
                                    } else {
                                        return false;
                                    }
                                });
                            const activatedSlidesIds = [
                                ...props.slidesList
                                    .map((slide, index) => {
                                        if (newActiveItemStatusList[index]) {
                                            return slide.id;
                                        } else {
                                            return '';
                                        }
                                    })
                                    .filter(id => id !== ''),
                            ];
                            changeActiveStatusItemList(newActiveItemStatusList);

                            dispatchSetIdAction({
                                selectedSlidesIds: activatedSlidesIds,
                                selectedSlideElementsIds: []
                            });
                        }
                        break;
                    case 'KeyM':
                        if (e.ctrlKey) {
                            dispatchAddSlideAction();
                            dispatchKeepModelAction();
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
                        changeActiveSlideIndex(itemIndex);
                        changeLastChosenSlideIndex(itemIndex);

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
                        changeActiveSlideIndex(itemIndex);
                        changeLastChosenSlideIndex(itemIndex);

                        let amountOfSlidesCanBeDisabled = 0;
                        itemActiveStatusList.forEach(status => {
                            if (status) {
                                amountOfSlidesCanBeDisabled =
                                    amountOfSlidesCanBeDisabled + 1;
                            }
                        });
                        // console.clear();
                        console.log(`amountToDisable:${amountOfSlidesCanBeDisabled}`);
                        itemActiveStatusList.forEach((status, index) => console.log(`#${index}-${status}`));
                        

                        const newItemActiveStatusList: boolean[] =
                            itemActiveStatusList.map((itemStatus, index) => {
                                console.log(`trying #${index}-${itemStatus}`);
                                if (index === itemIndex) {
                                    if (amountOfSlidesCanBeDisabled > 1) {
                                        amountOfSlidesCanBeDisabled =
                                            amountOfSlidesCanBeDisabled - 1;
                                            console.log('switched!');
                                        return !itemStatus;
                                    } else {
                                        console.log('turn on!');
                                        return true;
                                    }
                                } else {
                                    console.log('kept!');
                                    return itemStatus;
                                }
                            });

                            newItemActiveStatusList.forEach((status, index) => console.log(`#${index}-${status}`));

                        const newSelectedSlidesIds = [
                            ...getActiveSlidesIds(),
                            props.slidesList[itemIndex].id
                        ]

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
                        changeLastChosenSlideIndex(itemIndex);

                        const newItemActiveStatusList: boolean[] =
                            itemActiveStatusList.map((_, index) => {
                                if (activeSlideIndex >= index &&
                                    index >= itemIndex ||
                                    activeSlideIndex <= index &&
                                    index <= itemIndex) {
                                    return true;
                                } else {
                                    return false;
                                }
                            });
                        changeActiveStatusItemList(newItemActiveStatusList);

                        const newSelectedSlidesIds: string[] = [
                            ...props.slidesList
                                .map((slide, index) => {
                                    if (newItemActiveStatusList[index] &&
                                        index !== activeSlideIndex) {
                                        return slide.id;
                                    } else {
                                        return '';
                                    }
                                })
                                .filter(id => id !== ''),
                            props.slidesList[activeSlideIndex].id
                        ];

                        dispatchSetIdAction({
                            selectedSlidesIds: newSelectedSlidesIds,
                            selectedSlideElementsIds: []
                        });
                    }

                }
        }
    }

    const onMouseEnterHandler = (event: BaseSyntheticEvent) => {
        if (event.target instanceof Element) {
            const element = event.target as Element;
            if (isMouseReadyToDrag) {
                intersectionObserver.observe(element);
            }
        }
    }

    const onMouseLeaveHandler = (event: BaseSyntheticEvent) => {
        if (event.target instanceof Element) {
            const element = event.target as Element;
            intersectionObserver.unobserve(element);
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
                        onMouseEnter={onMouseEnterHandler}
                        onMouseLeave={onMouseLeaveHandler}
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

function getActiveSlideIndex(props: SlideListProps): number {
    const slideId: string =
        store.getState().model.selectedSlidesIds.slice(-1)[0];

    return props.slidesList.findIndex(slide => slide.id === slideId);
}

function getActiveSlidesIndexes(props: SlideListProps): number[] {
    const slidesIds: string[] = store.getState().model.selectedSlidesIds;

    const result: number[] = props.slidesList
        .map((slide, index) => {
            if (slidesIds.includes(slide.id)) {
                return index;
            }
            return -1;
        })
        .filter(index => index !== -1);

    return result;
}

function getActiveSlidesIds(): string[] {
    return store.getState().model.selectedSlidesIds;
}
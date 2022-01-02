import styles from "./SlideList.module.css";

import React, { BaseSyntheticEvent, useEffect, useRef, useState } from "react";

import { SlideListItem } from "./SlideListItem";

import { Slide } from "../../../model/types";

import { bindActionCreators } from "redux";
import { deleteSelectedSlides, insertSelectedSlidesAtIndexAction }
    from "../../../redux/action-creators/slideActionCreators";
import { keepModelAction, setSelectedIdInEditor }
    from "../../../redux/action-creators/editorActionCreators";
import { useDispatch } from "react-redux";
import { store } from "../../../redux/store";

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
    const dispatchDeleteSlideAction =
        bindActionCreators(deleteSelectedSlides, dispatch);

    const [slideActiveStatusList, changeActiveStatusSlideList] =
        useState([] as boolean[]);
    const [slideHrStatus, changeSlideHrStatus] = useState([] as boolean[]);
    const [activeSlideIndex, changeActiveSlideIndex] =
        useState(getActiveSlideIndex(props));
    const [lastChosenSlideIndex, changeLastChosenSlideIndex] =
        useState(getActiveSlideIndex(props));

    const [readyForHotkeys, setHotkeysMode] = useState(false);
    const [isMouseReadyToDrag, setMouseReadyToDrag] = useState(false);

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
        changeActiveStatusSlideList(
            props.slidesList.map((_, index) => {
                if (getChosenSlidesIndexes(props).includes(index)) {
                    return true;
                }
                return false;
            })
        );
        changeSlideHrStatus(
            [
                ...props.slidesList.map(_ => {
                    return false
                }),
                false
            ]
        );
        // changeActiveSlideIndex(getActiveSlideIndex(props));
        // changeLastChosenSlideIndex(getActiveSlideIndex(props));
        setHotkeysMode(true);
    }, [props.slidesList.length, isMouseReadyToDrag]);

    useEffect(() => {
        const handlerMouseDown = (event: MouseEvent) => {
            if (event.target instanceof Element &&
                ref.current?.contains(event.target)
            ) {
                const element = event.target as Element;
                if (element.tagName === 'svg') {
                    const newSlideIndexToGrag =
                        parseInt(element.getAttribute("id")!) - 1;
                    //intersectionObserver.observe(element);

                    const isMouseDownOnActiveListElement =
                        slideActiveStatusList[newSlideIndexToGrag];

                    if (isMouseDownOnActiveListElement && !event.ctrlKey) {
                        setMouseReadyToDrag(true);
                    }
                }
                setHotkeysMode(true);
            } else {
                setHotkeysMode(false);
                intersectionObserver.disconnect();

                changeActiveStatusSlideList(
                    slideActiveStatusList.map((_, index) => {
                        if (index === activeSlideIndex) {
                            return true;
                        } else {
                            return false;
                        }
                    })
                );

                if (props.slidesList.length) {
                    dispatchSetIdAction({
                        selectedSlidesIds:
                            [props.slidesList[activeSlideIndex].id],
                        selectedSlideElementsIds: []
                    });
                }
            }
        }

        document.addEventListener('mousedown', handlerMouseDown);

        return () => {
            document.removeEventListener('mousedown', handlerMouseDown);
        }
    });

    const onClickListHandler =
        (event: React.MouseEvent<HTMLUListElement>) => {
            if (event.target instanceof Element &&
                ref.current?.contains(event.target) &&
                event.target.tagName === 'svg'
            ) {
                const handlerType = (!(event.ctrlKey || event.shiftKey))
                    ? 'default'
                    : (event.ctrlKey)
                        ? 'ctrlPressed'
                        : (event.shiftKey)
                            ? 'shiftPressed'
                            : 'default';

                const amountOfSlidesCanBeDisabled = slideActiveStatusList
                    .filter(status => status).length;

                const chosenSlideIndex =
                    parseInt(event.target.getAttribute("id")!) - 1;

                const choosedNewSlide = !getChosenSlidesIndexes(props).includes(chosenSlideIndex);
                if (choosedNewSlide) {
                    if (handlerType === 'default') {
                        changeActiveSlideIndex(chosenSlideIndex);
                        changeLastChosenSlideIndex(chosenSlideIndex);
                    } else if (handlerType === 'ctrlPressed') {
                        changeActiveSlideIndex(chosenSlideIndex);
                        changeLastChosenSlideIndex(activeSlideIndex);
                    } else {
                        changeLastChosenSlideIndex(chosenSlideIndex);
                    }
                } else {
                    if (handlerType === 'ctrlPressed') {
                        changeActiveSlideIndex(lastChosenSlideIndex);
                    }
                }

                const newItemActiveStatusList: boolean[] = (handlerType === 'default')
                    ? slideActiveStatusList.map((_, index) => {
                        if (index == chosenSlideIndex) {
                            return true;
                        } else {
                            return false;
                        }
                    })
                    : (handlerType === 'ctrlPressed')
                        ? slideActiveStatusList.map((itemStatus, index) => {
                            if (index === chosenSlideIndex) {
                                if (amountOfSlidesCanBeDisabled > 1) {
                                    return !itemStatus;
                                } else {
                                    return true;
                                }
                            } else {
                                return itemStatus;
                            }
                        })
                        : slideActiveStatusList.map((_, index) => {
                            if (index <= activeSlideIndex &&
                                index >= chosenSlideIndex ||
                                index >= activeSlideIndex &&
                                index <= chosenSlideIndex) {
                                return true;
                            } else {
                                return false;
                            }
                        });

                changeActiveStatusSlideList(newItemActiveStatusList);

                if (handlerType === 'default') {
                    dispatchSetIdAction({
                        selectedSlidesIds: [props.slidesList[chosenSlideIndex].id],
                        selectedSlideElementsIds: []
                    });
                } else {
                    const newSelectedSlidesIds = (handlerType === 'ctrlPressed')
                        ? newItemActiveStatusList
                            .map((status, index) => {
                                if (status) {
                                    return props.slidesList[index].id;
                                } else {
                                    return '';
                                }
                            })
                            .filter(id => id !== '')
                        : [
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

    const onKeyDownListHandler = (event: React.KeyboardEvent<HTMLUListElement>) => {
        if (readyForHotkeys) {
            if (event.code === 'Delete') {
                dispatchDeleteSlideAction();
                dispatchKeepModelAction();
            } else if (event.code === 'ArrowUp' || event.code === 'ArrowDown') {
                // intersectionObserver.disconnect();

                const handlerType = (!(event.ctrlKey || event.shiftKey))
                    ? 'default'
                    : (event.ctrlKey)
                        ? 'ctrlPressed'
                        : (event.shiftKey)
                            ? 'shiftPressed'
                            : 'default';

                if (handlerType === 'default') {
                    const newActiveSlideIndex = (event.code === 'ArrowUp')
                        ? (activeSlideIndex > 0)
                            ? activeSlideIndex - 1
                            : activeSlideIndex
                        : (activeSlideIndex < props.slidesList.length - 1)
                            ? activeSlideIndex + 1
                            : activeSlideIndex;

                    changeActiveSlideIndex(newActiveSlideIndex);
                    changeLastChosenSlideIndex(newActiveSlideIndex);
                    const newActiveItemStatusList: boolean[] =
                        slideActiveStatusList.map((_, index) => {
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
                    changeActiveStatusSlideList(newActiveItemStatusList);

                    dispatchSetIdAction({
                        selectedSlidesIds: activatedSlidesIds,
                        selectedSlideElementsIds: []
                    });

                    // intersectionObserver.disconnect();
                    // const selectetSlideAsElement =
                    // ref.current?.childNodes[newActiveSlideIndex] as Element;

                    // intersectionObserver.observe(selectetSlideAsElement);
                } else if (handlerType === 'shiftPressed') {
                    const newChosenSlideIndex = (event.code === 'ArrowUp')
                        ? (lastChosenSlideIndex > 0)
                            ? lastChosenSlideIndex - 1
                            : lastChosenSlideIndex
                        : (lastChosenSlideIndex < props.slidesList.length - 1)
                            ? lastChosenSlideIndex + 1
                            : lastChosenSlideIndex;

                    changeLastChosenSlideIndex(newChosenSlideIndex);
                    const newActiveItemStatusList: boolean[] =
                        slideActiveStatusList.map((_, index) => {
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
                    changeActiveStatusSlideList(newActiveItemStatusList);

                    dispatchSetIdAction({
                        selectedSlidesIds: activatedSlidesIds,
                        selectedSlideElementsIds: []
                    });

                    // intersectionObserver.disconnect();
                    // const selectetSlideAsElement =
                    // ref.current?.childNodes[newChosenSlideIndex] as Element;

                    // intersectionObserver.observe(selectetSlideAsElement);
                } else if (handlerType === 'ctrlPressed' &&
                    getActiveSlidesIds().length === 1
                ) {
                    const indexToInsertSelectedSlides = (event.code === 'ArrowUp')
                        ? (activeSlideIndex > 0)
                            ? activeSlideIndex - 1
                            : activeSlideIndex
                        : (activeSlideIndex < props.slidesList.length - 1)
                            ? activeSlideIndex + 1
                            : activeSlideIndex;

                    changeActiveSlideIndex(indexToInsertSelectedSlides);
                    changeLastChosenSlideIndex(indexToInsertSelectedSlides);
                    changeActiveStatusSlideList(slideActiveStatusList
                        .map((_, index) => {
                            if (index === indexToInsertSelectedSlides) {
                                return true;
                            }
                            return false;
                        })
                    );

                    dispatchInsertSelectedSlides(indexToInsertSelectedSlides);
                    dispatchKeepModelAction();

                    // intersectionObserver.disconnect();
                    // const selectetSlideAsElement =
                    // ref.current?.childNodes[indexToInsertSelectedSlides] as Element;

                    // intersectionObserver.observe(selectetSlideAsElement);
                }
            }
        }
    }

    const onMouseUpListHandler = (event: React.MouseEvent<HTMLUListElement>) => {
        if (isMouseReadyToDrag &&
            event.target instanceof Element &&
            ref.current?.contains(event.target)
        ) {
            const element = event.target as Element;
            const slideIndexToInsert = parseInt(element.getAttribute('id')!)

            dispatchInsertSelectedSlides(slideIndexToInsert);
            dispatchKeepModelAction();
        }

        setMouseReadyToDrag(false);

        changeSlideHrStatus(
            slideHrStatus.map(_ => {
                return false;
            })
        );
    }

    const onMouseOverListHandler = (event: React.MouseEvent<HTMLUListElement>) => {
        if (isMouseReadyToDrag &&
            event.target instanceof Element &&
            ref.current?.contains(event.target)
        ) {
            const element = event.target as Element;
            const insertIndex = parseInt(element.getAttribute('id')!);

            changeSlideHrStatus(
                slideHrStatus.map((_, index) => {
                    if (index == insertIndex) {
                        return true;
                    }
                    return false;
                })
            );
        }
    }

    return <ul
        className={`${styles.list} ${styles['list-wrapper']}`}
        ref={ref}
        onClick={onClickListHandler}
        onMouseUp={onMouseUpListHandler}
        onMouseOver={onMouseOverListHandler}
        onKeyDown={onKeyDownListHandler}
    >
        {
            props.slidesList.map((slide, index) => {
                return <li className={styles['slide-list-item']} key={index}>
                    <div
                        className={
                            (slideHrStatus[index])
                                ? styles['before-list-element-hr-active']
                                : styles['before-list-element-hr-disabled']
                        }
                        id={`${index}`}
                        key={index}
                    ></div>

                    <SlideListItem
                        item={slide}
                        itemIndex={index}
                        status={slideActiveStatusList[index]}
                        key={slide.id}
                    />

                    <div
                        className={
                            (slideHrStatus[index + 1])
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

function getChosenSlidesIndexes(props: SlideListProps): number[] {
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
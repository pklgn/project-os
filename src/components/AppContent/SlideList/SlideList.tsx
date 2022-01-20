import styles from './SlideList.module.css';

import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';

import { SlideListItem } from './SlideListItem';

import { Slide } from '../../../app_model/model/types';

import { getSlideContainerDimension, getWindowRatio } from '../../../app_model/view_model/slide_render_actions';
import { getActiveViewArea } from '../../../app_model/view_model/active_view_area_actions';
import { store } from '../../../app_model/redux_model/store';
import {
    dispatchActiveViewAreaAction,
    dispatchSetIdAction,
    dispatchDeleteSlideAction,
    dispatchKeepModelAction,
    dispatchInsertSelectedSlides,
} from '../../../app_model/redux_model/dispatchers';
import { useDispatch } from 'react-redux';
import {
    getActiveSlideIndex,
    getActiveSlidesIds,
    getAllSlidesIds,
    getChosenSlidesIndexes,
} from '../../../app_model/model/slides_actions';

type SlideListProps = {
    slidesList: Slide[];
};

export function SlideList(props: SlideListProps) {
    const listRef = useRef<HTMLUListElement>(null);
    const editorModel = store.getState().model;

    const [slideActiveStatusList, changeActiveStatusSlideList] = useState([] as boolean[]);
    const [activeSlideIndex, changeActiveSlideIndex] = useState(getActiveSlideIndex(editorModel));
    const [lastChosenSlideIndex, changeLastChosenSlideIndex] = useState(getActiveSlideIndex(editorModel));

    const [readyForHotkeys, setHotkeysMode] = useState(false);
    const [isMouseReadyToDrag, setMouseReadyToDrag] = useState(false);

    const dispatch = useDispatch();

    const [intersectionObserver, _] = useState(
        new IntersectionObserver(
            (entries, _) => {
                if (!entries[0].isIntersecting) {
                    const slideAtTop = entries[0].boundingClientRect.top !== entries[0].intersectionRect.top;

                    const slideHeight = Math.max(entries[0].target.clientHeight, entries[0].target.scrollHeight);

                    const yToScroll = slideAtTop ? -1.5 * slideHeight : 1.5 * slideHeight;

                    listRef.current?.scrollBy(0, yToScroll);
                }
            },
            { threshold: 1 },
        ),
    );

    useEffect(() => {
        const editorModel = store.getState().model;
        const chosenSlideIndexes = getChosenSlidesIndexes(editorModel);
        changeActiveStatusSlideList(
            props.slidesList.map((_, index) => {
                return chosenSlideIndexes.includes(index);
            }),
        );
        changeActiveSlideIndex(getActiveSlideIndex(editorModel));
        changeLastChosenSlideIndex(getActiveSlideIndex(editorModel));
        setHotkeysMode(true);
    }, [props.slidesList.length, isMouseReadyToDrag, props]);

    useEffect(() => {
        const handlerMouseDown = (event: MouseEvent) => {
            if (event.target instanceof Element && listRef.current?.contains(event.target)) {
                const element = event.target as Element;
                if (element.tagName === 'SPAN') {
                    const newSlideIndexToGrag = parseInt(element.getAttribute('id')!) - 1;

                    const isMouseDownOnActiveListElement = slideActiveStatusList[newSlideIndexToGrag];

                    if (isMouseDownOnActiveListElement && !event.ctrlKey) {
                        setMouseReadyToDrag(true);
                    }
                } else {
                    setHotkeysMode(false);
                    setMouseReadyToDrag(false);
                    intersectionObserver.disconnect();

                    changeActiveStatusSlideList(
                        slideActiveStatusList.map((_, index) => {
                            return index === activeSlideIndex;
                        }),
                    );

                    if (props.slidesList.length) {
                        dispatchSetIdAction(dispatch)({
                            selectedSlidesIds: [props.slidesList[activeSlideIndex].id],
                            selectedSlideElementsIds: [],
                        });
                    }
                }

                if (getActiveViewArea(store.getState().viewModel) === 'SLIDE_LIST') {
                    setHotkeysMode(true);
                }

                if (getActiveViewArea(store.getState().viewModel) !== 'SLIDE_LIST') {
                    dispatchActiveViewAreaAction(dispatch)('SLIDE_LIST');
                }
            } else {
                if (listRef.current && listRef.current.getElementsByTagName('SPAN')[activeSlideIndex]) {
                    listRef.current.getElementsByTagName('SPAN')[activeSlideIndex].scrollIntoView({
                        block: 'center',
                        behavior: 'smooth',
                    });
                }
                setHotkeysMode(false);
                setMouseReadyToDrag(false);
                intersectionObserver.disconnect();

                changeActiveStatusSlideList(
                    slideActiveStatusList.map((_, index) => {
                        return index === activeSlideIndex;
                    }),
                );

                if (props.slidesList.length) {
                    dispatchSetIdAction(dispatch)({
                        selectedSlidesIds: [props.slidesList[activeSlideIndex].id],
                        selectedSlideElementsIds: [],
                    });
                }
            }
        };

        const handlerKeyDown = (event: KeyboardEvent) => {
            if (readyForHotkeys) {
                if (event.code === 'Delete') {
                    dispatchDeleteSlideAction(dispatch)();
                    dispatchKeepModelAction(dispatch)();
                } else if (event.code === 'ArrowUp' || event.code === 'ArrowDown') {
                    const handlerType = !(event.ctrlKey || event.shiftKey)
                        ? 'default'
                        : event.ctrlKey
                        ? 'ctrlPressed'
                        : event.shiftKey
                        ? 'shiftPressed'
                        : 'default';

                    if (handlerType === 'default') {
                        const newActiveSlideIndex =
                            event.code === 'ArrowUp'
                                ? activeSlideIndex > 0
                                    ? activeSlideIndex - 1
                                    : activeSlideIndex
                                : activeSlideIndex < props.slidesList.length - 1
                                ? activeSlideIndex + 1
                                : activeSlideIndex;

                        intersectionObserver.disconnect();
                        intersectionObserver.observe(
                            listRef.current?.getElementsByTagName('SPAN')[newActiveSlideIndex] as Element,
                        );

                        changeActiveSlideIndex(newActiveSlideIndex);
                        changeLastChosenSlideIndex(newActiveSlideIndex);
                        const newActiveItemStatusList: boolean[] = slideActiveStatusList.map((_, index) => {
                            return index === newActiveSlideIndex;
                        });
                        changeActiveStatusSlideList(newActiveItemStatusList);

                        const activatedSlidesIds = [
                            ...props.slidesList
                                .map((slide, index) => {
                                    if (newActiveItemStatusList[index]) {
                                        return slide.id;
                                    } else {
                                        return '';
                                    }
                                })
                                .filter((id) => id !== ''),
                        ];

                        dispatchSetIdAction(dispatch)({
                            selectedSlidesIds: activatedSlidesIds,
                            selectedSlideElementsIds: [],
                        });
                    } else if (handlerType === 'shiftPressed') {
                        const newChosenSlideIndex =
                            event.code === 'ArrowUp'
                                ? lastChosenSlideIndex > 0
                                    ? lastChosenSlideIndex - 1
                                    : lastChosenSlideIndex
                                : lastChosenSlideIndex < props.slidesList.length - 1
                                ? lastChosenSlideIndex + 1
                                : lastChosenSlideIndex;
                        changeLastChosenSlideIndex(newChosenSlideIndex);

                        intersectionObserver.disconnect();
                        intersectionObserver.observe(
                            listRef.current?.getElementsByTagName('SPAN')[newChosenSlideIndex] as Element,
                        );

                        const newActiveItemStatusList: boolean[] = slideActiveStatusList.map((_, index) => {
                            return (
                                (activeSlideIndex >= index && index >= newChosenSlideIndex) ||
                                (activeSlideIndex <= index && index <= newChosenSlideIndex)
                            );
                        });
                        changeActiveStatusSlideList(newActiveItemStatusList);

                        const activatedSlidesIds = [
                            ...props.slidesList
                                .map((slide, index) => {
                                    if (newActiveItemStatusList[index] && index !== activeSlideIndex) {
                                        return slide.id;
                                    } else {
                                        return '';
                                    }
                                })
                                .filter((id) => id !== ''),
                            props.slidesList[activeSlideIndex].id,
                        ];

                        dispatchSetIdAction(dispatch)({
                            selectedSlidesIds: activatedSlidesIds,
                            selectedSlideElementsIds: [],
                        });
                    } else if (
                        handlerType === 'ctrlPressed' &&
                        getActiveSlidesIds(store.getState().model).length === 1
                    ) {
                        const indexToInsertSelectedSlides =
                            event.code === 'ArrowUp'
                                ? activeSlideIndex > 0
                                    ? activeSlideIndex - 1
                                    : activeSlideIndex
                                : activeSlideIndex < props.slidesList.length - 1
                                ? activeSlideIndex + 1
                                : activeSlideIndex;

                        changeActiveSlideIndex(indexToInsertSelectedSlides);
                        changeLastChosenSlideIndex(indexToInsertSelectedSlides);
                        intersectionObserver.disconnect();
                        intersectionObserver.observe(
                            listRef.current?.getElementsByTagName('SPAN')[indexToInsertSelectedSlides] as Element,
                        );

                        changeActiveStatusSlideList(
                            slideActiveStatusList.map((_, index) => {
                                return index === indexToInsertSelectedSlides;
                            }),
                        );

                        if (event.code === 'ArrowUp') {
                            dispatchInsertSelectedSlides(dispatch)(indexToInsertSelectedSlides);
                        } else {
                            dispatchInsertSelectedSlides(dispatch)(indexToInsertSelectedSlides + 1);
                        }
                        dispatchKeepModelAction(dispatch)();
                    }
                } else if (event.ctrlKey && event.code === 'KeyA') {
                    event.preventDefault();
                    const newActiveItemStatusList: boolean[] = slideActiveStatusList.map((_) => {
                        return true;
                    });
                    changeActiveStatusSlideList(newActiveItemStatusList);

                    if (props.slidesList.length) {
                        dispatchSetIdAction(dispatch)({
                            selectedSlidesIds: getAllSlidesIds(store.getState().model),
                            selectedSlideElementsIds: [],
                        });
                    }
                } else if (event.shiftKey && (event.code === 'Home' || event.code === 'End')) {
                    const amountOfSlides = props.slidesList.length;
                    if (amountOfSlides) {
                        const indexUpToChoose = event.code === 'Home' ? 0 : amountOfSlides - 1;
                        const newActiveItemStatusList: boolean[] = slideActiveStatusList.map((_, index) => {
                            if (
                                (event.code === 'End' && index >= activeSlideIndex && index <= indexUpToChoose) ||
                                (event.code === 'Home' && index <= activeSlideIndex && index >= indexUpToChoose)
                            ) {
                                return true;
                            } else {
                                return false;
                            }
                        });
                        changeActiveStatusSlideList(newActiveItemStatusList);

                        const activeSlideIds = props.slidesList
                            .map((slide, index) => {
                                if (newActiveItemStatusList[index]) {
                                    return slide.id;
                                } else {
                                    return '';
                                }
                            })
                            .filter((status) => status !== '');
                        if (props.slidesList.length) {
                            dispatchSetIdAction(dispatch)({
                                selectedSlidesIds: activeSlideIds,
                                selectedSlideElementsIds: [],
                            });
                        }
                    }
                }
            }
        };

        document.addEventListener('mousedown', handlerMouseDown);
        document.addEventListener('keydown', handlerKeyDown);

        return () => {
            document.removeEventListener('mousedown', handlerMouseDown);
            document.removeEventListener('keydown', handlerKeyDown);
        };
    });

    const onClickListHandler = (event: React.MouseEvent<HTMLUListElement>) => {
        if (
            event.target instanceof Element &&
            listRef.current?.contains(event.target) &&
            event.target.tagName === 'SPAN'
        ) {
            const handlerType = event.ctrlKey ? 'ctrlPressed' : event.shiftKey ? 'shiftPressed' : 'default';

            const chosenSlideIndex = parseInt(event.target.getAttribute('id')!) - 1;
            const editorModel = store.getState().model;

            const choosedNewSlide = !getChosenSlidesIndexes(editorModel).includes(chosenSlideIndex);
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
            }

            const amountOfSlidesCanBeDisabled = slideActiveStatusList.filter((status) => status).length;

            const newItemActiveStatusList: boolean[] =
                handlerType === 'default'
                    ? slideActiveStatusList.map((_, index) => {
                          return index == chosenSlideIndex;
                      })
                    : handlerType === 'ctrlPressed'
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
                          return (
                              (index <= activeSlideIndex && index >= chosenSlideIndex) ||
                              (index >= activeSlideIndex && index <= chosenSlideIndex)
                          );
                      });

            changeActiveStatusSlideList(newItemActiveStatusList);

            if (handlerType === 'default') {
                dispatchSetIdAction(dispatch)({
                    selectedSlidesIds: [props.slidesList[chosenSlideIndex].id],
                    selectedSlideElementsIds: [],
                });
            } else {
                const ctrlIds = choosedNewSlide
                    ? [...getActiveSlidesIds(editorModel).slice(0), props.slidesList[chosenSlideIndex].id]
                    : getActiveSlidesIds(editorModel)
                          .slice(0)
                          .filter((id) => id !== props.slidesList[chosenSlideIndex].id);
                if (!choosedNewSlide && handlerType === 'ctrlPressed') {
                    const newChosenSlideId = ctrlIds.slice(-1)[0];
                    const newChosenSlideIndex = props.slidesList.findIndex((slide) => slide.id === newChosenSlideId);
                    changeActiveSlideIndex(newChosenSlideIndex);
                    changeLastChosenSlideIndex(newChosenSlideIndex);
                }

                const idsChoosedByShift = [
                    ...props.slidesList
                        .map((slide, index) => {
                            if (newItemActiveStatusList[index] && index !== activeSlideIndex) {
                                return slide.id;
                            } else {
                                return '';
                            }
                        })
                        .filter((id) => id !== ''),
                    props.slidesList[activeSlideIndex].id,
                ];

                const newSelectedSlidesIds = handlerType === 'ctrlPressed' ? ctrlIds : idsChoosedByShift;

                dispatchSetIdAction(dispatch)({
                    selectedSlidesIds: newSelectedSlidesIds,
                    selectedSlideElementsIds: [],
                });
            }
        }
        setMouseReadyToDrag(false);
    };

    const onMouseUpListHandler = (event: React.MouseEvent<HTMLUListElement>) => {
        if (isMouseReadyToDrag && event.target instanceof Element && listRef.current?.contains(event.target)) {
            const element = event.target as Element;
            const slideIndexToInsert = parseInt(element.getAttribute('id')!);

            const chosenIndexes = getChosenSlidesIndexes(store.getState().model);

            const needToInsert = !(
                chosenIndexes.includes(slideIndexToInsert) || chosenIndexes.includes(slideIndexToInsert - 1)
            );

            if (needToInsert) {
                dispatchInsertSelectedSlides(dispatch)(slideIndexToInsert);
                dispatchKeepModelAction(dispatch)();
            } else {
                if (event.target.tagName === 'SPAN') {
                    changeActiveStatusSlideList(
                        slideActiveStatusList.map((_, index) => {
                            if (index === slideIndexToInsert) {
                                return true;
                            } else {
                                return false;
                            }
                        }),
                    );

                    const isBottom = event.target.nextElementSibling === null;

                    const chosenSlide = props.slidesList.find((_, index) => {
                        if (isBottom) {
                            return index === slideIndexToInsert - 1;
                        } else {
                            return index === slideIndexToInsert;
                        }
                    })!;
                    const chosenSlideId = chosenSlide.id;

                    dispatchSetIdAction(dispatch)({
                        selectedSlidesIds: [chosenSlideId],
                        selectedSlideElementsIds: [],
                    });
                }
            }
        }
        setMouseReadyToDrag(false);
    };

    const onMouseMoveListHandler = (event: React.MouseEvent<HTMLUListElement>) => {
        if (isMouseReadyToDrag && event.target instanceof Element && listRef.current?.contains(event.target)) {
            intersectionObserver.disconnect();
            const element = event.target as Element;
            intersectionObserver.observe(element);
        }
    };

    const onWheelListHandler = () => {
        intersectionObserver.disconnect();
    };

    const [listWidth, setListWidth] = useState(0);
    const [windowRatio, setWindowRatio] = useState(getWindowRatio(store.getState().viewModel));
    const mainContainerDimensions = getSlideContainerDimension(store.getState().viewModel);

    useLayoutEffect(() => {
        const handleWindowRatioChange = () => {
            const prevValue = windowRatio;
            const currValue = getWindowRatio(store.getState().viewModel);
            if (prevValue !== currValue) {
                setWindowRatio(currValue);
            }
        };

        if (listRef.current) {
            const computedStyle = getComputedStyle(listRef.current);
            setListWidth(
                listRef.current.offsetWidth -
                    parseFloat(computedStyle.paddingLeft) -
                    parseFloat(computedStyle.paddingRight),
            );
        }

        const unsubscribe = store.subscribe(handleWindowRatioChange);

        return () => {
            unsubscribe();
        };
    }, [listWidth]);

    return (
        <ul
            className={`${styles.list} ${styles['list-wrapper']}`}
            ref={listRef}
            onClick={onClickListHandler}
            onMouseUp={onMouseUpListHandler}
            onMouseMove={onMouseMoveListHandler}
            onWheel={onWheelListHandler}
        >
            {props.slidesList.map((slide, index) => {
                return (
                    <li className={styles['slide-list-item']} key={index}>
                        <SlideListItem
                            item={slide}
                            itemIndex={index}
                            status={slideActiveStatusList[index]}
                            key={slide.id}
                            width={listWidth}
                            height={listWidth / windowRatio}
                            viewBox={{
                                x: 0,
                                y: 0,
                                width: mainContainerDimensions.width,
                                height: mainContainerDimensions.height,
                            }}
                            shouldRenderHrs={isMouseReadyToDrag}
                        />
                    </li>
                );
            })}
        </ul>
    );
}

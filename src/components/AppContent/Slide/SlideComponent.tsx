import styles from './SlideComponent.module.css';

import { useContext, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { FigureElementComponent } from '../../SlideElements/FigureElements/FigureElementComponent';
import { getSlideElementType } from '../../../app_model/model/utils/tools';
import { PictureElementComponent } from '../../SlideElements/Picture/PictureElementComponent';
import { Coordinates, SelectedAreaLocation, Slide } from '../../../app_model/model/types';
import { TextElementComponent } from '../../SlideElements/Text/TextElementComponent';

import { LocaleContext } from '../../../App';

import { addSlide } from '../../../app_model/redux_model/actions_model/action_creators/slide_action_creators';
import { bindActionCreators } from 'redux';
import { changeSelectedElementsPosition } from '../../../app_model/redux_model/actions_model/action_creators/elements_action_creators';
import {
    getActiveElementsIds,
    getElementsAreaLoaction,
    getElementsCoordinates,
} from '../../../app_model/model/element_actions';
import { getActiveSlidesIds, getCurrentSlide } from '../../../app_model/model/slides_actions';
import {
    getResizersInfo,
    getSlideToContainerRatio,
    getWindowRatio,
} from '../../../app_model/view_model/slide_render_actions';
import {
    keepModelAction,
    setSelectedIdInEditor,
} from '../../../app_model/redux_model/actions_model/action_creators/editor_action_creators';
import { store } from '../../../app_model/redux_model/store';
import { useDispatch } from 'react-redux';

import { useDragAndDrop } from '../../utils/useDragAndDrop';

type SlideProps = {
    slide: Slide | undefined;
    renderType: 'default' | 'mainSlide';
    viewBox?: {
        x: number;
        y: number;
        width: number;
        height: number;
    };
    containerWidth?: number;
    containerHeight?: number;
    slideWidth?: number;
    slideHeight?: number;
};

export function SlideComponent(props: SlideProps) {
    const emptySlideRef = useRef<HTMLDivElement>(null);
    const refCanvas = useRef<SVGSVGElement>(null);
    const refSelectedArea = useRef<SVGRectElement>(null);

    const localeContext = useContext(LocaleContext);

    const dispatch = useDispatch();
    const dispatchAddSlideAction = bindActionCreators(addSlide, dispatch);
    const dispatchKeepModelAction = bindActionCreators(keepModelAction, dispatch);
    const dispatchSetIdAction = bindActionCreators(setSelectedIdInEditor, dispatch);
    const dispatchSetElementsPoistionAction = bindActionCreators(changeSelectedElementsPosition, dispatch);

    const emptySlideClickHandler = () => {
        dispatchAddSlideAction();
        dispatchKeepModelAction();
    };

    const [isSlideActive, setSlideActiveStatus] = useState(false);
    const [selectedAreaLocation, setSelectedAreaLocation] = useState(undefined as SelectedAreaLocation | undefined);
    const [selectedAreaStartPoint, setSelectedAreaStartPoint] = useState(undefined as Coordinates | undefined);
    const [isReadyToDrop, setIsReadyToDrop] = useState(false);
    const [elementsAmount, setElementsAmount] = useState(0);

    useEffect(() => {
        const onElementsAmountChangeHandler = () => {
            const prevAmount = elementsAmount;
            const currAmount = getActiveElementsIds(store.getState().model).length;
            if (prevAmount !== currAmount) {
                setSelectedAreaLocation(undefined);
                setSelectedAreaStartPoint(undefined);
                setElementsAmount(currAmount);
            }
        };

        const unsubscribeElementsAmount = store.subscribe(onElementsAmountChangeHandler);

        return () => {
            unsubscribeElementsAmount();
        };
    });

    useEffect(() => {
        const onMouseDownHandler = (event: MouseEvent) => {
            const pressedOnSlide = refCanvas.current?.contains(event.target as Node);
            if (pressedOnSlide) {
                const el = event.target as Element;
                const elDomIndex = el.getAttribute('id') ? parseInt(el.getAttribute('id')!) : undefined;

                const currSlide = getCurrentSlide(store.getState().model);

                const pressedOnElement = elDomIndex && currSlide;
                const missClicked = !el.getAttribute('id') && isSlideActive;

                setSlideActiveStatus(true);
                setIsReadyToDrop(true);

                if (pressedOnElement) {
                    const elementIndex = elDomIndex - 1;
                    const elementId = currSlide.elementsList[elementIndex].id;
                    const slideId = currSlide.id;

                    const currentActiveElementsIds = getActiveElementsIds(store.getState().model);

                    const isSimpleClick = !(event.ctrlKey || event.shiftKey);
                    const ctrlClick = event.ctrlKey;
                    const editorContainsSameId = currentActiveElementsIds.includes(elementId);

                    if (isSimpleClick && !editorContainsSameId) {
                        setSelectedAreaLocation(undefined);
                        setSelectedAreaStartPoint(undefined);

                        dispatchSetIdAction({
                            selectedSlidesIds: [slideId],
                            selectedSlideElementsIds: [elementId],
                        });
                    }

                    if (ctrlClick && !getActiveElementsIds(store.getState().model).includes(elementId)) {
                        setSelectedAreaStartPoint(undefined);
                        dispatchSetIdAction({
                            selectedSlidesIds: [slideId],
                            selectedSlideElementsIds: [...getActiveElementsIds(store.getState().model), elementId],
                        });
                    }

                    const selectedElementsArea = getElementsAreaLoaction(
                        getCurrentSlide(store.getState().model)!,
                        getActiveElementsIds(store.getState().model),
                    );

                    if (selectedElementsArea) {
                        setSelectedAreaLocation(selectedElementsArea);
                        setSelectedAreaStartPoint(selectedElementsArea.xy);
                    }
                }
                if (missClicked) {
                    dispatchSetIdAction({
                        selectedSlidesIds: getActiveSlidesIds(store.getState().model),
                        selectedSlideElementsIds: [],
                    });
                    setSelectedAreaLocation(undefined);
                    setSelectedAreaStartPoint(undefined);
                }
            } else if (isSlideActive) {
                dispatchSetIdAction({
                    selectedSlidesIds: getActiveSlidesIds(store.getState().model),
                    selectedSlideElementsIds: [],
                });
                setSlideActiveStatus(false);
                setSelectedAreaLocation(undefined);
                setSelectedAreaStartPoint(undefined);
            }
        };

        document.addEventListener('mousedown', onMouseDownHandler);

        return () => {
            document.removeEventListener('mousedown', onMouseDownHandler);
        };
    }, [isSlideActive]);

    const [currentElementsCoordinates, setElementsCoordinates] = useState(undefined as Coordinates[] | undefined);

    useEffect(() => {
        const onElementsPositionChangeHandler = () => {
            const prevElementsCoordinates = currentElementsCoordinates;
            const newElementsCoordinates = getElementsCoordinates(store.getState().model);
            setElementsCoordinates(newElementsCoordinates);

            if (prevElementsCoordinates !== newElementsCoordinates && newElementsCoordinates !== undefined) {
                if (getCurrentSlide(store.getState().model)?.elementsList.length) {
                    const selectedElementsIds = getActiveElementsIds(store.getState().model);
                    const selectedElementsArea = getElementsAreaLoaction(
                        getCurrentSlide(store.getState().model)!,
                        selectedElementsIds,
                    );
                    if (selectedElementsArea) {
                        setSelectedAreaLocation(selectedElementsArea);
                        setSelectedAreaStartPoint(selectedElementsArea.xy);
                    }
                } else {
                    setSelectedAreaLocation(undefined);
                    setSelectedAreaStartPoint(undefined);
                }
            }
        };
        const unsubscribeElementsPosition = store.subscribe(onElementsPositionChangeHandler);

        return () => {
            unsubscribeElementsPosition();
        };
    }, [props.slide?.elementsList.length]);

    useDragAndDrop({
        element: refSelectedArea.current,
        position: selectedAreaLocation!,
        setPosition: setSelectedAreaLocation,
    });

    useEffect(() => {
        const onMouseUpHandler = () => {
            if (isReadyToDrop) {
                if (selectedAreaLocation && selectedAreaStartPoint) {
                    const dx = selectedAreaLocation.xy.x - selectedAreaStartPoint.x;
                    const dy = selectedAreaLocation.xy.y - selectedAreaStartPoint.y;
                    dispatchSetElementsPoistionAction({ dx: dx, dy: dy });
                    setSelectedAreaStartPoint(selectedAreaLocation.xy);
                    dispatchKeepModelAction();
                }
            }
            setIsReadyToDrop(false);
        };
        document.addEventListener('mouseup', onMouseUpHandler);

        return () => {
            document.removeEventListener('mouseup', onMouseUpHandler);
        };
    }, [selectedAreaLocation]);

    const onMouseDownResizeHandler = (mainEvent: React.MouseEvent) => {
        const chosenResizer = mainEvent.target as Element;
        const startX = mainEvent.pageX;
        const startY = mainEvent.pageY;

        const itsSWResizer = chosenResizer.getAttribute('id')?.includes('sw');
        const itsSEResizer = chosenResizer.getAttribute('id')?.includes('se');
        const itsNEResizer = chosenResizer.getAttribute('id')?.includes('ne');
        const itsNWResizer = chosenResizer.getAttribute('id')?.includes('nw');

        const mouseMoveReziseHandler = (e: MouseEvent) => {
            const dx = e.pageX - startX;
            const dy = e.pageY - startY;

            const maxD = Math.abs(dx) > Math.abs(dy) ? dx : dy;

            if (itsSEResizer) {
                if (refCanvas.current) {
                    refCanvas.current.style.cursor = 'se-resize';
                }
                const currSelectedAreaLocation = selectedAreaLocation;
                if (currSelectedAreaLocation) {
                    const newSelectedAreaLocation = {
                        ...currSelectedAreaLocation,
                        dimensions: {
                            width: currSelectedAreaLocation.dimensions.width + maxD,
                            height: currSelectedAreaLocation.dimensions.height + maxD,
                        },
                    } as SelectedAreaLocation | undefined;
                    setSelectedAreaLocation(newSelectedAreaLocation);
                }
            }
            if (itsNEResizer) {
                if (refCanvas.current) {
                    refCanvas.current.style.cursor = 'ne-resize';
                }
                const currSelectedAreaLocation = selectedAreaLocation;
                if (currSelectedAreaLocation) {
                    const newSelectedAreaLocation = {
                        ...currSelectedAreaLocation,
                        xy: {
                            x: currSelectedAreaLocation.xy.x + maxD,
                            y: currSelectedAreaLocation.xy.y + maxD,
                        },
                        dimensions: {
                            width: currSelectedAreaLocation.dimensions.width + dx,
                            height: currSelectedAreaLocation.dimensions.height + Math.abs(maxD),
                        },
                    } as SelectedAreaLocation | undefined;
                    setSelectedAreaLocation(newSelectedAreaLocation);
                }
            }
        };
        const mouseUpReziseHandler = () => {
            window.removeEventListener('mousemove', mouseMoveReziseHandler);
            window.removeEventListener('mouseup', mouseUpReziseHandler);
            if (refCanvas.current) {
                refCanvas.current.style.cursor = 'default';
            }
        };

        window.addEventListener('mousemove', mouseMoveReziseHandler);
        window.addEventListener('mouseup', mouseUpReziseHandler);
    };

    const [slideContainerRatio, setSlideContainerRatio] = useState(
        getSlideToContainerRatio(store.getState().viewModel),
    );
    const [windowRatio, setWindowRatio] = useState(getWindowRatio(store.getState().viewModel));

    const [resizersRenderInfo, setResizersRenderInfo] = useState(getResizersInfo(store.getState().viewModel));
    const resizersOffset = resizersRenderInfo.offset;
    const resizersSize = resizersRenderInfo.dimension;

    useLayoutEffect(() => {
        if (props.renderType === 'mainSlide') {
            const handler = () => {
                const prevSlideContainerRatio = slideContainerRatio;
                const prevWindowRatio = windowRatio;
                const prevResizersRenderInfo = resizersRenderInfo;

                const currSlideContainerRatio = getSlideToContainerRatio(store.getState().viewModel);
                const currWindowRatio = getWindowRatio(store.getState().viewModel);
                const currResizersRenderInfo = getResizersInfo(store.getState().viewModel);

                if (prevSlideContainerRatio !== currSlideContainerRatio) {
                    setSlideContainerRatio(currSlideContainerRatio);
                }
                if (prevWindowRatio !== currWindowRatio) {
                    setWindowRatio(currWindowRatio);
                }
                if (prevResizersRenderInfo !== currResizersRenderInfo) {
                    setResizersRenderInfo(currResizersRenderInfo);
                }
            };

            const unsubscribe = store.subscribe(handler);

            return () => {
                unsubscribe();
            };
        }
    }, [slideContainerRatio, windowRatio]);

    const emptySlideWidth = props.containerWidth! * slideContainerRatio;
    const emptySlideHeight = emptySlideWidth / windowRatio;
    if (emptySlideRef.current) {
        emptySlideRef.current.style.width = `${emptySlideWidth}px`;
        emptySlideRef.current.style.height = `${emptySlideHeight}px`;
    }

    const slideWidth = props.renderType === 'mainSlide' && props.slideWidth ? props.slideWidth : '';
    const slideHeight = props.renderType === 'mainSlide' && props.slideHeight ? props.slideHeight : '';

    const viewBox = props.viewBox;

    let elementIndex = 0;
    return props.slide === undefined ? (
        <div ref={emptySlideRef} className={styles['empty-slide-container']} onClick={emptySlideClickHandler}>
            {localeContext.locale.localization.editor.emptySlide}
        </div>
    ) : props.renderType === 'mainSlide' ? (
        <svg
            ref={refCanvas}
            width={`${slideWidth}`}
            height={`${slideHeight}`}
            className={styles['slide']}
            viewBox={`${viewBox ? viewBox.x : 0} ${viewBox ? viewBox.y : 0} ${viewBox ? viewBox.width : ''} 
            ${viewBox ? viewBox.height : ''}`}
            preserveAspectRatio={'xMidYMid meet'}
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
        >
            <rect
                x={(props.containerWidth! - emptySlideWidth) / 2}
                y={(props.containerHeight! - emptySlideHeight) / 2}
                width={emptySlideWidth}
                height={emptySlideHeight}
                style={{ fill: `${props.slide.background.color}` }}
            />
            {props.slide !== undefined ? (
                props.slide.elementsList.map((element) => {
                    elementIndex = elementIndex + 1;
                    switch (getSlideElementType(element.content)) {
                        case 'TEXT':
                            return (
                                <TextElementComponent key={element.id} elementIndex={elementIndex} element={element} />
                            );
                        case 'FIGURE':
                            return (
                                <FigureElementComponent
                                    key={element.id}
                                    elementIndex={elementIndex}
                                    element={element}
                                />
                            );
                        case 'PICTURE':
                            return (
                                <PictureElementComponent
                                    key={element.id}
                                    elementIndex={elementIndex}
                                    element={element}
                                />
                            );
                    }
                })
            ) : (
                <></>
            )}
            {selectedAreaLocation !== undefined && props.renderType === 'mainSlide' ? (
                <>
                    <rect
                        ref={refSelectedArea}
                        x={selectedAreaLocation.xy.x}
                        y={selectedAreaLocation.xy.y}
                        id={'select-area'}
                        className={styles['select-area']}
                        width={selectedAreaLocation.dimensions.width}
                        height={selectedAreaLocation.dimensions.height}
                    />
                    <rect
                        id="resize-nw"
                        x={selectedAreaLocation.xy.x - resizersOffset}
                        y={selectedAreaLocation.xy.y - resizersOffset}
                        width={resizersSize}
                        height={resizersSize}
                        className={styles['resizer-nw']}
                        onMouseDown={onMouseDownResizeHandler}
                    />
                    <rect
                        id="resize-ne"
                        x={
                            selectedAreaLocation.xy.x +
                            selectedAreaLocation.dimensions.width -
                            resizersSize +
                            resizersOffset
                        }
                        y={selectedAreaLocation.xy.y - resizersOffset}
                        width={resizersSize}
                        height={resizersSize}
                        className={styles['resizer-ne']}
                        onMouseDown={onMouseDownResizeHandler}
                    />
                    <rect
                        id="resize-se"
                        x={
                            selectedAreaLocation.xy.x +
                            selectedAreaLocation.dimensions.width -
                            resizersSize +
                            resizersOffset
                        }
                        y={
                            selectedAreaLocation.xy.y +
                            selectedAreaLocation.dimensions.height -
                            resizersSize +
                            resizersOffset
                        }
                        width={resizersSize}
                        height={resizersSize}
                        className={styles['resizer-se']}
                        onMouseDown={onMouseDownResizeHandler}
                    />
                    <rect
                        id="resize-sw"
                        x={selectedAreaLocation.xy.x - resizersOffset}
                        y={
                            selectedAreaLocation.xy.y +
                            selectedAreaLocation.dimensions.height -
                            resizersSize +
                            resizersOffset
                        }
                        width={resizersSize}
                        height={resizersSize}
                        className={styles['resizer-sw']}
                        onMouseDown={onMouseDownResizeHandler}
                    />
                </>
            ) : (
                <></>
            )}
        </svg>
    ) : (
        <svg
            width={props.slideWidth}
            height={props.slideHeight}
            viewBox={`${(props.containerWidth! - emptySlideWidth) / 2} ${
                (props.containerHeight! - emptySlideHeight) / 2
            } ${emptySlideWidth} ${emptySlideHeight}`}
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
        >
            <rect
                x={(props.containerWidth! - emptySlideWidth) / 2}
                y={(props.containerHeight! - emptySlideHeight) / 2}
                width={emptySlideWidth}
                height={emptySlideHeight}
                style={{ fill: `${props.slide.background.color}` }}
            />
            {props.slide !== undefined ? (
                props.slide.elementsList.map((element) => {
                    elementIndex = elementIndex + 1;
                    switch (getSlideElementType(element.content)) {
                        case 'TEXT':
                            return (
                                <TextElementComponent key={element.id} elementIndex={elementIndex} element={element} />
                            );
                        case 'FIGURE':
                            return (
                                <FigureElementComponent
                                    key={element.id}
                                    elementIndex={elementIndex}
                                    element={element}
                                />
                            );
                        case 'PICTURE':
                            return (
                                <PictureElementComponent
                                    key={element.id}
                                    elementIndex={elementIndex}
                                    element={element}
                                />
                            );
                    }
                })
            ) : (
                <></>
            )}
        </svg>
    );
}

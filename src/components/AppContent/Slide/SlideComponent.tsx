import styles from './SlideComponent.module.css';

import { BaseSyntheticEvent, useContext, useEffect, useLayoutEffect, useRef, useState } from 'react';

import { FigureElementComponent } from '../../SlideElements/FigureElements/FigureElementComponent';
import { PictureElementComponent } from '../../SlideElements/Picture/PictureElementComponent';
import { Coordinates, AreaLocation, Slide } from '../../../app_model/model/types';
import { TextElementComponent } from '../../SlideElements/Text/TextElementComponent';

import { LocaleContext } from '../../../App';

import {
    getActiveElementsIds,
    getElementsAreaLoaction,
    getSlideElementsAmount,
} from '../../../app_model/model/element_actions';
import { getActiveSlidesIds, getCurrentSlide } from '../../../app_model/model/slides_actions';
import { getActiveViewArea } from '../../../app_model/view_model/active_view_area_actions';
import {
    getElementsRenderRatio,
    getResizersInfo,
    getSlideToContainerRatio,
    getWindowRatio,
} from '../../../app_model/view_model/slide_render_actions';
import { getSlideElementType } from '../../../app_model/model/utils/tools';

import {
    dispatchActiveViewAreaAction,
    dispatchAddSlideAction,
    dispatchKeepModelAction,
    dispatchSetElementsPoistionAction,
    dispatchSetElementsSizeAction,
    dispatchSetIdAction,
} from '../../../app_model/redux_model/dispatchers';
import { store } from '../../../app_model/redux_model/store';
import { useDispatch } from 'react-redux';

import { useDragAndDrop } from '../../utils/useDragAndDrop';

import * as resizerStuff from '../../utils/useElementResize';

type SlideProps = {
    slide: Slide | undefined;
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

const SELECT_AREA_ID = 'select-area';

const SLIDE_WHITE_AREA_ID = 'slide-white-area';

export function SlideComponent(props: SlideProps) {
    const emptySlideRef = useRef<HTMLDivElement>(null);
    const refCanvas = useRef<SVGSVGElement>(null);
    const refSelectedArea = useRef<SVGRectElement>(null);

    const localeContext = useContext(LocaleContext);

    const dispatch = useDispatch();

    const emptySlideClickHandler = () => {
        dispatchAddSlideAction(dispatch)();
        dispatchKeepModelAction(dispatch)();
    };

    const [isSlideActive, setSlideActiveStatus] = useState(false);
    const [selectedAreaLocation, setSelectedAreaLocation] = useState(undefined as AreaLocation | undefined);
    const [selectedAreaStartPoint, setSelectedAreaStartPoint] = useState(undefined as Coordinates | undefined);

    const [elementsAmount, setElementsAmount] = useState(getSlideElementsAmount(props.slide));

    const [slideContainerRatio, setSlideContainerRatio] = useState(
        getSlideToContainerRatio(store.getState().viewModel),
    );
    const [windowRatio, setWindowRatio] = useState(getWindowRatio(store.getState().viewModel));
    const [resizersRenderInfo, setResizersRenderInfo] = useState(getResizersInfo(store.getState().viewModel));
    const [currHistoryIndex, setCurrHistoryIndex] = useState(0);

    useLayoutEffect(() => {
        const handleRenderSpecs = () => {
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

        const onHistoryChangeHandler = () => {
            const currSlide = getCurrentSlide(store.getState().model);
            if (currSlide) {
                const prevValue = selectedAreaLocation;
                const currValue = getElementsAreaLoaction(currSlide, getActiveElementsIds(store.getState().model));
                if (prevValue !== currValue) {
                    if (currValue) {
                        setSelectedAreaLocation(currValue);
                        setSelectedAreaStartPoint(currValue.xy);
                    }
                }
            }
        };

        const onElementsAmountHandler = () => {
            const prevAmount = elementsAmount;
            const currAmount = getSlideElementsAmount(props.slide);
            if (prevAmount !== currAmount) {
                setSelectedAreaLocation(undefined);
                setSelectedAreaStartPoint(undefined);
                setElementsAmount(currAmount);
            }
        };

        const unsubscribeOnElementsAmount = store.subscribe(onElementsAmountHandler);
        const unsubscribeOnHistory = store.subscribe(onHistoryChangeHandler);
        const unsubscribeOnRenderSpecs = store.subscribe(handleRenderSpecs);

        return () => {
            unsubscribeOnRenderSpecs();
            unsubscribeOnHistory();
            unsubscribeOnElementsAmount();
        };
    }, [slideContainerRatio, resizersRenderInfo, windowRatio, currHistoryIndex]);

    useEffect(() => {
        const onMouseDownHandler = (event: MouseEvent) => {
            const pressedOnSlide = refCanvas.current?.contains(event.target as Element);
            if (pressedOnSlide) {
                if (getActiveViewArea(store.getState().viewModel) !== 'MAIN_SLIDE') {
                    dispatchActiveViewAreaAction(dispatch)('MAIN_SLIDE');
                }
                const el = event.target as Element;
                const elAttrId = el.getAttribute('id');
                const isSlideElement =
                    elAttrId !== SLIDE_WHITE_AREA_ID &&
                    (el.tagName === 'rect' ||
                        el.tagName === 'ellipse' ||
                        el.tagName === 'polygon' ||
                        el.tagName === 'text' ||
                        el.tagName === 'image');

                const elDomIndex = isSlideElement ? parseInt(elAttrId!) : undefined;

                const slide = getCurrentSlide(store.getState().model)!;

                const pressedOnElement = elDomIndex && slide;
                const missClickedElement = !isSlideElement && isSlideActive;

                setSlideActiveStatus(true);

                const selectedElementsArea = getElementsAreaLoaction(
                    getCurrentSlide(store.getState().model)!,
                    getActiveElementsIds(store.getState().model),
                );

                if (selectedElementsArea) {
                    setSelectedAreaLocation(selectedElementsArea);
                    setSelectedAreaStartPoint(selectedElementsArea.xy);
                }

                if (pressedOnElement) {
                    const elementIndex = elDomIndex - 1;
                    const elementId = slide.elementsList[elementIndex].id;
                    const slideId = slide.id;

                    const isSimpleClick = !(event.ctrlKey || event.shiftKey);

                    setSelectedAreaLocation(undefined);
                    setSelectedAreaStartPoint(undefined);
                    if (isSimpleClick) {
                        dispatchSetIdAction(dispatch)({
                            selectedSlidesIds: [slideId],
                            selectedSlideElementsIds: [elementId],
                        });
                    } else if (event.ctrlKey) {
                        dispatchSetIdAction(dispatch)({
                            selectedSlidesIds: [slideId],
                            selectedSlideElementsIds: [...getActiveElementsIds(store.getState().model), elementId],
                        });
                    } else if (event.ctrlKey) {
                        dispatchSetIdAction(dispatch)({
                            selectedSlidesIds: [slideId],
                            selectedSlideElementsIds: [
                                ...getActiveElementsIds(store.getState().model).filter((id) => id !== elementId),
                            ],
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
                } else if (missClickedElement) {
                    dispatchSetIdAction(dispatch)({
                        selectedSlidesIds: getActiveSlidesIds(store.getState().model),
                        selectedSlideElementsIds: [],
                    });
                    setSelectedAreaLocation(undefined);
                    setSelectedAreaStartPoint(undefined);
                }
            } else if (isSlideActive) {
                dispatchSetIdAction(dispatch)({
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

    useEffect(() => {
        const onMouseUpHandler = (event: MouseEvent) => {
            const onDragAndDrop = (event.target as Element).getAttribute('id') === SELECT_AREA_ID;
            if (onDragAndDrop && selectedAreaLocation && selectedAreaStartPoint) {
                const dx = selectedAreaLocation.xy.x - selectedAreaStartPoint.x;
                const dy = selectedAreaLocation.xy.y - selectedAreaStartPoint.y;
                dispatchSetElementsPoistionAction(dispatch)({ dx: dx, dy: dy });
                setSelectedAreaStartPoint(selectedAreaLocation.xy);
                dispatchKeepModelAction(dispatch)();
            }
        };
        document.addEventListener('mouseup', onMouseUpHandler);

        return () => {
            document.removeEventListener('mouseup', onMouseUpHandler);
        };
    }, [selectedAreaLocation]);

    const onMouseDownResizeHandler = (event: React.MouseEvent) => {
        const chosenResizer = event.target as Element;
        const startX = event.pageX;
        const startY = event.pageY;

        const chosenResizerAttrId = chosenResizer.getAttribute('id');

        const itsNResizer = chosenResizerAttrId?.includes(resizerStuff.N_RESIZER_ID);
        const itsSResizer = chosenResizerAttrId?.includes(resizerStuff.S_RESIZER_ID);
        const itsWResizer = chosenResizerAttrId?.includes(resizerStuff.W_RESIZER_ID);
        const itsEResizer = chosenResizerAttrId?.includes(resizerStuff.E_RESIZER_ID);

        let newSelectedAreaLocation: AreaLocation | undefined;

        const mouseMoveReziseHandler = (e: MouseEvent) => {
            const dx = (e.pageX - startX) / renderScale.width;
            const dy = (e.pageY - startY) / renderScale.height;
            const maxD = Math.abs(dx) > Math.abs(dy) ? dx : dy;
            if (itsNResizer || itsSResizer) {
                if (refCanvas.current && refCanvas.current.style.cursor !== resizerStuff.N_RESIZER_ID) {
                    refCanvas.current.style.cursor = resizerStuff.N_RESIZER_ID;
                }
            } else if (itsEResizer || itsWResizer) {
                if (refCanvas.current && refCanvas.current.style.cursor !== resizerStuff.E_RESIZER_ID) {
                    refCanvas.current.style.cursor = resizerStuff.E_RESIZER_ID;
                }
            }
            const currSelectedAreaLocation = selectedAreaLocation;
            if (currSelectedAreaLocation) {
                const dXY = { dx, dy };
                const resizerType = {
                    itsNResizer: itsNResizer,
                    itsSResizer: itsSResizer,
                    itsWResizer: itsWResizer,
                    itsEResizer: itsEResizer,
                };
                newSelectedAreaLocation = resizerStuff.getResizedSelectedAreaLocation(
                    currSelectedAreaLocation,
                    dXY,
                    resizerType,
                ) as AreaLocation;
                setSelectedAreaLocation(newSelectedAreaLocation);
                setSelectedAreaStartPoint(newSelectedAreaLocation.xy);
            }
        };
        const mouseUpReziseHandler = () => {
            window.removeEventListener('mousemove', mouseMoveReziseHandler);
            window.removeEventListener('mouseup', mouseUpReziseHandler);
            if (refCanvas.current) {
                refCanvas.current.style.cursor = 'default';
            }
            dispatchSetElementsSizeAction(dispatch)({
                xy: {
                    x: newSelectedAreaLocation!.xy.x,
                    y: newSelectedAreaLocation!.xy.y,
                },
                dimensions: {
                    width: newSelectedAreaLocation!.dimensions.width,
                    height: newSelectedAreaLocation!.dimensions.height,
                },
            });
            dispatchKeepModelAction(dispatch)();
        };
        window.addEventListener('mousemove', mouseMoveReziseHandler);
        window.addEventListener('mouseup', mouseUpReziseHandler);
    };

    const resizersOffset = resizersRenderInfo.offset;
    const resizersSize = resizersRenderInfo.dimension;
    const renderScale = getElementsRenderRatio(store.getState().viewModel);
    const resizerRenderArr = resizerStuff.getResizersRenderInfoArr(
        selectedAreaLocation,
        resizersSize,
        resizersOffset,
        renderScale,
    );

    useDragAndDrop({
        element: refSelectedArea.current,
        position: selectedAreaLocation!,
        setPosition: setSelectedAreaLocation,
        scale: renderScale,
    });

    const onSelectAreaEnterHandler = (event: BaseSyntheticEvent) => {
        const el = event.target as Element;
        const elAttrId = el.getAttribute('id');
        if (elAttrId === SELECT_AREA_ID && refCanvas.current) {
            refCanvas.current.style.cursor = 'move';
        }
    };
    const onSelectAreaLeaveHandler = (event: BaseSyntheticEvent) => {
        const el = event.target as Element;
        const elAttrId = el.getAttribute('id');
        if (elAttrId === SELECT_AREA_ID && refCanvas.current) {
            refCanvas.current.style.cursor = 'default';
        }
    };

    const emptySlideWidth = props.containerWidth! * slideContainerRatio;
    const emptySlideHeight = emptySlideWidth / windowRatio;
    if (emptySlideRef.current) {
        emptySlideRef.current.style.width = `${emptySlideWidth}px`;
        emptySlideRef.current.style.height = `${emptySlideHeight}px`;
    }

    const slideWidth = props.slideWidth ? `${props.slideWidth}px` : '';
    const slideHeight = props.slideHeight ? `${props.slideHeight}px` : '';

    const viewBox = props.viewBox;

    let elementIndex = 0;

    return props.slide === undefined ? (
        <div ref={emptySlideRef} className={styles['empty-slide-container']} onClick={emptySlideClickHandler}>
            {localeContext.locale.localization.editor.emptySlide}
        </div>
    ) : (
        <svg
            ref={refCanvas}
            width={slideWidth}
            height={slideHeight}
            className={styles['slide']}
            viewBox={`${viewBox ? viewBox.x : 0} ${viewBox ? viewBox.y : 0} ${viewBox ? viewBox.width : ''}
            ${viewBox ? viewBox.height : ''}`}
            preserveAspectRatio={'xMidYMid meet'}
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
        >
            <rect
                x={-emptySlideWidth / 2}
                y={-emptySlideHeight / 2}
                id={SLIDE_WHITE_AREA_ID}
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
            {selectedAreaLocation !== undefined ? (
                <>
                    <rect
                        ref={refSelectedArea}
                        x={selectedAreaLocation.xy.x * renderScale.width}
                        y={selectedAreaLocation.xy.y * renderScale.height}
                        id={SELECT_AREA_ID}
                        className={styles[SELECT_AREA_ID]}
                        width={selectedAreaLocation.dimensions.width * renderScale.width}
                        height={selectedAreaLocation.dimensions.height * renderScale.height}
                        onMouseEnter={onSelectAreaEnterHandler}
                        onMouseLeave={onSelectAreaLeaveHandler}
                    />
                    {resizerRenderArr.map((info, index) => {
                        return (
                            <rect
                                key={index}
                                id={info.id}
                                x={info.x}
                                y={info.y}
                                width={resizersSize}
                                height={resizersSize}
                                className={styles[`${info.className}`]}
                                onMouseDown={onMouseDownResizeHandler}
                            />
                        );
                    })}
                </>
            ) : (
                <></>
            )}
        </svg>
    );
}

import styles from './SlideComponent.module.css';

import { useContext, useEffect, useLayoutEffect, useRef, useState } from 'react';

import { FigureElementComponent } from '../../SlideElements/FigureElements/FigureElementComponent';
import { PictureElementComponent } from '../../SlideElements/Picture/PictureElementComponent';
import { Coordinates, SelectedAreaLocation, Slide } from '../../../app_model/model/types';
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
    dispatchSetIdAction,
} from '../../../app_model/redux_model/dispatchers';
import { store } from '../../../app_model/redux_model/store';
import { useDispatch } from 'react-redux';

import { useDragAndDrop } from '../../utils/useDragAndDrop';

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
    const [selectedAreaLocation, setSelectedAreaLocation] = useState(undefined as SelectedAreaLocation | undefined);
    const [selectedAreaStartPoint, setSelectedAreaStartPoint] = useState(undefined as Coordinates | undefined);

    const [elementsAmount, setElementsAmount] = useState(getSlideElementsAmount(props.slide));

    useLayoutEffect(() => {
        const onElementsAmountOrSlideChangeHandler = () => {
            const prevAmount = elementsAmount;
            const currAmount = getSlideElementsAmount(props.slide);
            if (prevAmount !== currAmount) {
                setSelectedAreaLocation(undefined);
                setSelectedAreaStartPoint(undefined);
                setElementsAmount(currAmount);
            }
        };

        const unsubscribe = store.subscribe(onElementsAmountOrSlideChangeHandler);
        return () => {
            unsubscribe();
        };
    }, [elementsAmount]);

    useEffect(() => {
        const onMouseDownHandler = (event: MouseEvent) => {
            const pressedOnSlide = refCanvas.current?.contains(event.target as Element);
            if (pressedOnSlide) {
                if (getActiveViewArea(store.getState().viewModel) !== 'MAIN_SLIDE') {
                    dispatchActiveViewAreaAction(dispatch)('MAIN_SLIDE');
                }
                const el = event.target as Element;
                const isSlideElement =
                    el.getAttribute('id') !== 'slide-white-area' &&
                    (el.tagName === 'rect' || el.tagName === 'circle' || el.tagName === 'text');

                const elDomIndex = isSlideElement ? parseInt(el.getAttribute('id')!) : undefined;

                const slide = getCurrentSlide(store.getState().model)!;

                const pressedOnElement = elDomIndex && slide;
                const missClickedElement = !isSlideElement && isSlideActive;

                setSlideActiveStatus(true);

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

    useDragAndDrop({
        element: refSelectedArea.current,
        position: selectedAreaLocation!,
        setPosition: setSelectedAreaLocation,
    });

    useEffect(() => {
        const onMouseUpHandler = () => {
            if (selectedAreaLocation && selectedAreaStartPoint) {
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

    const onMouseDownResizeHandler = (mainEvent: React.MouseEvent) => {
        //     const chosenResizer = mainEvent.target as Element;
        //     const startX = mainEvent.pageX;
        //     const startY = mainEvent.pageY;
        //     const itsSWResizer = chosenResizer.getAttribute('id')?.includes('sw');
        //     const itsSEResizer = chosenResizer.getAttribute('id')?.includes('se');
        //     const itsNEResizer = chosenResizer.getAttribute('id')?.includes('ne');
        //     const itsNWResizer = chosenResizer.getAttribute('id')?.includes('nw');
        //     const mouseMoveReziseHandler = (e: MouseEvent) => {
        //         const dx = e.pageX - startX;
        //         const dy = e.pageY - startY;
        //         const maxD = Math.abs(dx) > Math.abs(dy) ? dx : dy;
        //         if (itsSEResizer) {
        //             if (refCanvas.current) {
        //                 refCanvas.current.style.cursor = 'se-resize';
        //             }
        //             const currSelectedAreaLocation = selectedAreaLocation;
        //             if (currSelectedAreaLocation) {
        //                 const newSelectedAreaLocation = {
        //                     ...currSelectedAreaLocation,
        //                     dimensions: {
        //                         width: currSelectedAreaLocation.dimensions.width + maxD,
        //                         height: currSelectedAreaLocation.dimensions.height + maxD,
        //                     },
        //                 } as SelectedAreaLocation | undefined;
        //                 setSelectedAreaLocation(newSelectedAreaLocation);
        //             }
        //         }
        //         if (itsNEResizer) {
        //             if (refCanvas.current) {
        //                 refCanvas.current.style.cursor = 'ne-resize';
        //             }
        //             const currSelectedAreaLocation = selectedAreaLocation;
        //             if (currSelectedAreaLocation) {
        //                 const newSelectedAreaLocation = {
        //                     ...currSelectedAreaLocation,
        //                     xy: {
        //                         x: currSelectedAreaLocation.xy.x + maxD,
        //                         y: currSelectedAreaLocation.xy.y + maxD,
        //                     },
        //                     dimensions: {
        //                         width: currSelectedAreaLocation.dimensions.width + dx,
        //                         height: currSelectedAreaLocation.dimensions.height + Math.abs(maxD),
        //                     },
        //                 } as SelectedAreaLocation | undefined;
        //                 setSelectedAreaLocation(newSelectedAreaLocation);
        //             }
        //         }
        //     };
        //     const mouseUpReziseHandler = () => {
        //         window.removeEventListener('mousemove', mouseMoveReziseHandler);
        //         window.removeEventListener('mouseup', mouseUpReziseHandler);
        //         if (refCanvas.current) {
        //             refCanvas.current.style.cursor = 'default';
        //         }
        //     };
        //     window.addEventListener('mousemove', mouseMoveReziseHandler);
        //     window.addEventListener('mouseup', mouseUpReziseHandler);
    };

    const [slideContainerRatio, setSlideContainerRatio] = useState(
        getSlideToContainerRatio(store.getState().viewModel),
    );
    const [windowRatio, setWindowRatio] = useState(getWindowRatio(store.getState().viewModel));

    const [resizersRenderInfo, setResizersRenderInfo] = useState(getResizersInfo(store.getState().viewModel));
    const resizersOffset = resizersRenderInfo.offset;
    const resizersSize = resizersRenderInfo.dimension;

    useLayoutEffect(() => {
        const onWindowRatioOrSlideToContainerRatioChange = () => {
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

        const unsubscribe = store.subscribe(onWindowRatioOrSlideToContainerRatioChange);

        return () => {
            unsubscribe();
        };
    }, [slideContainerRatio, windowRatio]);

    const emptySlideWidth = props.containerWidth! * slideContainerRatio;
    const emptySlideHeight = emptySlideWidth / windowRatio;
    if (emptySlideRef.current) {
        emptySlideRef.current.style.width = `${emptySlideWidth}px`;
        emptySlideRef.current.style.height = `${emptySlideHeight}px`;
    }

    const slideWidth = props.slideWidth ? props.slideWidth : '';
    const slideHeight = props.slideHeight ? props.slideHeight : '';

    const viewBox = props.viewBox;

    const resizerRenderArr = getResizersRenderInfoArr(selectedAreaLocation, resizersSize, resizersOffset);

    let elementIndex = 0;
    return props.slide === undefined ? (
        <div ref={emptySlideRef} className={styles['empty-slide-container']} onClick={emptySlideClickHandler}>
            {localeContext.locale.localization.editor.emptySlide}
        </div>
    ) : (
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
                id="slide-white-area"
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
                        x={selectedAreaLocation.xy.x}
                        y={selectedAreaLocation.xy.y}
                        id={'select-area'}
                        className={styles['select-area']}
                        width={selectedAreaLocation.dimensions.width}
                        height={selectedAreaLocation.dimensions.height}
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
                                className={info.className}
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

function getResizersRenderInfoArr(
    selectedAreaLocation: SelectedAreaLocation | undefined,
    resizersSize: number,
    resizersOffset: number,
) {
    const resizersCords = {
        xyStart: {
            x: selectedAreaLocation ? selectedAreaLocation.xy.x - resizersOffset : 0,
            y: selectedAreaLocation ? selectedAreaLocation.xy.y - resizersOffset : 0,
        },
        halfs: {
            width: selectedAreaLocation
                ? (selectedAreaLocation.dimensions.width - resizersSize) / 2 + resizersOffset
                : 0,
            height: selectedAreaLocation
                ? (selectedAreaLocation.dimensions.height - resizersSize) / 2 + resizersOffset
                : 0,
        },
        dimensions: {
            width: selectedAreaLocation
                ? selectedAreaLocation.xy.x + selectedAreaLocation.dimensions.width - resizersSize + resizersOffset
                : 0,
            height: selectedAreaLocation
                ? selectedAreaLocation.xy.y + selectedAreaLocation.dimensions.height - resizersSize + resizersOffset
                : 0,
        },
    };

    return [
        {
            id: 'resize-nw',
            x: resizersCords.xyStart.x,
            y: resizersCords.xyStart.y,
            className: styles['resizer-nw'],
        },
        {
            id: 'resize-n',
            x: resizersCords.xyStart.x + resizersCords.halfs.width,
            y: resizersCords.xyStart.y,
            className: styles['resizer-n'],
        },
        {
            id: 'resize-ne',
            x: resizersCords.dimensions.width,
            y: resizersCords.xyStart.y,
            className: styles['resizer-ne'],
        },
        {
            id: 'resize-e',
            x: resizersCords.dimensions.width,
            y: resizersCords.xyStart.y + resizersCords.halfs.height,
            className: styles['resizer-e'],
        },
        {
            id: 'resize-se',
            x: resizersCords.dimensions.width,
            y: resizersCords.dimensions.height,
            className: styles['resizer-se'],
        },
        {
            id: 'resize-s',
            x: resizersCords.xyStart.x + resizersCords.halfs.width,
            y: resizersCords.dimensions.height,
            className: styles['resizer-s'],
        },
        {
            id: 'resize-sw',
            x: resizersCords.xyStart.x,
            y: resizersCords.dimensions.height,
            className: styles['resizer-sw'],
        },
        {
            id: 'resize-w',
            x: resizersCords.xyStart.x,
            y: resizersCords.xyStart.y + resizersCords.halfs.height,
            className: styles['resizer-w'],
        },
    ];
}

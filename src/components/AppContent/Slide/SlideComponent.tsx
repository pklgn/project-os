import styles from './SlideComponent.module.css';

import { useContext, useEffect, useLayoutEffect, useRef, useState } from 'react';

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
    getSlideContainerDimension,
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
import { ElementsRatioType } from '../../../app_model/view_model/types';

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
const RESIZER_ID = '-resize';

const NW_RESIZER_ID = 'nw' + RESIZER_ID;
const N_RESIZER_ID = 'n' + RESIZER_ID;
const NE_RESIZER_ID = 'ne' + RESIZER_ID;
const E_RESIZER_ID = 'e' + RESIZER_ID;
const SE_RESIZER_ID = 'se' + RESIZER_ID;
const S_RESIZER_ID = 's' + RESIZER_ID;
const SW_RESIZER_ID = 'sw' + RESIZER_ID;
const W_RESIZER_ID = 'w' + RESIZER_ID;

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

    useLayoutEffect(() => {
        const onElementsAmountHandler = () => {
            const prevAmount = elementsAmount;
            const currAmount = getSlideElementsAmount(props.slide);
            if (prevAmount !== currAmount) {
                setSelectedAreaLocation(undefined);
                setSelectedAreaStartPoint(undefined);
                setElementsAmount(currAmount);
            }
        };

        const unsubscribe = store.subscribe(onElementsAmountHandler);
        return () => {
            unsubscribe();
        };
    }, [elementsAmount, props.slide]);

    useEffect(() => {
        const onMouseDownHandler = (event: MouseEvent) => {
            const pressedOnSlide = refCanvas.current?.contains(event.target as Element);
            if (pressedOnSlide) {
                if (getActiveViewArea(store.getState().viewModel) !== 'MAIN_SLIDE') {
                    dispatchActiveViewAreaAction(dispatch)('MAIN_SLIDE');
                }
                const el = event.target as Element;
                const isSlideElement =
                    el.getAttribute('id') !== SLIDE_WHITE_AREA_ID &&
                    (el.tagName === 'rect' ||
                        el.tagName === 'ellipse' ||
                        el.tagName === 'polygon' ||
                        el.tagName === 'text');

                const elDomIndex = isSlideElement ? parseInt(el.getAttribute('id')!) : undefined;

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

    const onMouseDownResizeHandler = (mainEvent: React.MouseEvent) => {
        const chosenResizer = mainEvent.target as Element;
        const startX = mainEvent.pageX;
        const startY = mainEvent.pageY;

        const itsNResizer = chosenResizer.getAttribute('id')?.includes('n-');

        let newSelectedAreaLocation: AreaLocation | undefined;

        const mouseMoveReziseHandler = (e: MouseEvent) => {
            const dx = (e.pageX - startX) / renderScale.width;
            const dy = (e.pageY - startY) / renderScale.height;
            const maxD = Math.abs(dx) > Math.abs(dy) ? dx : dy;
            if (itsNResizer) {
                if (refCanvas.current && refCanvas.current.style.cursor !== N_RESIZER_ID) {
                    refCanvas.current.style.cursor = N_RESIZER_ID;
                }
                const currSelectedAreaLocation = selectedAreaLocation;
                if (currSelectedAreaLocation) {
                    const currY = currSelectedAreaLocation.xy.y;
                    const currHeight = currSelectedAreaLocation.dimensions.height;
                    const currMaxY = currY + currHeight;

                    newSelectedAreaLocation = {
                        ...currSelectedAreaLocation,
                        xy: {
                            x: currSelectedAreaLocation.xy.x,
                            y:
                                currSelectedAreaLocation.xy.y + dy <= currMaxY
                                    ? currSelectedAreaLocation.xy.y + dy
                                    : currMaxY,
                        },
                        dimensions: {
                            width: Math.abs(currSelectedAreaLocation.dimensions.width),
                            height: Math.abs(currSelectedAreaLocation.dimensions.height - dy),
                        },
                    };
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

    const [slideContainerRatio, setSlideContainerRatio] = useState(
        getSlideToContainerRatio(store.getState().viewModel),
    );
    const [windowRatio, setWindowRatio] = useState(getWindowRatio(store.getState().viewModel));

    const [resizersRenderInfo, setResizersRenderInfo] = useState(getResizersInfo(store.getState().viewModel));
    const resizersOffset = resizersRenderInfo.offset;
    const resizersSize = resizersRenderInfo.dimension;
    const renderScale = getElementsRenderRatio(store.getState().viewModel);
    const resizerRenderArr = getResizersRenderInfoArr(selectedAreaLocation, resizersSize, resizersOffset, renderScale);

    useDragAndDrop({
        element: refSelectedArea.current,
        position: selectedAreaLocation!,
        setPosition: setSelectedAreaLocation,
        scale: renderScale,
    });

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
    }, [slideContainerRatio, resizersRenderInfo, windowRatio]);

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
    selectedAreaLocation: AreaLocation | undefined,
    resizersSize: number,
    resizersOffset: number,
    renderScale: ElementsRatioType,
) {
    const scaledAreaLocation = {
        xy: {
            x: selectedAreaLocation ? selectedAreaLocation.xy.x * renderScale.width : 0,
            y: selectedAreaLocation ? selectedAreaLocation.xy.y * renderScale.height : 0,
        },
        dimensions: {
            width: selectedAreaLocation ? selectedAreaLocation.dimensions.width * renderScale.width : 0,
            height: selectedAreaLocation ? selectedAreaLocation.dimensions.height * renderScale.width : 0,
        },
    };
    const resizersCords = {
        xyStart: {
            x: scaledAreaLocation.xy.x - resizersOffset,
            y: scaledAreaLocation.xy.y - resizersOffset,
        },
        halfs: {
            width: (scaledAreaLocation.dimensions.width - resizersSize) / 2 + resizersOffset,
            height: (scaledAreaLocation.dimensions.height - resizersSize) / 2 + resizersOffset,
        },
        dimensions: {
            width: scaledAreaLocation.xy.x + scaledAreaLocation.dimensions.width - resizersSize + resizersOffset,
            height: scaledAreaLocation.xy.y + scaledAreaLocation.dimensions.height - resizersSize + resizersOffset,
        },
    };

    return [
        {
            id: NW_RESIZER_ID,
            x: resizersCords.xyStart.x,
            y: resizersCords.xyStart.y,
            className: styles[NW_RESIZER_ID],
        },
        {
            id: N_RESIZER_ID,
            x: resizersCords.xyStart.x + resizersCords.halfs.width,
            y: resizersCords.xyStart.y,
            className: styles[N_RESIZER_ID],
        },
        {
            id: NE_RESIZER_ID,
            x: resizersCords.dimensions.width,
            y: resizersCords.xyStart.y,
            className: styles[NE_RESIZER_ID],
        },
        {
            id: E_RESIZER_ID,
            x: resizersCords.dimensions.width,
            y: resizersCords.xyStart.y + resizersCords.halfs.height,
            className: styles[E_RESIZER_ID],
        },
        {
            id: SE_RESIZER_ID,
            x: resizersCords.dimensions.width,
            y: resizersCords.dimensions.height,
            className: styles[SE_RESIZER_ID],
        },
        {
            id: S_RESIZER_ID,
            x: resizersCords.xyStart.x + resizersCords.halfs.width,
            y: resizersCords.dimensions.height,
            className: styles[S_RESIZER_ID],
        },
        {
            id: SW_RESIZER_ID,
            x: resizersCords.xyStart.x,
            y: resizersCords.dimensions.height,
            className: styles[SW_RESIZER_ID],
        },
        {
            id: W_RESIZER_ID,
            x: resizersCords.xyStart.x,
            y: resizersCords.xyStart.y + resizersCords.halfs.height,
            className: styles[W_RESIZER_ID],
        },
    ];
}

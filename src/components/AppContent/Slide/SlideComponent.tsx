import styles from './SlideComponent.module.css';

import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { FigureElementComponent } from '../../SlideElements/FigureElements/FigureElementComponent';
import { getSlideElementType } from '../../../model/utils/tools';
import { PictureElementComponent } from '../../SlideElements/Picture/PictureElementComponent';
import { Coordinates, SelectedAreaLocation, Slide } from '../../../model/types';
import { TextElementComponent } from '../../SlideElements/Text/TextElementComponent';

import { LocaleContext } from '../../../App';

import { addSlide } from '../../../redux/action-creators/slideActionCreators';
import { bindActionCreators } from 'redux';
import { changeSelectedElementsPosition } from '../../../redux/action-creators/elementsActionCreators';
import { getActiveElementsIds, getElementsAreaLoaction, getElementsCoordinates } from '../../../model/elementActions';
import { getActiveSlidesIds, getCurrentSlide } from '../../../model/slidesActions';
import { keepModelAction, setSelectedIdInEditor } from '../../../redux/action-creators/editorActionCreators';
import { store } from '../../../redux/store';
import { useDispatch } from 'react-redux';
import { useDragAndDrop } from '../../utils/useDragAndDrop';

const VIEWBOX = {
    x_min: 0,
    y_min: 0,
    width: window.screen.width,
    height: window.screen.height,
};

type SlideProps = {
    slide: Slide | undefined;
    renderType: 'default' | 'mainSlide';
};

const RESIZE_AREA_WIDTH_HEIGHT = 15;
const OFFSET_FOR_REZIE_AREA = 3;

export const ScaleContext = createContext(VIEWBOX);

export function SlideComponent(props: SlideProps) {
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

    useDragAndDrop(refSelectedArea.current, selectedAreaLocation!, setSelectedAreaLocation);

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

    let elementIndex = 0;
    return props.slide === undefined ? (
        <div className={styles['empty-slide-container']} onClick={emptySlideClickHandler}>
            {localeContext.locale.localization['empty-slide-info']}
        </div>
    ) : (
        <ScaleContext.Provider value={VIEWBOX}>
            <svg
                ref={refCanvas}
                height={'100%'}
                className={styles['slide-container']}
                style={{ background: `${props.slide.background.color}` }}
                viewBox={`${Object.values(VIEWBOX).join(' ')}`}
                preserveAspectRatio={'xMinYMin meet'}
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
            >
                {props.slide !== undefined ? (
                    props.slide.elementsList.map((element) => {
                        elementIndex = elementIndex + 1;
                        switch (getSlideElementType(element.content)) {
                            case 'TEXT':
                                return (
                                    <TextElementComponent
                                        key={element.id}
                                        elementIndex={elementIndex}
                                        element={element}
                                    />
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
                            x={selectedAreaLocation.xy.x - OFFSET_FOR_REZIE_AREA}
                            y={selectedAreaLocation.xy.y - OFFSET_FOR_REZIE_AREA}
                            width={RESIZE_AREA_WIDTH_HEIGHT}
                            height={RESIZE_AREA_WIDTH_HEIGHT}
                            className={styles['resizer-nw']}
                            onMouseDown={onMouseDownResizeHandler}
                        />
                        <rect
                            id="resize-ne"
                            x={
                                selectedAreaLocation.xy.x +
                                selectedAreaLocation.dimensions.width -
                                RESIZE_AREA_WIDTH_HEIGHT +
                                OFFSET_FOR_REZIE_AREA
                            }
                            y={selectedAreaLocation.xy.y - OFFSET_FOR_REZIE_AREA}
                            width={RESIZE_AREA_WIDTH_HEIGHT}
                            height={RESIZE_AREA_WIDTH_HEIGHT}
                            className={styles['resizer-ne']}
                            onMouseDown={onMouseDownResizeHandler}
                        />
                        <rect
                            id="resize-se"
                            x={
                                selectedAreaLocation.xy.x +
                                selectedAreaLocation.dimensions.width -
                                RESIZE_AREA_WIDTH_HEIGHT +
                                OFFSET_FOR_REZIE_AREA
                            }
                            y={
                                selectedAreaLocation.xy.y +
                                selectedAreaLocation.dimensions.height -
                                RESIZE_AREA_WIDTH_HEIGHT +
                                OFFSET_FOR_REZIE_AREA
                            }
                            width={RESIZE_AREA_WIDTH_HEIGHT}
                            height={RESIZE_AREA_WIDTH_HEIGHT}
                            className={styles['resizer-se']}
                            onMouseDown={onMouseDownResizeHandler}
                        />
                        <rect
                            id="resize-sw"
                            x={selectedAreaLocation.xy.x - OFFSET_FOR_REZIE_AREA}
                            y={
                                selectedAreaLocation.xy.y +
                                selectedAreaLocation.dimensions.height -
                                RESIZE_AREA_WIDTH_HEIGHT +
                                OFFSET_FOR_REZIE_AREA
                            }
                            width={RESIZE_AREA_WIDTH_HEIGHT}
                            height={RESIZE_AREA_WIDTH_HEIGHT}
                            className={styles['resizer-sw']}
                            onMouseDown={onMouseDownResizeHandler}
                        />
                    </>
                ) : (
                    <></>
                )}
            </svg>
        </ScaleContext.Provider>
    );
}

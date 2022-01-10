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
import { getActiveElementsIds, getElementsAreaLoaction } from '../../../model/elementActions';
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
};

export const ScaleContext = createContext(VIEWBOX);

export function SlideComponent(props: SlideProps) {
    const refCanvas = useRef<SVGSVGElement>(null);
    const refSelectedArea = useRef<SVGRectElement>(null);

    const localeContext = useContext(LocaleContext);

    const dispatch = useDispatch();
    const dispatchAddSlideAction = bindActionCreators(addSlide, dispatch);
    const dispatchKeepModelAction = bindActionCreators(keepModelAction, dispatch);
    const dispatchSetIdAction = bindActionCreators(setSelectedIdInEditor, dispatch);
    const changeElementsPosition = bindActionCreators(changeSelectedElementsPosition, dispatch);

    const emptySlideClickHandler = () => {
        dispatchAddSlideAction();
        dispatchKeepModelAction();
    };

    const [isSlideActive, setSlideActiveStatus] = useState(false);
    const [selectedAreaLocation, setSelectedAreaLocation] = useState(undefined as SelectedAreaLocation | undefined);
    const [selectedAreaStartPoint, setSelectedAreaStartPoint] = useState(undefined as Coordinates | undefined);

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

                    setSelectedAreaLocation(selectedElementsArea);
                    setSelectedAreaStartPoint(selectedElementsArea.xy);
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

    useDragAndDrop(refSelectedArea.current, selectedAreaLocation!, setSelectedAreaLocation);

    useEffect(() => {
        if (selectedAreaLocation && selectedAreaStartPoint) {
            const dx = selectedAreaLocation.xy.x - selectedAreaStartPoint.x;
            const dy = selectedAreaLocation.xy.y - selectedAreaStartPoint.y;
            changeElementsPosition({ dx: dx, dy: dy });
        }
    }, [selectedAreaLocation]);

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
                {selectedAreaLocation !== undefined ? (
                    <rect
                        ref={refSelectedArea}
                        x={selectedAreaLocation.xy.x}
                        y={selectedAreaLocation.xy.y}
                        id={'select-area'}
                        className={styles['select-area']}
                        width={selectedAreaLocation.dimensions.width}
                        height={selectedAreaLocation.dimensions.height}
                    />
                ) : (
                    <></>
                )}
            </svg>
        </ScaleContext.Provider>
    );
}

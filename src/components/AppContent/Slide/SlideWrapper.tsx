import wrapperStyles from './SlideWrapper.module.css';

import { useLayoutEffect, useRef, useState } from 'react';
import { SlideComponent } from './SlideComponent';

import { getCurrentSlide } from '../../../app_model/model/slides_actions';
import { useDispatch } from 'react-redux';
import { store } from '../../../app_model/redux_model/store';

import { useResize } from '../../utils/useResize';
import { useSlideResize } from '../../utils/useSlideResize';

import {
    dispatchSetElementsRenderRatioAction,
    dispatchSlideContainerDimensions,
} from '../../../app_model/redux_model/dispatchers';
import { AreaLocation, Slide } from '../../../app_model/model/types';
import {
    getElementsRenderRatio,
    getSlideToContainerRatio,
    getWindowRatio,
} from '../../../app_model/view_model/slide_render_actions';
import { ElementsRatioType } from '../../../app_model/view_model/types';

export function SlideWrapper() {
    const ref = useRef<HTMLDivElement>(null);
    const [currSlide, changeCurrSlide] = useState(getCurrentSlide(store.getState().model) as Slide | undefined);
    const [currSlideId, changeCurrSlideId] = useState(
        getCurrentSlide(store.getState().model)?.id as string | undefined,
    );

    const dispatch = useDispatch();

    const handleChange = () => {
        const previousValue = currSlideId;
        const currSlide = getCurrentSlide(store.getState().model);
        if (currSlide !== undefined) {
            const currValue = currSlide.id;

            if (previousValue !== currValue) {
                changeCurrSlide(currSlide);
                changeCurrSlideId(currValue);
            }
        } else {
            changeCurrSlide(undefined);
            changeCurrSlideId(undefined);
        }
    };
    store.subscribe(handleChange);

    const [containerWidth, containerHeight] = useResize(ref);
    const [initWidth, setCurrWidth] = useState(0);
    const [initHeight, setCurrHeight] = useState(0);
    const maxSelectedAreaLocationInfo = useSlideResize(ref, currSlide);

    const renderScale = getElementsRenderRatio(store.getState().viewModel);
    const slideToContainerRatio = getSlideToContainerRatio(store.getState().viewModel);
    const windowRatio = getWindowRatio(store.getState().viewModel);

    const slideViewBox = getSlideViewBox(
        maxSelectedAreaLocationInfo,
        containerWidth,
        containerHeight,
        renderScale,
        slideToContainerRatio,
        windowRatio,
    );

    const emptySlideWidth = containerWidth ? containerWidth * getSlideToContainerRatio(store.getState().viewModel) : 0;
    const emptySlideHeight = emptySlideWidth / getWindowRatio(store.getState().viewModel);

    useLayoutEffect(() => {
        if (ref.current) {
            if (currSlide === undefined) {
                ref.current.style.alignItems = 'center';
                ref.current.style.justifyContent = 'center';
            } else {
                ref.current.style.alignItems = 'flex-start';
                ref.current.style.justifyContent = 'flex-start';
            }
        }

        if (initWidth === 0) {
            setCurrWidth(containerWidth);
        }
        if (initHeight === 0) {
            setCurrHeight(emptySlideHeight);
        }
        dispatchSetElementsRenderRatioAction(dispatch)({
            width: containerWidth / initWidth,
            height: emptySlideHeight / initHeight,
        });
        dispatchSlideContainerDimensions(dispatch)({ width: containerWidth, height: containerHeight });
    }, [dispatch, emptySlideHeight, containerHeight, containerWidth, currSlide, initHeight, initWidth]);

    return (
        <div ref={ref} className={wrapperStyles.wrapper}>
            <SlideComponent
                slide={currSlide}
                viewBox={{
                    x: slideViewBox.x,
                    y: slideViewBox.y,
                    width: slideViewBox.width,
                    height: slideViewBox.height,
                }}
                containerWidth={containerWidth}
                containerHeight={containerHeight}
                slideWidth={slideViewBox.width}
                slideHeight={slideViewBox.height}
            />
        </div>
    );
}

type ViewBoxType = {
    x: number;
    y: number;
    width: number;
    height: number;
};

function getSlideViewBox(
    maxSelectedElementsArea: AreaLocation | undefined,
    slideContainerWidth: number,
    slideContainerHeight: number,
    scale: ElementsRatioType,
    slideToContainerRatio: number,
    windowRatio: number,
): ViewBoxType {
    const contentMinX = maxSelectedElementsArea
        ? maxSelectedElementsArea.xy.x * scale.width * slideToContainerRatio
        : 0;
    const contentMinY = maxSelectedElementsArea
        ? maxSelectedElementsArea.xy.y * scale.height * (slideToContainerRatio / windowRatio)
        : 0;

    const contentMaxX = maxSelectedElementsArea
        ? (maxSelectedElementsArea.xy.x + maxSelectedElementsArea.dimensions.width) *
          scale.width *
          slideToContainerRatio
        : 0;
    const contentMaxY = maxSelectedElementsArea
        ? (maxSelectedElementsArea.xy.y + maxSelectedElementsArea.dimensions.height) *
          (scale.height / windowRatio)
        : 0;

    const containerMinX = -slideContainerWidth / 2;
    const containerMinY = -slideContainerHeight / 2;

    const possibleSlideWidth =
        contentMinX < containerMinX && contentMaxX < slideContainerWidth + containerMinX //only intersect on left-side
            ? slideContainerWidth + Math.abs(contentMinX) + containerMinX
            : contentMaxX > slideContainerWidth + containerMinX && contentMinX > containerMinX //only on right-side
            ? contentMaxX + slideContainerWidth + containerMinX
            : contentMinX < containerMinX && contentMaxX > slideContainerWidth + containerMinX //mixed
            ? contentMaxX - contentMinX
            : slideContainerWidth; //all in shape

    const possibleSlideHeight =
        contentMinY < containerMinY && contentMaxY < slideContainerHeight + containerMinY //same rules
            ? slideContainerHeight + Math.abs(contentMinY) + containerMinY
            : contentMaxY > slideContainerHeight + containerMinY && contentMinY > containerMinY
            ? contentMaxY + slideContainerHeight + containerMinY
            : contentMinY < containerMinY && contentMaxY > slideContainerHeight + containerMinY
            ? contentMaxY - contentMinY
            : slideContainerHeight;

    //these viewbox are need to move slide on negative side
    const viewBoxStartX =
        contentMinX < containerMinX ? contentMinX : contentMaxX > slideContainerWidth ? containerMinX : containerMinX;
    const viewBoxStartY =
        contentMinY < containerMinY ? contentMinY : contentMaxY > slideContainerHeight ? containerMinY : containerMinY;

    return {
        x: viewBoxStartX,
        y: viewBoxStartY,
        width: possibleSlideWidth,
        height: possibleSlideHeight,
    };
}

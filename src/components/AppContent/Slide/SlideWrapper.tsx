import wrapperStyles from './SlideWrapper.module.css';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { SlideComponent } from './SlideComponent';

import { store } from '../../../app_model/redux_model/store';
import { getCurrentSlide } from '../../../app_model/model/slides_actions';
import { SelectedAreaLocation, Slide } from '../../../app_model/model/types';
import { useResize } from '../../utils/useResize';
import { useSlideResize } from '../../utils/useSlideResize';

export function SlideWrapper() {
    const ref = useRef<HTMLDivElement>(null);
    const [currSlide, changeCurrSlide] = useState(getCurrentSlide(store.getState().model) as Slide | undefined);
    const [currSlideId, changeCurrSlideId] = useState(
        getCurrentSlide(store.getState().model)?.id as string | undefined,
    );

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
    const maxSelectedAreaLocationInfo = useSlideResize(ref, currSlide);

    const slideViewBox = getSlideViewBox(maxSelectedAreaLocationInfo, containerWidth, containerHeight);

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
    }, [currSlide]);

    return (
        <div ref={ref} className={wrapperStyles.wrapper}>
            <SlideComponent
                renderType="mainSlide"
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
    maxSelectedElementsArea: SelectedAreaLocation | undefined,
    slideContainerWidth: number,
    slideContainerHeight: number,
): ViewBoxType {
    const contentMinX = maxSelectedElementsArea ? maxSelectedElementsArea.xy.x : 0;
    const contentMinY = maxSelectedElementsArea ? maxSelectedElementsArea.xy.y : 0;

    const contentMaxX = maxSelectedElementsArea
        ? maxSelectedElementsArea.xy.x + maxSelectedElementsArea.dimensions.width
        : 0;
    const contentMaxY = maxSelectedElementsArea
        ? maxSelectedElementsArea.xy.y + maxSelectedElementsArea.dimensions.height
        : 0;

    const containerMinX = 0;
    const containerMinY = 0;

    const possibleSlideWidth =
        contentMinX < containerMinX && contentMaxX < slideContainerWidth
            ? slideContainerWidth + Math.abs(contentMinX)
            : contentMaxX > slideContainerWidth && contentMinX > containerMinX
            ? contentMaxX
            : contentMinX < containerMinX && contentMaxX > slideContainerWidth
            ? contentMaxX - contentMinX
            : slideContainerWidth;

    const possibleSlideHeight =
        contentMinY < containerMinY && contentMaxY < slideContainerHeight
            ? slideContainerHeight + Math.abs(contentMinY)
            : contentMaxY > slideContainerHeight && contentMinY > containerMinY
            ? contentMaxY
            : contentMinY < containerMinY && contentMaxY > slideContainerHeight
            ? contentMaxY - contentMinY
            : slideContainerHeight;

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

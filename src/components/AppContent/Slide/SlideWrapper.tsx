import wrapperStyles from './SlideWrapper.module.css';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { SlideComponent } from './SlideComponent';

import { store } from '../../../app_model/redux_model/store';
import { getCurrentSlide } from '../../../app_model/model/slides_actions';
import { Slide } from '../../../app_model/model/types';
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

    const contentMinX = maxSelectedAreaLocationInfo ? maxSelectedAreaLocationInfo.xy.x : 0;
    const contentMinY = maxSelectedAreaLocationInfo ? maxSelectedAreaLocationInfo.xy.y : 0;

    const contentMaxX = maxSelectedAreaLocationInfo
        ? maxSelectedAreaLocationInfo.xy.x + maxSelectedAreaLocationInfo.dimensions.width
        : 0;
    const contentMaxY = maxSelectedAreaLocationInfo
        ? maxSelectedAreaLocationInfo.xy.y + maxSelectedAreaLocationInfo.dimensions.height
        : 0;
    const contentWidth = contentMaxX - contentMinX;
    const contentHeight = contentMaxY - contentMinY;

    const containerMinX = 0;
    const containerMinY = 0;

    const possibleSlideWidth =
        contentMinX < containerMinX
            ? containerWidth + Math.abs(contentMinX)
            : contentMaxX > containerWidth
            ? contentMaxX
            : containerWidth;

    const possibleSlideHeight =
        contentMinY < containerMinY
            ? containerHeight + Math.abs(contentMinY)
            : contentMaxY > containerHeight
            ? contentMaxY
            : containerHeight;

    const viewBoxStartX =
        contentMinX < containerMinX ? contentMinX : contentMaxX > containerWidth ? containerMinX : containerMinX;
    const viewBoxStartY =
        contentMinY < containerMinY ? contentMinY : contentMaxY > containerHeight ? containerMinY : containerMinY;

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
                    xStart: viewBoxStartX,
                    yStart: viewBoxStartY,
                    width: containerWidth,
                    height: containerHeight,
                }}
                containerWidth={containerWidth}
                containerHeight={containerHeight}
                slideWidth={possibleSlideWidth}
                slideHeight={possibleSlideHeight}
            />
        </div>
    );
}

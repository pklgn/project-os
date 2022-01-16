import wrapperStyles from './SlideWrapper.module.css';

import { useEffect, useRef, useState } from 'react';
import { SlideComponent } from './SlideComponent';

import { store } from '../../../redux/store';
import { getCurrentSlide } from '../../../model/slidesActions';
import { Slide } from '../../../model/types';
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

    const containerMinX = 0;
    const containerMinY = 0;
    const possibleSlideWidth =
        contentMaxX > containerWidth ? contentMaxX - containerWidth : contentMinX < containerMinX ? contentMinX : 0;

    const possibleSlideHeight =
        contentMaxY > containerHeight ? contentMaxY - containerHeight : contentMinY < containerMinY ? contentMinY : 0;

    return (
        <div ref={ref} className={wrapperStyles.wrapper}>
            <SlideComponent
                renderType="mainSlide"
                slide={currSlide}
                viewBox={{
                    xStart: contentMinX > 0 ? 0 : contentMinX,
                    yStart: contentMinY > 0 ? 0 : contentMinY,
                    width: containerWidth + Math.abs(possibleSlideWidth),
                    height: containerHeight + Math.abs(possibleSlideHeight),
                }}
                containerWidth={containerWidth}
                containerHeight={containerHeight}
            />
        </div>
    );
}

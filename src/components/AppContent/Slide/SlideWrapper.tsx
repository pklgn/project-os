import styles from './Slide.module.css';
import wrapperStyles from './SlideWrapper.module.css';

import { useResize } from '../../utils/useResize';
import { useEffect, useRef, useState } from 'react';
import { SlideComponent } from './SlideComponent';

import { store } from '../../../redux/store';
import { getCurrentSlide } from '../../../model/slidesActions';
import { Slide } from '../../../model/types';

const SlideParams = {
    ASPECT_RATIO: 1.62,
    MAX_PAGE_HEIGHT_RATIO: 0.8,
};

export function SlideWrapper() {
    const ref = useRef<HTMLDivElement>(null);
    const [width] = useResize(ref);
    const maxHeight = SlideParams.MAX_PAGE_HEIGHT_RATIO * window.innerHeight;
    const [currSlide, changeCurrSlide] = useState(
        getCurrentSlide(store.getState().model) as Slide | undefined,
    );
    const [currSlideIndex, changeCurrSlideIndex] = useState(
        getCurrentSlide(store.getState().model)?.id as string | undefined,
    );

    useEffect(() => {
        const height = width / SlideParams.ASPECT_RATIO;
        if (ref.current) {
            ref.current.style.height = `${Math.min(height, maxHeight)}px`;

            if (Math.min(height, maxHeight) === maxHeight) {
                ref.current.style.maxWidth = `${
                    maxHeight * SlideParams.ASPECT_RATIO
                }px`;
            }
        }
    }, [ref, width, maxHeight]);

    const handleChange = () => {
        const previousValue = currSlideIndex;
        const currSlide = getCurrentSlide(store.getState().model);
        if (currSlide !== undefined) {
            const currValue = currSlide.id;

            if (previousValue !== currValue) {
                changeCurrSlide(currSlide);
                changeCurrSlideIndex(currValue);
            }
        } else {
            changeCurrSlide(undefined);
            changeCurrSlideIndex(undefined);
        }
    };
    store.subscribe(handleChange);

    return (
        <div className={wrapperStyles.wrapper}>
            <div className={styles.slide} ref={ref} inlist={'slide-list'}>
                <SlideComponent
                    id={`${parseInt(currSlideIndex!) + 1}`}
                    slide={currSlide}
                />
            </div>
        </div>
    );
}

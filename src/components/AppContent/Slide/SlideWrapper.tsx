import styles from "./Slide.module.css";
import wrapperStyles from "./SlideWrapper.module.css"

import { useResize } from "../../utils/useResize";
import { useEffect, useRef } from "react";
import { SlideComponent } from "./SlideComponent";

import { useSelector } from "react-redux";
import { RootState } from "../../../redux/reducers/rootReducer";

const SlideParams = {
    ASPECT_RATIO: 1.62,
    MAX_PAGE_HEIGHT_RATIO: 0.8,
}

export function SlideWrapper() {
    const state = useSelector((state: RootState) => state.model);

    const ref = useRef<HTMLDivElement>(null)
    const [width] = useResize(ref)
    const maxHeight = SlideParams.MAX_PAGE_HEIGHT_RATIO * window.innerHeight

    useEffect(() => {
        const height = width / SlideParams.ASPECT_RATIO
        if (ref.current) {
            ref.current.style.height = `${Math.min(height, maxHeight)}px`

            if (Math.min(height, maxHeight) === maxHeight) {
                ref.current.style.maxWidth = `${maxHeight * SlideParams.ASPECT_RATIO}px`
            }
        }
    }, [ref, width, maxHeight])

    const currSlideId = state.selectedSlidesIds.slice(-1)[0];
    const currSlideIndex =
        state.presentation.slidesList.findIndex(slide => slide.id === currSlideId);
    const currSlide = (currSlideIndex === -1)
        ? undefined
        : state.presentation.slidesList[currSlideIndex];

    return <div className={wrapperStyles.wrapper}>
        <div
            className={styles.slide}
            ref={ref}
            inlist={'slide-list'}
        >
            <SlideComponent id={`${currSlideIndex + 1}`} slide={currSlide} />
        </div>
    </div>
}
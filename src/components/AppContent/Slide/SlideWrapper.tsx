import styles from "./Slide.module.css";
import wrapperStyles from "./SlideWrapper.module.css"
import { useResize } from "../../utils/useResize";
import { useEffect, useRef } from "react";
import { SlideComponent } from "./SlideComponent";
import {mockSlide} from "../../../model/mock/mockSlide";

const SlideParams = {
    ASPECT_RATIO: 1.62,
    MAX_PAGE_HEIGHT_RATIO: 0.8,
}

export function SlideWrapper() {
    //TODO получать здесь через store данные для текущего отображаемого слайда
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

    return <div className={wrapperStyles.wrapper}>
            <div
            className={styles.slide}
            ref={ref}
        >
            <SlideComponent slide={mockSlide}/>
        </div>
    </div>
}
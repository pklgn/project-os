import styles from "./Slide.module.css";
import { useResize } from "../../utils/useResize";
import { useEffect, useRef } from "react";
import { SlideComponent } from "./SlideComponent";
import {mockSlide} from "../../../model/mock/mockSlide";

const SlideParams = {
    ASPECT_RATIO: 1.62,
    MAX_PAGE_HEIGHT: 0.8,
}

export function SlideWrapper() {
    //TODO получать здесь через store данные для текущего отображаемого слайда
    const ref = useRef<HTMLDivElement>(null)
    const [width] = useResize(ref)
    const maxHeight = SlideParams.MAX_PAGE_HEIGHT * window.innerHeight

    useEffect(() => {
        if (ref.current) {
            const height = width / SlideParams.ASPECT_RATIO
            ref.current.style.height = `${Math.min(height, maxHeight)}px`
        }
    }, [ref, width, maxHeight])

    return <div
        className={styles.slide}
        ref={ref}
    >
        <SlideComponent slide={mockSlide}/>
    </div>
}
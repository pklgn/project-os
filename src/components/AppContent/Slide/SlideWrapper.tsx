import styles from "./Slide.module.css";
import {useResize} from "../../utils/useResize";
import {useEffect, useRef} from "react";
import {Slide} from "./Slide";


const SlideParams = {
    ASPECT_RATIO: 1.62,
    MAX_PAGE_HEIGHT: 0.8,
}

export function SlideWrapper() {
    const ref = useRef<HTMLDivElement>(null)
    const [width] = useResize(ref)
    const maxHeight = SlideParams.MAX_PAGE_HEIGHT * window.innerHeight

    useEffect(() => {
        if (ref.current) {
            const height = width / SlideParams.ASPECT_RATIO
            ref.current.style.height = `${Math.min(height, maxHeight)}px`
        }
    }, [ref, width])

    return <div
        className={styles.slide}
        ref={ref}
    >
        <Slide/>
    </div>
}
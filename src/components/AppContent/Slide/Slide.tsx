import styles from "./Slide.module.css";
import {mockText} from "../../../model/mock/mockEditor"
import {TextElementComponent} from "../../PresentationElements/TextElementComponent";
import {useResize} from "../../utils/useResize";
import {useEffect, useLayoutEffect, useRef} from "react";

const SlideParams = {
    ASPECT_RATIO: 1.8,
    MAX_PAGE_HEIGHT: 0.8,
}

export function Slide() {
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
        <svg
            width="100%"
            height="100%"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
        >
            <rect
                width="100%"
                height="100%"
                fill="#ffffff"
                rx="0.4rem"
                ry="0.4rem"
            />
            <TextElementComponent key={mockText.id} element={mockText}/>
        </svg>
    </div>;
}
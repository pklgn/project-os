import styles from "./Slide.module.css";
import {mockText} from "../../../model/mock/mockEditor"
import {TextElementComponent} from "../../PresentationElements/TextElementComponent";
import {useRef} from "react";

const SLIDE_ASPECT_RATIO = 2.1

export function Slide() {
    const ref = useRef<HTMLDivElement>(null)

    if (ref.current) {
        const width = ref.current.clientWidth
        ref.current.style.height = `${width / SLIDE_ASPECT_RATIO}px`
    }

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
import styles from "./Slide.module.css";
import {TextElementComponent} from "../../PresentationElements/TextElementComponent";
import {mockText} from "../../../model/mock/mockEditor";
import {FigureElementComponent} from "../../PresentationElements/FigureElementComponent";
import {
    mockCircleFigureElement,
    mockRectangleFigureElement,
    mockTriangleFigureElement
} from "../../../model/mock/mockFigures";
import {useRef} from "react";

export function Slide() {
    const ref = useRef<SVGSVGElement>(null)
    const height = ref.current?.getBoundingClientRect().height ?? 100
    const scale = height / 100

    return <svg
        ref={ref}
        width={"100%"}
        height={"100%"}
        className={styles['slide-container']}
        viewBox={"0 0 162 100"}
        preserveAspectRatio={"xMinYMin meet"}
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        data-scale={scale}
    >
        <TextElementComponent key={mockText.id} element={mockText}/>
        <FigureElementComponent element={mockTriangleFigureElement}/>
        <FigureElementComponent element={mockRectangleFigureElement}/>
        <FigureElementComponent element={mockCircleFigureElement}/>
    </svg>
}
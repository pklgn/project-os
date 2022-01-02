import styles from "./Slide.module.css";
import {TextElementComponent} from "../../PresentationElements/TextElementComponent";
import {FigureElementComponent} from "../../PresentationElements/FigureElementComponent";
import {PictureElementComponent} from "../../PresentationElements/PictureElementComponent";
import {useRef} from "react";
import {Slide} from "../../../model/types";
import {getSlideElementType} from "../../../model/utils/tools";

type SlideProps = {
    id: string,
    slide: Slide | undefined,
}

export function SlideComponent(props: SlideProps) {
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
        id={props.id}
    >
        {
            (props.slide !== undefined)
            ? props.slide.elementsList.map((element) => {
                switch (getSlideElementType(element.content)) {
                    case 'TEXT':
                        return <TextElementComponent element={element}/>
                    case 'FIGURE':
                        return <FigureElementComponent element={element}/>
                    case "PICTURE":
                        return <PictureElementComponent element={element}/>
                }
            })
            : <></>
        }
    </svg>
}
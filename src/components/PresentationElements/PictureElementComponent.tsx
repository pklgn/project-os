import {PictureElement, SlideElement} from "../../model/types";
import {isPicture} from "../../model/utils/tools";
import {useRef} from "react";

type PictureElementProps = {
    element: SlideElement,
}

export function PictureElementComponent(props: PictureElementProps) {
    const ref = useRef(null)
    let element: PictureElement
    if (isPicture(props.element.content)) {
        element = props.element.content
    }
    else {
        return null;
    }

    return <img
        ref={ref}
        src={element.src}
        alt={element.alt}
    />
}
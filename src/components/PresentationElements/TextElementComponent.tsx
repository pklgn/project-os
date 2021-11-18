import {SlideElement, TextElement} from "../../model/types";
import {isText} from "../../model/utils/tools";
import styles from "./TextElementComponent.module.css"

type TextElementProps = {
    element: SlideElement,
};

function getElementContent(element: SlideElement): TextElement|undefined {
    let elementText: TextElement|undefined;

    if (isText(element.content)) {
        elementText = element.content
    }
    else {
        elementText = undefined
    }

    return elementText;
}

function TextElementComponent(props: TextElementProps) {
    const element: SlideElement = props.element;
    const elementText: TextElement|undefined = getElementContent(element);

    if(!elementText) {
        return null;
    }

    return <text
        className={styles.element}
        x={element.startPoint.x}
        y={element.startPoint.y}
        fontSize={`${elementText.fontSize}px`}
        textAnchor={'middle'}
    >
        {elementText.content}
    </text>
}

export {
    TextElementComponent,
}
import styles from './TextElementComponent.module.css';

import { isText } from '../../../model/utils/tools';
import { SlideElement, TextElement } from '../../../model/types';
import { useEffect, useRef } from 'react';
import { useDragAndDrop } from '../../utils/useDragAndDrop';

type TextElementProps = {
    element: SlideElement;
};

function getTextElementContent(element: SlideElement): TextElement | undefined {
    let elementText: TextElement | undefined;

    if (isText(element.content)) {
        elementText = element.content;
    } else {
        elementText = undefined;
    }

    return elementText;
}

function TextElementComponent(props: TextElementProps) {
    const element: SlideElement = props.element;
    const elementText: TextElement | undefined = getTextElementContent(element);
    const ref = useRef(null);

    if (!elementText) {
        return null;
    }

    return (
        <text
            ref={ref}
            className={styles.element}
            x={element.startPoint.x}
            y={element.startPoint.y}
            fontFamily={'Arial, Helvetica, sans-serif'}
            fontSize={elementText.fontSize}
            fontStyle={elementText.fontStyle}
            fill={elementText.fontColor}
            textAnchor={'middle'}
        >
            {elementText.content.map((line, index) => {
                return (
                    <tspan key={index} x={0} dy={elementText.fontSize * index}>
                        {line}
                    </tspan>
                );
            })}
        </text>
    );
}

export { TextElementComponent };

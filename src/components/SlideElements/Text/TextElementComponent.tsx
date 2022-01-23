import styles from './TextElementComponent.module.css';

import { isText } from '../../../app_model/model/utils/tools';
import { SlideElement, TextElement } from '../../../app_model/model/types';
import { store } from '../../../app_model/redux_model/store';
import {
    getElementsRenderRatio,
    getWindowRatio,
    getSlideToContainerRatio,
} from '../../../app_model/view_model/slide_render_actions';

type TextElementProps = {
    element: SlideElement;
    elementIndex: number;
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

    if (!elementText) {
        return null;
    }

    const renderScale = getElementsRenderRatio(store.getState().viewModel);
    const windowRatio = getWindowRatio(store.getState().viewModel);
    const slideToContainerRatio = getSlideToContainerRatio(store.getState().viewModel);

    return (
        <text
            id={`${props.elementIndex}`}
            className={styles.element}
            x={element.startPoint.x * renderScale.width * slideToContainerRatio}
            y={element.startPoint.y * renderScale.height * (slideToContainerRatio / windowRatio)}
            width={element.size.width * renderScale.width * slideToContainerRatio}
            height={element.size.height * renderScale.height * (slideToContainerRatio / windowRatio)}
            fontFamily={'Arial, Helvetica, sans-serif'}
            fontSize={elementText.fontSize}
            fontStyle={elementText.fontStyle}
            fill={elementText.fontColor}
        >
            {elementText.content.map((line, index) => {
                return (
                    <tspan key={index} x={element.startPoint.x} dy={elementText.fontSize}>
                        {line}
                    </tspan>
                );
            })}
        </text>
    );
}

export { TextElementComponent };

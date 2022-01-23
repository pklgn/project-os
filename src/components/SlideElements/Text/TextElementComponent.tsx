import styles from './TextElementComponent.module.css';

import { isText } from '../../../app_model/model/utils/tools';
import { SlideElement, TextElement } from '../../../app_model/model/types';

import { getElementsRenderRatio, getWindowRatio } from '../../../app_model/view_model/slide_render_actions';
import { store } from '../../../app_model/redux_model/store';
import { setChosenElementsType } from '../../../app_model/redux_model/actions_view_model/action_creators/chosen_elements_action_creator';
import { useDispatch } from 'react-redux';
import { setSelectedElementId } from '../../../app_model/model/editor_actions';

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
    const dispatch = useDispatch();
    const element: SlideElement = props.element;
    const elementText: TextElement | undefined = getTextElementContent(element);

    if (!elementText) {
        return null;
    }

    const renderScale = getElementsRenderRatio(store.getState().viewModel);
    const windowRatio = getWindowRatio(store.getState().viewModel);

    return (
        <>
            <text
                id={`${props.elementIndex}`}
                className={styles.element}
                x={element.startPoint.x * renderScale.width * windowRatio}
                y={element.startPoint.y * renderScale.height * windowRatio}
                fontFamily={'Arial, Helvetica, sans-serif'}
                fontSize={elementText.fontSize}
                fontStyle={elementText.fontStyle}
                fill={elementText.fontColor}
                //onClick{() => setSelectedElementId(store.getState().model, [element.id])}
                onDoubleClick={() => setChosenElementsType('TEXT')(dispatch)}
            >
                {elementText.content.map((line, index) => {
                    return (
                        <tspan key={index} x={element.startPoint.x} dy={elementText.fontSize}>
                            {line}
                        </tspan>
                    );
                })}
            </text>
        </>
    );
}

export { TextElementComponent };

import styles from './TextElementComponent.module.css';

import { isText } from '../../../app_model/model/utils/tools';
import { SlideElement, TextElement } from '../../../app_model/model/types';

import { getElementsRenderRatio } from '../../../app_model/view_model/slide_render_actions';
import { setChosenElementsType } from '../../../app_model/redux_model/actions_view_model/action_creators/chosen_elements_action_creator';
import { useDispatch } from 'react-redux';
import { setSelectedElementId } from '../../../app_model/model/editor_actions';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useResize } from '../../utils/useResize';
import { store } from '../../../app_model/redux_model/store';
import { dispatchSetElementsSizeAction } from '../../../app_model/redux_model/dispatchers';

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
    const textRef = useRef(null);
    const [width, height] = useResize(textRef);
    const [textWidth, setTextWidth] = useState(0);

    useEffect(() => {
        function handleDimensions(width: number, height: number) {
            dispatchSetElementsSizeAction(dispatch)({
                xy: element.startPoint,
                dimensions: {
                    width,
                    height,
                },
            });
        }
        handleDimensions(width, height);
        setTextWidth(width);
    }, [elementText, height, width, dispatch, textWidth]);

    if (!elementText) {
        return null;
    }

    const renderScale = getElementsRenderRatio(store.getState().viewModel);

    return (
        <>
            <text
                ref={textRef}
                id={`${props.elementIndex}`}
                className={styles.element}
                x={element.startPoint.x * renderScale.width}
                y={element.startPoint.y * renderScale.height}
                fontFamily={'Arial, Helvetica, sans-serif'}
                fontSize={elementText.fontSize}
                fontStyle={elementText.fontStyle}
                fill={elementText.fontColor}
                //onClick={() => setSelectedElementId(store.getState().model, [element.id])}
                onDoubleClick={() => {
                    setChosenElementsType('TEXT')(dispatch);
                    setSelectedElementId(store.getState().model, [element.id]);
                }}
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

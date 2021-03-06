import { LegacyRef, useLayoutEffect, useRef } from 'react';
import styles from './TextareaEditor.module.css';
import { bindActionCreators } from 'redux';
import { changeTextContent } from '../../app_model/redux_model/actions_model/action_creators/text_action_creators';
import { useDispatch } from 'react-redux';
import { store } from '../../app_model/redux_model/store';
import { getCurrentSlide } from '../../app_model/model/slides_actions';
import { FigureElement, PictureElement, SlideElement, TextElement } from '../../app_model/model/types';
import { isText } from '../../app_model/model/utils/tools';
import { keepModelAction } from '../../app_model/redux_model/actions_model/action_creators/editor_action_creators';

export type TextareaEditorProps = {
    textEditing: boolean;
    setTextEditing: (status: boolean) => void;
    slideRef: LegacyRef<HTMLDivElement> | null;
};

function TextareaEditor(props: TextareaEditorProps) {
    const dispatch = useDispatch();
    const ref = useRef<HTMLTextAreaElement>(null);
    const dispatchChangeTextContent = bindActionCreators(changeTextContent, dispatch);
    const dispatchKeepModelAction = bindActionCreators(keepModelAction, dispatch);

    const currSlide = getCurrentSlide(store.getState().model);
    const selectedElementsIds = store.getState().model.selectedSlideElementsIds;
    const slideTextElementId = selectedElementsIds[selectedElementsIds.length - 1];
    const textElement: SlideElement[] | undefined = currSlide?.elementsList.filter(
        (elem) => elem.id === slideTextElementId,
    );
    let text: TextElement | PictureElement | FigureElement;
    if (ref.current && textElement) {
        text = textElement[textElement.length - 1].content;
        if (isText(text)) {
            ref.current.value = text.content.join('\n');
        }
    }

    useLayoutEffect(() => {
        if (ref.current && textElement) {
            ref.current.style.top = `${textElement[textElement.length - 1].startPoint.y + 20}px`;
            ref.current.style.left = `${textElement[textElement.length - 1].startPoint.x + 20}px`;
            ref.current.style.height = `${ref.current?.scrollHeight}px`;
        }
    });

    if (props.textEditing) {
        return (
            <textarea
                autoFocus
                ref={ref}
                className={styles['textarea']}
                onBlur={() => {
                    props.setTextEditing(false);
                }}
                onInput={() => {
                    if (ref.current) {
                        ref.current.style.height = 'auto';
                        ref.current.style.height = `${ref.current?.scrollHeight}px`;
                    }
                    const currText = ref.current?.value ?? '';

                    dispatchChangeTextContent(currText.split('\n'));
                    dispatchKeepModelAction();
                }}
            />
        );
    } else {
        return null;
    }
}

export { TextareaEditor };

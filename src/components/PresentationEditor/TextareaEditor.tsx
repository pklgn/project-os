import { LegacyRef, useRef } from 'react';
import styles from './TextareaEditor.module.css';
import { bindActionCreators } from 'redux';
import { changeTextContent } from '../../redux/action-creators/textActionCreators';
import { useDispatch } from 'react-redux';
import { store } from '../../redux/store';
import { getCurrentSlide } from '../../model/slidesActions';
import { SlideElement } from '../../model/types';
import { isText } from '../../model/utils/tools';
import { keepModelAction } from '../../redux/action-creators/editorActionCreators';

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
    if (ref.current && textElement) {
        const text = textElement[textElement.length - 1].content;
        if (isText(text)) {
            ref.current.value = text.content.join('\n');
        }
        ref.current.style.height = `${ref.current?.scrollHeight}px`;
    }

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

import styles from './TextToolsList.module.css';

import { LocaleContext, LocaleContextType } from '../../../App';
import { useContext } from 'react';

import { Button } from '../../common/Button/Button';
import { VerticalLine } from '../../common/VerticalLine/VerticalLine';
import { listName } from '../../PresentationEditor/PresentationEditor';

import { bindActionCreators } from 'redux';
import { useDispatch } from 'react-redux';
import { undoModelAction, redoModelAction, keepModelAction } from '../../../redux/action-creators/editorActionCreators';
import { addText, changeTextsColor, changeTextContent } from '../../../redux/action-creators/textActionCreators';
import { AddText } from '../../common/icons/AddText/AddText';
import { Clear } from '../../common/icons/Cancel/Clear';
import { TextColor } from '../../common/icons/TextColor/TextColor';
import { ChangeText } from '../../common/icons/ChangeText/ChangeText';

type TextToolsListProps = {
    foo: (listName: listName) => void | undefined;
    textEditing: boolean;
    setTextEditing: (state: boolean) => void;
};

export function TextToolsList(props: TextToolsListProps): JSX.Element {
    const localeContext: LocaleContextType = useContext(LocaleContext);

    const elementListToolButton = () => props.foo(listName.ELEMENT_LIST);

    const dispatch = useDispatch();
    const dispatchKeepModelAction = bindActionCreators(keepModelAction, dispatch);
    const dispatchSetPreviousModelStateAction = bindActionCreators(undoModelAction, dispatch);
    const dispatchTurnBackModelStateAction = bindActionCreators(redoModelAction, dispatch);
    const dispatchAddTextAction = bindActionCreators(addText, dispatch);
    const dispatchChangeTextColor = bindActionCreators(changeTextsColor, dispatch);
    const dispatchChangeTextContent = bindActionCreators(changeTextContent, dispatch);

    const undoPressButtonHandler = () => {
        dispatchSetPreviousModelStateAction();
    };

    const redoButtonPressHandler = () => {
        dispatchTurnBackModelStateAction();
    };

    const addTextHandler = () => {
        props.setTextEditing(true);
        dispatchAddTextAction({ x: 0, y: 0 });
        dispatchKeepModelAction();
    };

    const changeTextColorHandler = () => {
        dispatchChangeTextColor('black');
        dispatchKeepModelAction();
    };

    const changeTextContentHandler = () => {
        dispatchChangeTextContent(['']);
        dispatchKeepModelAction();
    };

    document.addEventListener('keydown', function (event) {
        if (event.code == 'KeyZ' && (event.ctrlKey || event.metaKey)) {
            undoPressButtonHandler();
        }
        if (event.code == 'KeyY' && (event.ctrlKey || event.metaKey)) {
            redoButtonPressHandler();
        }
    });

    return (
        <div className={styles['element-tools']}>
            <Button
                text={localeContext.locale.localization.add_word}
                state="disabled"
                shouldStopPropagation={false}
                contentType="icon"
                content={{ hotkeyInfo: '', icon: <AddText /> }}
                foo={addTextHandler}
            />
            <VerticalLine />
            <Button
                text={localeContext.locale.localization.change_text}
                state="disabled"
                shouldStopPropagation={false}
                contentType="icon"
                content={{ hotkeyInfo: '', icon: <ChangeText /> }}
                foo={changeTextContentHandler}
            />
            <VerticalLine />
            <Button
                text={localeContext.locale.localization['change-color']}
                state="disabled"
                shouldStopPropagation={false}
                contentType="icon"
                content={{ hotkeyInfo: '', icon: <TextColor /> }}
                foo={changeTextColorHandler}
            />
            <VerticalLine />
            <Button
                text={localeContext.locale.localization.delete_word}
                state="disabled"
                shouldStopPropagation={false}
                contentType="icon"
                content={{ hotkeyInfo: '', icon: <Clear /> }}
                foo={elementListToolButton}
            />
        </div>
    );
}

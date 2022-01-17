import styles from './TextToolsList.module.css';

import { LocaleContext, LocaleContextType } from '../../../App';
import { BaseSyntheticEvent, useContext, useEffect, useState } from 'react';

import { Button } from '../../common/Button/Button';
import { VerticalLine } from '../../common/VerticalLine/VerticalLine';
import { listName } from '../../PresentationEditor/PresentationEditor';

import { bindActionCreators } from 'redux';
import { useDispatch } from 'react-redux';
import {
    undoModelAction,
    redoModelAction,
    keepModelAction,
} from '../../../app_model/redux_model/actions_model/action_creators/editor_action_creators';
import {
    addText,
    changeTextsColor,
    changeTextContent,
} from '../../../app_model/redux_model/actions_model/action_creators/text_action_creators';
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

    const [query, setQuery] = useState('Введите текст');
    const inputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const enteredName = event.target.value;
        setQuery(enteredName);
    };

    const dispatch = useDispatch();
    const dispatchKeepModelAction = bindActionCreators(keepModelAction, dispatch);
    const dispatchAddTextAction = bindActionCreators(addText, dispatch);
    const dispatchChangeTextColor = bindActionCreators(changeTextsColor, dispatch);
    const dispatchChangeTextContent = bindActionCreators(changeTextContent, dispatch);

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

    useEffect(() => {
        const revocationHandler = (event: KeyboardEvent) => {
            if (event.code === 'Escape') {
                elementListToolButton();
            }
        };
        document.addEventListener('keydown', revocationHandler);

        return () => {
            document.removeEventListener('keydown', revocationHandler);
        };
    }, []);

    return (
        <div className={styles['element-tools']}>
            {/* <Button
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
            <input
                value={query}
                onChange={inputHandler}
                onClick={(e: React.MouseEvent<HTMLInputElement>) => e.stopPropagation()}
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
            /> */}
        </div>
    );
}

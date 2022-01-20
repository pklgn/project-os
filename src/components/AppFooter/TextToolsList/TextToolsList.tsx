import styles from './TextToolsList.module.css';

import { LocaleContext, LocaleContextType } from '../../../App';
import { useContext, useEffect, useState } from 'react';

import { Button, ButtonProps } from '../../common/Button/Button';
import { bindActionCreators } from 'redux';
import { useDispatch } from 'react-redux';
import { keepModelAction } from '../../../app_model/redux_model/actions_model/action_creators/editor_action_creators';
import {
    changeTextsColor,
    changeTextContent,
} from '../../../app_model/redux_model/actions_model/action_creators/text_action_creators';
import { AddText } from '../../common/icons/AddText/AddText';
import { Clear } from '../../common/icons/Cancel/Clear';
import { TextColor } from '../../common/icons/TextColor/TextColor';
import { ChangeText } from '../../common/icons/ChangeText/ChangeText';
import ToolTip from '../../common/ToolTip/ToolTip';
import { generateUUId } from '../../../app_model/model/utils/uuid';
import { SetChosenElementsType } from '../../../app_model/view_model/chosen_elements_action';
import { store } from '../../../app_model/redux_model/store';
import { Opacity } from '../../common/icons/Opacity/Opacity';

export function TextToolsList(): JSX.Element {
    const localeContext: LocaleContextType = useContext(LocaleContext);

    const [query, setQuery] = useState('Введите текст');
    const inputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const enteredName = event.target.value;
        setQuery(enteredName);
    };

    const dispatch = useDispatch();
    const dispatchKeepModelAction = bindActionCreators(keepModelAction, dispatch);
    const dispatchChangeTextColor = bindActionCreators(changeTextsColor, dispatch);
    const dispatchChangeTextContent = bindActionCreators(changeTextContent, dispatch);
    const dispatchNoneChosenElements = bindActionCreators(SetChosenElementsType, dispatch);

    const changeTextColorHandler = () => {
        dispatchChangeTextColor('black');
        dispatchKeepModelAction();
    };

    const changeTextContentHandler = () => {
        dispatchChangeTextContent(['']);
        dispatchKeepModelAction();
    };

    const noneChosenElementsHandler = () => {
        dispatchNoneChosenElements(store.getState().viewModel, 'NONE');
    };

    useEffect(() => {
        const revocationHandler = (event: KeyboardEvent) => {
            if (event.code === 'Escape') {
                noneChosenElementsHandler();
            }
        };
        document.addEventListener('keydown', revocationHandler);

        return () => {
            document.removeEventListener('keydown', revocationHandler);
        };
    }, []);

    const textToolsButtonInfo: ButtonProps[] = [
        {
            text: localeContext.locale.localization.elementsListTool.cursorTool,
            id: 'select-tool-button',
            iconLeft: <ChangeText />,
        },
        {
            text: localeContext.locale.localization.elementsListTool.textTool,
            id: 'text-tool-button',
            iconLeft: <TextColor />,
        },
        {
            text: localeContext.locale.localization.elementsListTool.textTool,
            id: '',
            iconLeft: <Opacity />,
        },
    ];

    return (
        <div className={styles['text-tools']}>
            {textToolsButtonInfo.map((buttonInfo) => {
                return (
                    <ToolTip
                        key={generateUUId()}
                        title={buttonInfo.text ? buttonInfo.text : 'None'}
                        position="above"
                        child={
                            <Button
                                key={generateUUId()}
                                type={buttonInfo.type}
                                state={buttonInfo.state}
                                id={buttonInfo.id}
                                iconLeft={buttonInfo.iconLeft}
                                onClick={buttonInfo.onClick}
                            />
                        }
                    />
                );
            })}
        </div>
    );
}

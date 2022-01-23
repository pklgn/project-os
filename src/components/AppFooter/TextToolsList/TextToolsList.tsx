import styles from './TextToolsList.module.css';

import { LocaleContext, LocaleContextType } from '../../../App';
import { useContext, useEffect, useState } from 'react';

import { Button, ButtonProps } from '../../common/Button/Button';
import { useDispatch } from 'react-redux';
import { Clear } from '../../common/icons/Cancel/Clear';
import { TextColor } from '../../common/icons/TextColor/TextColor';
import { ChangeText } from '../../common/icons/ChangeText/ChangeText';
import ToolTip from '../../common/ToolTip/ToolTip';
import { store } from '../../../app_model/redux_model/store';
import { Opacity } from '../../common/icons/Opacity/Opacity';
import { Reorder } from '../../common/icons/Reorder/Reorder';
import { DeleteElement } from '../../common/icons/DeleteElement/DeleteElement';
import { dispatchKeepModelAction } from '../../../app_model/redux_model/dispatchers';
// import {
//     dispatchChangeTextContentAction,
//     dispatchChangeTextsColorAction,
// } from '../../../app_model/redux_model/dispatchers';
// import { dispatchSetChosenElementsTypeAction } from '../../../app_model/redux_model/dispatchers';
import { ReorderToolsList } from '../ReorderToolsList/ReorderToolsList';
// import { dispatchRemoveSelectedElementsAction } from '../../../app_model/redux_model/dispatchers';

enum commonList {
    DEFAULT = 'DEFAULT',
    REORDER = 'REORDER',
    OPACITY = 'OPACITY',
}

export function TextToolsList(): JSX.Element {
    const localeContext: LocaleContextType = useContext(LocaleContext);

    const [listSwitcher, setListSwitcher] = useState(commonList.DEFAULT);
    const [query, setQuery] = useState('Введите текст');
    const inputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const enteredName = event.target.value;
        setQuery(enteredName);
    };

    const dispatch = useDispatch();

    const reorderHandler = () => {
        setListSwitcher(commonList.REORDER);
    };

    const opacityHandler = () => {
        setListSwitcher(commonList.OPACITY);
    };

    const removeSelectedElementsHandler = () => {
        // dispatchRemoveSelectedElementsAction(dispatch)();
        dispatchKeepModelAction(dispatch)();
    };

    const callbackHandler = () => {
        setListSwitcher(commonList.DEFAULT);
    };

    const changeTextColorHandler = () => {
        // dispatchChangeTextsColorAction(dispatch)('black');
        dispatchKeepModelAction(dispatch)();
    };

    const changeTextContentHandler = () => {
        // dispatchChangeTextContentAction(dispatch)(['plplpl']);
        dispatchKeepModelAction(dispatch)();
    };

    const noneChosenElementsHandler = () => {
        // dispatchSetChosenElementsTypeAction(dispatch)('NONE');
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

    const uniqueTextToolsButtonInfo: ButtonProps[] = [
        {
            text: localeContext.locale.localization.elementsListTool.cursorTool,
            id: 'select-tool-button',
            iconLeft: <ChangeText />,
            onMouseUp: changeTextContentHandler,
        },
        {
            text: localeContext.locale.localization.elementsListTool.textTool,
            id: 'text-tool-button',
            iconLeft: <TextColor />,
            onMouseUp: changeTextColorHandler,
        },
    ];

    const defaultToolsButtonInfo: ButtonProps[] = [
        {
            text: localeContext.locale.localization.elementsListTool.cursorTool,
            id: 'select-tool-button',
            iconLeft: <Reorder />,
            onClick: reorderHandler,
        },
        {
            text: localeContext.locale.localization.elementsListTool.textTool,
            id: 'text-tool-button',
            iconLeft: <Opacity />,
            onClick: opacityHandler,
        },
        {
            text: localeContext.locale.localization.elementsListTool.geometryTool,
            id: 'geometry-tool-button',
            iconLeft: <DeleteElement />,
            onClick: removeSelectedElementsHandler,
        },
    ];

    const textToolsButtonInfo: ButtonProps[] = [...uniqueTextToolsButtonInfo, ...defaultToolsButtonInfo];

    return (
        <div className={styles['text-tools']}>
            {(() => {
                switch (listSwitcher) {
                    case commonList.DEFAULT:
                        return textToolsButtonInfo.map((buttonInfo, index) => {
                            return (
                                <ToolTip
                                    key={index}
                                    title={buttonInfo.text ? buttonInfo.text : 'None'}
                                    position="above"
                                    child={
                                        <Button
                                            key={index}
                                            type={buttonInfo.type}
                                            state={buttonInfo.state}
                                            id={buttonInfo.id}
                                            iconLeft={buttonInfo.iconLeft}
                                            onClick={buttonInfo.onClick}
                                        />
                                    }
                                />
                            );
                        });
                    case commonList.REORDER:
                        return <ReorderToolsList setListSwitcher={callbackHandler} />;
                }
            })()}
        </div>
    );
}

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
import { dispatchKeepModelAction } from '../../../app_model/redux_model/historyDispatchers';
import {
    dispatchChangeTextContentAction,
    dispatchChangeTextsColorAction,
} from '../../../app_model/redux_model/textDispatchers';
import { dispatchSetChosenElementsTypeAction } from '../../../app_model/redux_model/chosenElementsDispatchers';
import { ReorderToolsList } from '../ReorderToolsList/ReorderToolsList';
import { dispatchRemoveSelectedElementsAction } from '../../../app_model/redux_model/elementDispatchers';
import { l18nType } from '../../../l18n/l18n';

enum commonList {
    DEFAULT = 'DEFAULT',
    REORDER = 'REORDER',
    OPACITY = 'OPACITY',
}

export function TextToolsList(): JSX.Element {
    const localeContext: LocaleContextType = useContext(LocaleContext);

    const [listSwitcher, setListSwitcher] = useState(commonList.DEFAULT);

    const dispatch = useDispatch();

    const reorderHandler = () => {
        setListSwitcher(commonList.REORDER);
    };

    const opacityHandler = () => {
        setListSwitcher(commonList.OPACITY);
    };

    const removeSelectedElementsHandler = () => {
        dispatchRemoveSelectedElementsAction(dispatch)();
        dispatchKeepModelAction(dispatch)();
    };

    const callbackHandler = () => {
        setListSwitcher(commonList.DEFAULT);
    };

    const changeTextColorHandler = () => {
        dispatchChangeTextsColorAction(dispatch)('black');
        dispatchKeepModelAction(dispatch)();
    };

    const noneChosenElementsHandler = () => {
        dispatchSetChosenElementsTypeAction(dispatch)('NONE');
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
            text: localeContext.locale.localization.elementsListTool.textTool,
            id: 'text-tool-button',
            iconLeft: <TextColor />,
            onClick: changeTextColorHandler,
        },
    ];

    return (
        <>
            {(() => {
                switch (listSwitcher) {
                    case commonList.DEFAULT:
                        return uniqueTextToolsButtonInfo.map((buttonInfo, index) => {
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
        </>
    );
}

import styles from './FigureToolsList.module.css';

import { LocaleContext, LocaleContextType } from '../../../App';
import React, { useContext, useEffect, useState } from 'react';

import { Button, ButtonProps } from '../../common/Button/Button';

import { useDispatch } from 'react-redux';
import { Reorder } from '../../common/icons/Reorder/Reorder';
import { Opacity } from '../../common/icons/Opacity/Opacity';
import { DeleteElement } from '../../common/icons/DeleteElement/DeleteElement';
import ToolTip from '../../common/ToolTip/ToolTip';
// import { dispatchRemoveSelectedElementsAction } from '../../../app_model/redux_model/dispatchers/elementDispatchers';
import { dispatchKeepModelAction } from '../../../app_model/redux_model/dispatchers';
import { ReorderToolsList } from '../ReorderToolsList/ReorderToolsList';

enum commonList {
    DEFAULT = 'DEFAULT',
    REORDER = 'REORDER',
    OPACITY = 'OPACITY',
}

export function FigureToolsList(): JSX.Element {
    const localeContext: LocaleContextType = useContext(LocaleContext);

    const dispatch = useDispatch();
    const [listSwitcher, setListSwitcher] = useState(commonList.DEFAULT);

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

    const uniqueFigureToolsButtonInfo: ButtonProps[] = [
        {
            text: localeContext.locale.localization.elementsListTool.cursorTool,
            id: 'select-tool-button',
            iconLeft: <Reorder />,
        },
        {
            text: localeContext.locale.localization.elementsListTool.textTool,
            id: 'text-tool-button',
            iconLeft: <Opacity />,
        },
        {
            text: localeContext.locale.localization.elementsListTool.geometryTool,
            id: 'geometry-tool-button',
            iconLeft: <DeleteElement />,
        },
    ];

    const figureToolsButtonInfo: ButtonProps[] = [...uniqueFigureToolsButtonInfo, ...defaultToolsButtonInfo];

    return (
        <div className={styles['text-tools']}>
            {(() => {
                switch (listSwitcher) {
                    case commonList.DEFAULT:
                        return figureToolsButtonInfo.map((buttonInfo, index) => {
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

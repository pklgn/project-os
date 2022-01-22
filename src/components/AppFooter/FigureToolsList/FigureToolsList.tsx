import styles from './FigureToolsList.module.css';

import { LocaleContext, LocaleContextType } from '../../../App';
import React, { useContext, useEffect, useState } from 'react';

import { Button, ButtonProps } from '../../common/Button/Button';

import { useDispatch } from 'react-redux';
import { Clear } from '../../common/icons/Cancel/Clear';
import { Reorder } from '../../common/icons/Reorder/Reorder';
import { Opacity } from '../../common/icons/Opacity/Opacity';
import { DeleteElement } from '../../common/icons/DeleteElement/DeleteElement';
import ToolTip from '../../common/ToolTip/ToolTip';
import { dispatchRemoveSelectedElementsAction } from '../../../app_model/redux_model/elementDispatchers';
import { dispatchKeepModelAction } from '../../../app_model/redux_model/historyDispatchers';

export function FigureToolsList(): JSX.Element {
    const localeContext: LocaleContextType = useContext(LocaleContext);

    const dispatch = useDispatch();
    // const dispatchSetPreviousModelStateAction = bindActionCreators(undoModelAction, dispatch);
    // const dispatchTurnBackModelStateAction = bindActionCreators(redoModelAction, dispatch);
    // const dispatchNoneChosenElements = bindActionCreators(setChosenElementsType, dispatch);

    // const undoPressButtonHandler = () => {
    //     dispatchSetPreviousModelStateAction();
    // };

    // const redoButtonPressHandler = () => {
    //     dispatchTurnBackModelStateAction();
    // };

    // const NoneChosenElements = () => {
    //     dispatchNoneChosenElements(store.getState().viewModel, 'NONE');
    // };

    // useEffect(() => {
    //     const historyActionsHandler = (event: KeyboardEvent) => {
    //         if (event.code == 'KeyZ' && event.ctrlKey) {
    //             undoPressButtonHandler();
    //         }
    //         if (event.code == 'KeyY' && event.ctrlKey) {
    //             redoButtonPressHandler();
    //         }
    //     };

    //     const revocationHandler = (event: KeyboardEvent) => {
    //         if (event.code === 'Escape') {
    //             NoneChosenElements();
    //         }
    //     };

    //     document.addEventListener('keydown', historyActionsHandler);
    //     document.addEventListener('keydown', revocationHandler);

    //     return () => {
    //         document.removeEventListener('keydown', historyActionsHandler);
    //         document.removeEventListener('keydown', revocationHandler);
    //     };
    // }, [undoPressButtonHandler]);

    const removeSelectedElementsHandler = () => {
        dispatchRemoveSelectedElementsAction(dispatch)();
        dispatchKeepModelAction(dispatch)();
    };

    const defaultToolsButtonInfo: ButtonProps[] = [
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
            onMouseUp: removeSelectedElementsHandler,
        },
    ];

    return (
        <div className={styles['text-tools']}>
            {defaultToolsButtonInfo.map((buttonInfo, index) => {
                return (
                    <ToolTip
                        key={index}
                        id={`${buttonInfo.id}`}
                        title={buttonInfo.text ? buttonInfo.text : 'None'}
                        position="above"
                        child={
                            <Button
                                key={index}
                                type={buttonInfo.type}
                                state={buttonInfo.state}
                                id={buttonInfo.id}
                                iconLeft={buttonInfo.iconLeft}
                                onMouseUp={buttonInfo.onMouseUp}
                            />
                        }
                    />
                );
            })}
        </div>
    );
}

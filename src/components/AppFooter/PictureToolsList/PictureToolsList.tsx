import styles from './PictureToolsList.module.css';

import { LocaleContext, LocaleContextType } from '../../../App';
import React, { useContext, useEffect, useState } from 'react';

import { Button } from '../../common/Button/Button';

import { bindActionCreators } from 'redux';

import {
    undoModelAction,
    redoModelAction,
    keepModelAction,
} from '../../../app_model/redux_model/actions_model/action_creators/editor_action_creators';
import { useDispatch } from 'react-redux';
import { Clear } from '../../common/icons/Cancel/Clear';
import { setChosenElementsType } from '../../../app_model/view_model/chosen_elements_action';
import { store } from '../../../app_model/redux_model/store';
import { dispatchRedoAction, dispatchUndoAction } from '../../../app_model/redux_model/historyDispatchers';

export function FigureToolsList(): JSX.Element {
    const localeContext: LocaleContextType = useContext(LocaleContext);

    const dispatch = useDispatch();
    const dispatchSetPreviousModelStateAction = bindActionCreators(undoModelAction, dispatch);
    const dispatchNoneChosenElements = bindActionCreators(setChosenElementsType, dispatch);

    const undoPressButtonHandler = () => {
        dispatchSetPreviousModelStateAction();
    };

    const NoneChosenElements = () => {
        dispatchNoneChosenElements(store.getState().viewModel, 'NONE');
    };

    useEffect(() => {
        const historyActionsHandler = (event: KeyboardEvent) => {
            if (event.code == 'KeyZ' && event.ctrlKey) {
                dispatchUndoAction(dispatch)();
            }
            if (event.code == 'KeyY' && event.ctrlKey) {
                dispatchRedoAction(dispatch)();
            }
        };

        const revocationHandler = (event: KeyboardEvent) => {
            if (event.code === 'Escape') {
                NoneChosenElements();
            }
        };

        document.addEventListener('keydown', historyActionsHandler);
        document.addEventListener('keydown', revocationHandler);

        return () => {
            document.removeEventListener('keydown', historyActionsHandler);
            document.removeEventListener('keydown', revocationHandler);
        };
    }, [undoPressButtonHandler]);

    return (
        <div className={styles['figure-tools']}>
            {/* <Button
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

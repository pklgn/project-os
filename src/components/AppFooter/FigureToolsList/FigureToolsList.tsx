import styles from './FigureToolsList.module.css';

import { LocaleContext, LocaleContextType } from '../../../App';
import React, { useContext, useEffect, useState } from 'react';

import { Button } from '../../common/Button/Button';
import { listName } from '../../PresentationEditor/PresentationEditor';

import { bindActionCreators } from 'redux';

import { undoModelAction, redoModelAction, keepModelAction } from '../../../redux/action-creators/editorActionCreators';
import { useDispatch } from 'react-redux';
import { Clear } from '../../common/icons/Cancel/Clear';

type FigureToolsListProps = {
    foo: (listName: listName) => void | undefined;
    active: boolean;
    setActive: React.Dispatch<React.SetStateAction<boolean>>;
};

export function FigureToolsList(props: FigureToolsListProps): JSX.Element {
    const localeContext: LocaleContextType = useContext(LocaleContext);

    const elementListToolButton = () => props.foo(listName.ELEMENT_LIST);

    const dispatch = useDispatch();
    const dispatchSetPreviousModelStateAction = bindActionCreators(undoModelAction, dispatch);
    const dispatchTurnBackModelStateAction = bindActionCreators(redoModelAction, dispatch);

    const undoPressButtonHandler = () => {
        dispatchSetPreviousModelStateAction();
    };

    const redoButtonPressHandler = () => {
        dispatchTurnBackModelStateAction();
    };

    useEffect(() => {
        const historyActionsHandler = (event: KeyboardEvent) => {
            if (event.code == 'KeyZ' && event.ctrlKey) {
                undoPressButtonHandler();
            }
            if (event.code == 'KeyY' && event.ctrlKey) {
                redoButtonPressHandler();
            }
        };

        const revocationHandler = (event: KeyboardEvent) => {
            if (event.code === 'Escape') {
                elementListToolButton();
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
        <div className={styles['element-tools']}>
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

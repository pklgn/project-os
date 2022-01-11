import styles from './ElementListTool.module.css';

import { LocaleContext, LocaleContextType } from '../../../App';
import React, { BaseSyntheticEvent, useContext, useEffect, useState } from 'react';

import { Button } from '../../common/Button/Button';
import { Delete } from '../../common/icons/Delete/Delete';
import { Opacity } from '../../common/icons/Opacity/Opacity';
import { Redo } from '../../common/icons/Redo/Redo';
import { Reorder } from '../../common/icons/Reorder/Reorder';
import { VerticalLine } from '../../common/VerticalLine/VerticalLine';
import { Undo } from '../../common/icons/Undo/Undo';
import { listName } from '../../PresentationEditor/PresentationEditor';

import { bindActionCreators } from 'redux';
import { changeSlidesBackground } from '../../../redux/action-creators/slideActionCreators';
import { changeFiguresColor } from '../../../redux/action-creators/figureActionCreators';
import { getActiveElementsIds } from '../../../model/elementActions';
import { removeSelectedElements } from '../../../redux/action-creators/elementsActionCreators';
import { store } from '../../../redux/store';
import { undoModelAction, redoModelAction, keepModelAction } from '../../../redux/action-creators/editorActionCreators';
import { useDispatch } from 'react-redux';
import { TextTools } from '../../common/icons/TextTools/TextTools';
import { Fullscreen } from '../../common/icons/Fullscreen/Fullscreen';
import { AddFigure } from '../../common/icons/AddFigure/AddFigure';

type ElementListToolProps = {
    foo: (listName: listName) => void | undefined;
};

export function ElementListTool(props: ElementListToolProps): JSX.Element {
    const localeContext: LocaleContextType = useContext(LocaleContext);

    const reorderListButton = () => props.foo(listName.REORDER_LIST);
    const textToolsListButton = () => props.foo(listName.TEXT_TOOLS_LIST_BUTTON);
    const figureToolsListButton = () => props.foo(listName.FIGURE_TOOLS_LIST_BUTTON);

    const dispatch = useDispatch();
    const dispatchKeepModelAction = bindActionCreators(keepModelAction, dispatch);
    const dispatchRemoveSelectedElementsAction = bindActionCreators(removeSelectedElements, dispatch);
    const dispatchSetPreviousModelStateAction = bindActionCreators(undoModelAction, dispatch);
    const dispatchSetElementsColorAction = bindActionCreators(changeFiguresColor, dispatch);
    const dispatchSetSlideBackgroundColorAction = bindActionCreators(changeSlidesBackground, dispatch);
    const dispatchTurnBackModelStateAction = bindActionCreators(redoModelAction, dispatch);

    const undoPressButtonHandler = () => {
        dispatchSetPreviousModelStateAction();
    };

    const redoButtonPressHandler = () => {
        dispatchTurnBackModelStateAction();
    };

    const [timeOuted, setTimeOuted] = useState(false);

    useEffect(() => {
        const historyActionsHandler = (event: KeyboardEvent) => {
            if (event.code == 'KeyZ' && event.ctrlKey) {
                undoPressButtonHandler();
            }
            if (event.code == 'KeyY' && event.ctrlKey) {
                redoButtonPressHandler();
            }
        };

        document.addEventListener('keydown', historyActionsHandler);

        return () => {
            document.removeEventListener('keydown', historyActionsHandler);
        };
    }, [undoPressButtonHandler]);

    const onColorInputHandler = (e: BaseSyntheticEvent) => {
        if (!timeOuted) {
            setTimeOuted(true);
            setTimeout(() => {
                const el = e.target as HTMLInputElement;
                if (getActiveElementsIds(store.getState().model).length) {
                    dispatchSetElementsColorAction(el.value);
                } else {
                    dispatchSetSlideBackgroundColorAction({ src: '', color: el.value });
                }
                dispatchKeepModelAction();
                setTimeOuted(false);
            }, 50);
        }
    };

    const onMouseDownHandler = (e: React.MouseEvent<HTMLInputElement>) => {
        e.stopPropagation();
    };

    const deleteElementsButtonFunction = () => {
        dispatchRemoveSelectedElementsAction();
        dispatchKeepModelAction();
    };

    return (
        <div className={styles['element-tools']}>
            <Button
                text={localeContext.locale.localization.text_word}
                state="disabled"
                shouldStopPropagation={false}
                contentType="icon"
                content={{ hotkeyInfo: '', icon: <TextTools /> }}
                foo={textToolsListButton}
            />
            <VerticalLine />
            <Button
                text={localeContext.locale.localization.add_word}
                state="disabled"
                shouldStopPropagation={false}
                contentType="icon"
                content={{ hotkeyInfo: '', icon: <AddFigure /> }}
                foo={figureToolsListButton}
            />
            <VerticalLine />
            <Button
                text={localeContext.locale.localization.reorder_word}
                state="disabled"
                shouldStopPropagation={false}
                contentType="icon"
                content={{ hotkeyInfo: '', icon: <Reorder /> }}
                foo={reorderListButton}
            />
            <VerticalLine />
            <Button
                text={localeContext.locale.localization.opacity_word}
                state="disabled"
                shouldStopPropagation={false}
                contentType="icon"
                content={{ hotkeyInfo: '', icon: <Opacity /> }}
                foo={() => undefined}
            />
            <VerticalLine />
            <Button
                text={localeContext.locale.localization.delete_word}
                state="disabled"
                shouldStopPropagation={true}
                contentType="icon"
                content={{ hotkeyInfo: '', icon: <Delete /> }}
                foo={deleteElementsButtonFunction}
            />
            <VerticalLine />
            <input
                type="color"
                id="color-picker"
                className={styles['color-picker']}
                defaultValue={'#ffffff'}
                onInput={onColorInputHandler}
                onMouseDown={onMouseDownHandler}
            />
            <Button
                text={localeContext.locale.localization.undo_word}
                state="disabled"
                shouldStopPropagation={false}
                contentType="icon"
                content={{ hotkeyInfo: '', icon: <Undo /> }}
                foo={undoPressButtonHandler}
            />
            <Button
                text={localeContext.locale.localization.redo_word}
                state="disabled"
                shouldStopPropagation={false}
                contentType="icon"
                content={{ hotkeyInfo: '', icon: <Redo /> }}
                foo={redoButtonPressHandler}
            />
            <Button
                text={localeContext.locale.localization.fullscreen_word}
                state="disabled"
                shouldStopPropagation={false}
                contentType="icon"
                content={{ hotkeyInfo: '', icon: <Fullscreen /> }}
                foo={() => undefined}
            />
        </div>
    );
}

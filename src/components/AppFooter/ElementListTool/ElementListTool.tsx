import styles from './ElementListTool.module.css';

import { LocaleContext, LocaleContextType } from '../../../App';
import React, { BaseSyntheticEvent, useContext } from 'react';

import { Button } from '../../common/Button/Button';
import { Delete } from '../../common/icons/Delete/Delete';
import { Opacity } from '../../common/icons/Opacity/Opacity';
import { Redo } from '../../common/icons/Redo/Redo';
import { Reorder } from '../../common/icons/Reorder/Reorder';
import { VerticalLine } from '../../common/VerticalLine/VerticalLine';
import { Undo } from '../../common/icons/Undo/Undo';

import { bindActionCreators } from 'redux';
import { changeSlidesBackground } from '../../../redux/action-creators/slideActionCreators';
import { undoModelAction, redoModelAction } from '../../../redux/action-creators/editorActionCreators';
import { useDispatch } from 'react-redux';

type ElementListToolProps = {
    foo: () => void | undefined;
};

export function ElementListTool(props: ElementListToolProps): JSX.Element {
    const localeContext: LocaleContextType = useContext(LocaleContext);

    const dispatch = useDispatch();
    const dispatchSetPreviousModelStateAction = bindActionCreators(undoModelAction, dispatch);
    const dispatchTurnBackModelStateAction = bindActionCreators(redoModelAction, dispatch);
    const dispatchSetSlideBackgroundColorAction = bindActionCreators(changeSlidesBackground, dispatch);

    const undoPressButtonHandler = () => {
        dispatchSetPreviousModelStateAction();
    };

    const redoButtonPressHandler = () => {
        dispatchTurnBackModelStateAction();
    };

    document.addEventListener('keydown', function (event) {
        if (event.code == 'KeyZ' && (event.ctrlKey || event.metaKey)) {
            undoPressButtonHandler();
        }
        if (event.code == 'KeyY' && (event.ctrlKey || event.metaKey)) {
            redoButtonPressHandler();
        }
    });

    const onColorChangeHandler = (e: BaseSyntheticEvent) => {
        e.stopPropagation();
        const el = e.target as HTMLInputElement;
        dispatchSetSlideBackgroundColorAction(el.value);
    };
    const onMouseDownHandler = (e: React.MouseEvent<HTMLInputElement>) => {
        e.stopPropagation();
    };

    return (
        <div className={styles['element-tools']}>
            <Button
                text={localeContext.locale.localization.undo_word}
                state="disabled"
                shouldStopPropagation={false}
                contentType="icon"
                content={{ hotkeyInfo: '', icon: <Undo /> }}
                foo={undoPressButtonHandler}
            />
            <VerticalLine />
            <Button
                text={localeContext.locale.localization.redo_word}
                state="disabled"
                shouldStopPropagation={false}
                contentType="icon"
                content={{ hotkeyInfo: '', icon: <Redo /> }}
                foo={redoButtonPressHandler}
            />
            <VerticalLine />
            <Button
                text={localeContext.locale.localization.reorder_word}
                state="disabled"
                shouldStopPropagation={false}
                contentType="icon"
                content={{ hotkeyInfo: '', icon: <Reorder /> }}
                foo={props.foo}
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
                shouldStopPropagation={false}
                contentType="icon"
                content={{ hotkeyInfo: '', icon: <Delete /> }}
                foo={() => undefined}
            />
            <VerticalLine />
            <input
                type="color"
                id="color-picker"
                defaultValue={'#ffffff'}
                onChange={onColorChangeHandler}
                onMouseDown={onMouseDownHandler}
            />
        </div>
    );
}

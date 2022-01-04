import styles from './ElementListTool.module.css';

import { LocaleContext, LocaleContextType } from '../../../App';
import { useContext } from 'react';

import { Button } from '../../common/Button/Button';
import { Delete } from '../../common/icons/Delete/Delete';
import { Fullscreen } from '../../common/icons/Fullscreen/Fullscreen';
import { Opacity } from '../../common/icons/Opacity/Opacity';
import { Redo } from '../../common/icons/Redo/Redo';
import { Reorder } from '../../common/icons/Reorder/Reorder';
import { VerticalLine } from '../../common/VerticalLine/VerticalLine';
import { Undo } from '../../common/icons/Undo/Undo';

import { bindActionCreators } from 'redux';
import { useDispatch } from 'react-redux';
import {
    undoModelAction,
    redoModelAction,
} from '../../../redux/action-creators/editorActionCreators';

type ElementListToolProps = {
    foo: () => void | undefined;
};

export function ElementListTool(props: ElementListToolProps): JSX.Element {
    const localeContext: LocaleContextType = useContext(LocaleContext);

    const dispatch = useDispatch();
    const dispatchSetPreviousModelStateAction = bindActionCreators(
        undoModelAction,
        dispatch,
    );
    const dispatchTurnBackModelStateAction = bindActionCreators(
        redoModelAction,
        dispatch,
    );

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

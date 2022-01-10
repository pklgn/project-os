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
import { listName } from '../../PresentationEditor/PresentationEditor';

import { bindActionCreators } from 'redux';
import { useDispatch } from 'react-redux';
import { undoModelAction, redoModelAction } from '../../../redux/action-creators/editorActionCreators';
import { TextTools } from '../../common/icons/TextTools/TextTools';

type ElementListToolProps = {
    foo: (listName: listName) => void | undefined;
};

export function ElementListTool(props: ElementListToolProps): JSX.Element {
    const localeContext: LocaleContextType = useContext(LocaleContext);
    
    const reorderListButton = () => props.foo(listName.REORDER_LIST)
    const textToolsListButton = () => props.foo(listName.TEXT_TOOLS_LIST_BUTTON)

    const dispatch = useDispatch();
    const dispatchSetPreviousModelStateAction = bindActionCreators(undoModelAction, dispatch);
    const dispatchTurnBackModelStateAction = bindActionCreators(redoModelAction, dispatch);

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
                text={localeContext.locale.localization.text_word}
                state="disabled"
                shouldStopPropagation={false}
                contentType="icon"
                content={{ hotkeyInfo: '', icon: <TextTools /> }}
                foo={textToolsListButton}
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
                shouldStopPropagation={false}
                contentType="icon"
                content={{ hotkeyInfo: '', icon: <Delete /> }}
                foo={() => undefined}
            />
            <VerticalLine />
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

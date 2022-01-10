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

type TextToolsListProps = {
    foo: (listName: listName) => void | undefined;
};

export function TextToolsList(props: TextToolsListProps): JSX.Element {
    const localeContext: LocaleContextType = useContext(LocaleContext);
    
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
            
        </div>
    );
}

import styles from './TextToolsList.module.css';

import { LocaleContext, LocaleContextType } from '../../../App';
import { useContext } from 'react';

import { Button } from '../../common/Button/Button';
import { VerticalLine } from '../../common/VerticalLine/VerticalLine';
import { listName } from '../../PresentationEditor/PresentationEditor';

import { bindActionCreators } from 'redux';
import { useDispatch } from 'react-redux';
import { undoModelAction, redoModelAction } from '../../../redux/action-creators/editorActionCreators';
import { addText } from '../../../redux/action-creators/textActionCreators';
import { AddText } from '../../common/icons/AddText/AddText';
import { Clear } from '../../common/icons/Cancel/Clear';

type TextToolsListProps = {
    foo: (listName: listName) => void | undefined;
};

export function TextToolsList(props: TextToolsListProps): JSX.Element {
    const localeContext: LocaleContextType = useContext(LocaleContext);
    
    const elementListToolButton = () => props.foo(listName.ELEMENT_LIST)

    const dispatch = useDispatch();
    const dispatchSetPreviousModelStateAction = bindActionCreators(undoModelAction, dispatch);
    const dispatchTurnBackModelStateAction = bindActionCreators(redoModelAction, dispatch);
    const dispatchAddTextAction = bindActionCreators(addText, dispatch);

    const undoPressButtonHandler = () => {
        dispatchSetPreviousModelStateAction();
    };

    const redoButtonPressHandler = () => {
        dispatchTurnBackModelStateAction();
    };

    const addTextHandler = () => {
        dispatchAddTextAction({
            x: 20,
            y: 30
        });
    }
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
                text={localeContext.locale.localization.add_word}
                state="disabled"
                shouldStopPropagation={false}
                contentType="icon"
                content={{ hotkeyInfo: '', icon: <AddText /> }}
                foo={addTextHandler}
            />
            <VerticalLine />
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

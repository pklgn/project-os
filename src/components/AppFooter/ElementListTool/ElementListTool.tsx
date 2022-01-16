import styles from './ElementListTool.module.css';

import { LocaleContext, LocaleContextType } from '../../../App';
import { useContext } from 'react';

import { Button } from '../../common/Button/Button';
import { GeometryIcon } from '../../common/icons/Geometry/Geometry';
import { RedoUndoIcon } from '../../common/icons/RedoUndo/RedoUndo';
import { SelectCursorIcon } from '../../common/icons/Cursor/Cursor';
import { TextIcon } from '../../common/icons/Text/Text';
import { VerticalLine } from '../../common/VerticalLine/VerticalLine';

import { bindActionCreators } from 'redux';
import { useDispatch } from 'react-redux';
import { undoModelAction, redoModelAction } from '../../../redux/action-creators/editorActionCreators';

type ElementListToolProps = {
    foo: () => void | undefined;
};

export function ElementListTool(props: ElementListToolProps): JSX.Element {
    const localeContext: LocaleContextType = useContext(LocaleContext);

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
            <div className={styles['tools-buttons-container']} id="tools-buttons-container">
                <Button id="select-tool-button" iconLeft={<SelectCursorIcon color="#ffa322" />} />
                <Button id="text-tool-button" iconLeft={<TextIcon color="#ffa322" />} />
                <Button id="geometry-tool-button" iconLeft={<GeometryIcon color="#ffa322" />} />
            </div>
            <VerticalLine id="veritical-1" />
            <span id="adaptive-elements-tool-placeholder" />
            <VerticalLine id="veritical-2" />
            <div className={styles['history-buttons-container']} id="history-buttons-container">
                <Button
                    type={'default'}
                    text={undefined}
                    state={'disabled'}
                    id="undo-button"
                    optionalText={undefined}
                    iconLeft={<RedoUndoIcon turn="undo" color="#ffa322" />}
                    iconRight={undefined}
                    cssMix={undefined}
                    onClick={() => {
                        undefined;
                    }}
                />
                <Button
                    type={'default'}
                    text={undefined}
                    state={'disabled'}
                    id="redo-button"
                    optionalText={undefined}
                    iconLeft={<RedoUndoIcon turn="redo" color="#ffa322" />}
                    iconRight={undefined}
                    cssMix={undefined}
                    onClick={() => {
                        undefined;
                    }}
                />
            </div>
        </div>
    );
}

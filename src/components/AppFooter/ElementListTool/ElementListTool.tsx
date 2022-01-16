import styles from './ElementListTool.module.css';

import { LocaleContext, LocaleContextType } from '../../../App';
import { useContext } from 'react';

import { Button } from '../../common/Button/Button';
import { GeometryIcon } from '../../common/icons/Geometry/Geometry';
import { RedoUndoIcon } from '../../common/icons/RedoUndo/RedoUndo';
import { SelectCursorIcon } from '../../common/icons/Cursor/Cursor';
import { TextIcon } from '../../common/icons/Text/Text';
import { VerticalLine } from '../../common/VerticalLine/VerticalLine';

import { addFigure } from '../../../redux/action-creators/figureActionCreators';
import { FigureInfo, FigureShape } from '../../../model/types';
import { bindActionCreators } from 'redux';
import { useDispatch } from 'react-redux';
import { undoModelAction, redoModelAction } from '../../../redux/action-creators/editorActionCreators';

export function ElementListTool(): JSX.Element {
    const localeContext: LocaleContextType = useContext(LocaleContext);

    const dispatch = useDispatch();
    const dispatchUndoAction = bindActionCreators(undoModelAction, dispatch);
    const dispatchRedoAction = bindActionCreators(redoModelAction, dispatch);
    const dispatchAddFigureAction = bindActionCreators(addFigure, dispatch);

    document.addEventListener('keydown', function (event) {
        if (event.code == 'KeyZ' && (event.ctrlKey || event.metaKey)) {
            dispatchUndoAction();
        }
        if (event.code == 'KeyY' && (event.ctrlKey || event.metaKey)) {
            dispatchRedoAction();
        }
    });

    const mockInfo: FigureInfo = {
        shape: FigureShape.Circle,
        xy: {
            x: 0,
            y: 0,
        },
    };

    return (
        <div className={styles['element-tools']}>
            <div className={styles['tools-buttons-container']} id="tools-buttons-container">
                <Button
                    type={'default'}
                    text={undefined}
                    state={'disabled'}
                    id="select-tool-button"
                    optionalText={undefined}
                    iconLeft={<SelectCursorIcon color="#ffa322" />}
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
                    id="text-tool-button"
                    optionalText={undefined}
                    iconLeft={<TextIcon color="#ffa322" />}
                    iconRight={undefined}
                    cssMix={undefined}
                    onClick={() => {
                        undefined;
                    }}
                />
                <Button
                    type={'default'}
                    text={undefined}
                    state={'active'}
                    id="geometry-tool-button"
                    optionalText={undefined}
                    iconLeft={<GeometryIcon color="#ffa322" />}
                    iconRight={undefined}
                    cssMix={undefined}
                    onClick={() => dispatchAddFigureAction(mockInfo)}
                />
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
                    onClick={dispatchUndoAction}
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
                    onClick={dispatchRedoAction}
                />
            </div>
        </div>
    );
}

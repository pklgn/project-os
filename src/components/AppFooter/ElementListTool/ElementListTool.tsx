import styles from './ElementListTool.module.css';

import { LocaleContext, LocaleContextType } from '../../../App';
import { useContext } from 'react';

import { Button, ButtonProps } from '../../common/Button/Button';
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
import ToolTip from '../../common/ToolTip/ToolTip';

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

    const mainToolsButtonInfo: ButtonProps[] = [
        {
            type: 'default',
            text: localeContext.locale.localization.elementsListTool.cursorTool,
            state: 'independently',
            id: 'select-tool-button',
            iconLeft: <SelectCursorIcon color="#ffa322" />,
            onClick: () => {
                undefined;
            },
        },
        {
            type: 'default',
            text: localeContext.locale.localization.elementsListTool.textTool,
            state: 'independently',
            id: 'text-tool-button',
            iconLeft: <TextIcon color="#ffa322" />,
            onClick: () => {
                undefined;
            },
        },
        {
            type: 'default',
            text: localeContext.locale.localization.elementsListTool.geometryTool,
            state: 'independently',
            id: 'geometry-tool-button',
            iconLeft: <GeometryIcon color="#ffa322" />,
            onClick: () => dispatchAddFigureAction(mockInfo),
        },
    ];

    return (
        <div className={styles['element-tools']}>
            <div className={styles['tools-buttons-container']} id="tools-buttons-container">
                {mainToolsButtonInfo.map((buttonInfo, index) => {
                    return (
                        <ToolTip
                            key={index}
                            title={buttonInfo.text ? buttonInfo.text : 'None'}
                            position="above"
                            child={
                                <Button
                                    key={index}
                                    type={buttonInfo.type}
                                    state={buttonInfo.state}
                                    id={buttonInfo.id}
                                    iconLeft={buttonInfo.iconLeft}
                                    onClick={buttonInfo.onClick}
                                />
                            }
                        />
                    );
                })}
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

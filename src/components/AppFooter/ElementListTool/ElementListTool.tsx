import styles from './ElementListTool.module.css';

import { LocaleContext, LocaleContextType } from '../../../App';
import { useContext } from 'react';

import { Button, ButtonProps } from '../../common/Button/Button';
import { GeometryIcon } from '../../common/icons/Geometry/Geometry';
import { RedoUndoIcon } from '../../common/icons/RedoUndo/RedoUndo';
import { SelectCursorIcon } from '../../common/icons/Cursor/Cursor';
import { TextIcon } from '../../common/icons/Text/Text';
import ToolTip from '../../common/ToolTip/ToolTip';
import { VerticalLine } from '../../common/VerticalLine/VerticalLine';

import {
    dispatchUndoAction,
    dispatchRedoAction,
    dispatchAddFigureAction,
} from '../../../app_model/redux_model/dispatchers';
import { useDispatch } from 'react-redux';

import { FigureInfo, FigureShape } from '../../../app_model/model/types';

export function ElementListTool(): JSX.Element {
    const localeContext: LocaleContextType = useContext(LocaleContext);

    const dispatch = useDispatch();

    document.addEventListener('keydown', function (event) {
        if (event.code == 'KeyZ' && (event.ctrlKey || event.metaKey)) {
            dispatchUndoAction(dispatch)();
        }
        if (event.code == 'KeyY' && (event.ctrlKey || event.metaKey)) {
            dispatchRedoAction(dispatch)();
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
            text: localeContext.locale.localization.elementsListTool.cursorTool,
            id: 'select-tool-button',
            state: 'pressed',
            iconLeft: <SelectCursorIcon color="#ffa322" />,
        },
        {
            text: localeContext.locale.localization.elementsListTool.textTool,
            id: 'text-tool-button',
            iconLeft: <TextIcon color="#ffa322" />,
        },
        {
            text: localeContext.locale.localization.elementsListTool.geometryTool,
            id: 'geometry-tool-button',
            iconLeft: <GeometryIcon color="#ffa322" />,
            onClick: () => dispatchAddFigureAction(dispatch)(mockInfo),
        },
    ];

    const redoUndoButtonInfo: ButtonProps[] = [
        {
            text: localeContext.locale.localization.historyTool.undoTool,
            id: 'undo-button',
            type: 'round',
            iconLeft: <RedoUndoIcon turn="undo" color="#ffa322" />,
            onMouseUp: dispatchUndoAction(dispatch),
        },
        {
            text: localeContext.locale.localization.historyTool.redoTool,
            id: 'redo-button',
            type: 'round',
            iconLeft: <RedoUndoIcon turn="redo" color="#ffa322" />,
            onMouseUp: dispatchRedoAction(dispatch),
        },
    ];

    return (
        <div className={styles['element-tools']}>
            <div className={styles['tools-buttons-container']} id="tools-buttons-container">
                {mainToolsButtonInfo.map((buttonInfo, index) => {
                    return (
                        <ToolTip
                            key={index}
                            id={`${buttonInfo.id}`}
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
            <VerticalLine id="vertical-1" />
            <span id="adaptive-elements-tool-placeholder" />
            <VerticalLine id="vertical-2" />
            <div className={styles['history-buttons-container']} id="history-buttons-container">
                {redoUndoButtonInfo.map((buttonInfo, index) => {
                    return (
                        <ToolTip
                            key={index}
                            id={`${buttonInfo.id}`}
                            title={buttonInfo.text ? buttonInfo.text : 'None'}
                            position="above"
                            child={
                                <Button
                                    key={index}
                                    type={buttonInfo.type}
                                    state={buttonInfo.state}
                                    id={buttonInfo.id}
                                    iconLeft={buttonInfo.iconLeft}
                                    onMouseUp={buttonInfo.onMouseUp}
                                />
                            }
                        />
                    );
                })}
            </div>
        </div>
    );
}

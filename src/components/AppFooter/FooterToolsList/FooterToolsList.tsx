import styles from './FooterToolsList.module.css';

import { LocaleContext, LocaleContextType } from '../../../App';
import { useContext, useEffect, useRef, useState } from 'react';

import { Button, ButtonProps, ButtonState } from '../../common/Button/Button';
import { GeometryIcon } from '../../common/icons/Geometry/Geometry';
import { RedoUndoIcon } from '../../common/icons/RedoUndo/RedoUndo';
import { SelectCursorIcon } from '../../common/icons/Cursor/Cursor';
import { TextIcon } from '../../common/icons/Text/Text';
import { VerticalLine } from '../../common/VerticalLine/VerticalLine';

import ToolTip from '../../common/ToolTip/ToolTip';
import { TextToolsList } from '../TextToolsList/TextToolsList';
import { DefaultToolsList } from '../DefaultToolsList/DefaultToolsList';
import {
    dispatchUndoAction,
    dispatchRedoAction,
    dispatchAddFigureAction,
    dispatchActiveViewAreaAction,
} from '../../../app_model/redux_model/dispatchers';
import { useDispatch } from 'react-redux';

import { FigureInfo, FigureShape } from '../../../app_model/model/types';
import { PictureToolsList } from '../PictureToolsList/PictureToolsList';
import { FigureToolsList } from '../FigureToolsList/FigureToolsList';
import { store } from '../../../app_model/redux_model/store';
import { ChosenElementsType } from '../../../app_model/view_model/types';

export function FooterToolsList(): JSX.Element {
    const localeContext: LocaleContextType = useContext(LocaleContext);

    const dispatch = useDispatch();

    const onUndoButton = () => {
        dispatchActiveViewAreaAction(dispatch)('HISTORY_TOOL');
        return dispatchUndoAction(dispatch)();
    };

    const onRedoButton = () => {
        dispatchActiveViewAreaAction(dispatch)('HISTORY_TOOL');
        return dispatchRedoAction(dispatch)();
    };

    document.addEventListener('keydown', function (event) {
        if (event.code == 'KeyZ' && (event.ctrlKey || event.metaKey)) {
            onUndoButton();
        }
        if (event.code == 'KeyY' && (event.ctrlKey || event.metaKey)) {
            onRedoButton();
        }
    });

    const mockInfo: FigureInfo = {
        shape: FigureShape.Rectangle,
        xy: {
            x: 0,
            y: 0,
        },
    };

    const mainToolsButtonInfo: ButtonProps[] = [
        {
            text: localeContext.locale.localization.elementsListTool.cursorTool,
            id: 'select-tool-button',
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
            onClick: dispatchUndoAction(dispatch),
            onMouseUp: onUndoButton,
        },
        {
            text: localeContext.locale.localization.historyTool.redoTool,
            id: 'redo-button',
            type: 'round',
            iconLeft: <RedoUndoIcon turn="redo" color="#ffa322" />,
            onClick: dispatchRedoAction(dispatch),
            onMouseUp: onRedoButton,
        },
    ];

    const [toolsSwitcher, setToolsSwitcher] = useState('NONE' as ChosenElementsType);

    store.subscribe(() => setToolsSwitcher(store.getState().viewModel.chosenElementsType));
    return (
        <div className={styles['footer-tools']}>
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
            <div className={styles['element-tools']}>
                {(function () {
                    switch (toolsSwitcher) {
                        case 'MIXED':
                            return <DefaultToolsList />;
                        case 'PICTURE':
                            return [<PictureToolsList key={0} />, <DefaultToolsList key={1} />];
                        case 'TEXT':
                            return [<TextToolsList key={0} />, <DefaultToolsList key={1} />];
                        case 'FIGURE':
                            return [<FigureToolsList key={0} />, <DefaultToolsList key={1} />];
                        case 'NONE':
                            return <span className={styles['empty_block']}></span>;
                    }
                })()}
            </div>
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

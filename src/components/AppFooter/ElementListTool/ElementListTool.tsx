import styles from './ElementListTool.module.css';

import { LocaleContext, LocaleContextType } from '../../../App';
import { useContext } from 'react';

import { Button, ButtonProps } from '../../common/Button/Button';
import { GeometryIcon } from '../../common/icons/Geometry/Geometry';
import { RedoUndoIcon } from '../../common/icons/RedoUndo/RedoUndo';
import { SelectCursorIcon } from '../../common/icons/Cursor/Cursor';
import { TextIcon } from '../../common/icons/Text/Text';
import { VerticalLine } from '../../common/VerticalLine/VerticalLine';
import { store } from '../../../app_model/redux_model/store';

import { addFigure } from '../../../app_model/redux_model/actions_model/action_creators/figure_action_creators';
import { FigureInfo, FigureShape } from '../../../app_model/model/types';
import { bindActionCreators } from 'redux';
import { useDispatch } from 'react-redux';
import {
    undoModelAction,
    redoModelAction,
} from '../../../app_model/redux_model/actions_model/action_creators/editor_action_creators';
import ToolTip from '../../common/ToolTip/ToolTip';
import { generateUUId } from '../../../app_model/model/utils/uuid';
import { TextToolsList } from '../TextToolsList/TextToolsList';
import { FigureToolsList } from '../FigureToolsList/FigureToolsList';
import { DefaultToolsList } from '../DefaultToolsList/DefaultToolsList';
import { Reorder } from '../../common/icons/Reorder/Reorder';
import { Opacity } from '../../common/icons/Opacity/Opacity';
import { DeleteElement } from '../../common/icons/DeleteElement/DeleteElement';

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
            onClick: () => dispatchAddFigureAction(mockInfo),
        },
    ];

    const defaultToolsButtonInfo: ButtonProps[] = [
        {
            text: localeContext.locale.localization.elementsListTool.cursorTool,
            id: 'select-tool-button',
            iconLeft: <Reorder />,
        },
        {
            text: localeContext.locale.localization.elementsListTool.textTool,
            id: 'text-tool-button',
            iconLeft: <Opacity />,
        },
        {
            text: localeContext.locale.localization.elementsListTool.geometryTool,
            id: 'geometry-tool-button',
            iconLeft: <DeleteElement />,
        }
    ];
    
    const redoUndoButtonInfo: ButtonProps[] = [
        {
            text: localeContext.locale.localization.historyTool.undoTool,
            id: 'undo-button',
            type: 'round',
            iconLeft: <RedoUndoIcon turn="undo" color="#ffa322" />,
            onMouseUp: dispatchUndoAction,
        },
        {
            text: localeContext.locale.localization.historyTool.redoTool,
            id: 'redo-button',
            type: 'round',
            iconLeft: <RedoUndoIcon turn="redo" color="#ffa322" />,
            onMouseUp: dispatchRedoAction,
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
            {(function () {
                switch (store.getState().viewModel.chosenElementsType) {
                    case 'TEXT':
                        return (
                            <div className="">
                                <TextToolsList /> <DefaultToolsList />
                            </div>
                        );
                    case 'PICTURE':
                        return <DefaultToolsList />;
                    case 'FIGURE':
                        return <FigureToolsList />;
                    case 'MIXED':
                        return <DefaultToolsList />;
                    case 'NONE':
                        return <span className={styles.empty_block}></span>;
                    default:
                        return <span className={styles.empty_block}></span>;
                }
            })()}
            <DefaultToolsList />
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

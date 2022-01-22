import styles from './FooterToolsList.module.css';

import { LocaleContext, LocaleContextType } from '../../../App';
import { useContext, useState } from 'react';

import { Button, ButtonProps } from '../../common/Button/Button';
import { GeometryIcon } from '../../common/icons/Geometry/Geometry';
import { RedoUndoIcon } from '../../common/icons/RedoUndo/RedoUndo';
import { SelectCursorIcon } from '../../common/icons/Cursor/Cursor';
import { TextIcon } from '../../common/icons/Text/Text';
import { VerticalLine } from '../../common/VerticalLine/VerticalLine';
import { store } from '../../../app_model/redux_model/store';

import ToolTip from '../../common/ToolTip/ToolTip';
import { generateUUId } from '../../../app_model/model/utils/uuid';
import { TextToolsList } from '../TextToolsList/TextToolsList';
import { FigureToolsList } from '../FigureToolsList/FigureToolsList';
import { DefaultToolsList } from '../DefaultToolsList/DefaultToolsList';
import { Reorder } from '../../common/icons/Reorder/Reorder';
import { Opacity } from '../../common/icons/Opacity/Opacity';
import { DeleteElement } from '../../common/icons/DeleteElement/DeleteElement';
import {
    dispatchUndoAction,
    dispatchRedoAction,
    dispatchAddFigureAction,
} from '../../../app_model/redux_model/dispatchers';
import { useDispatch } from 'react-redux';

import { FigureInfo, FigureShape } from '../../../app_model/model/types';
import { bindActionCreators } from 'redux';
import { setChosenElementsType } from '../../../app_model/view_model/chosen_elements_action';
import { getSlideElementType, SlideElementType } from '../../../app_model/model/utils/tools';
import { ChosenElementsType } from '../../../app_model/view_model/types';

export function FooterToolsList(): JSX.Element {
    const localeContext: LocaleContextType = useContext(LocaleContext);

    const dispatch = useDispatch();
    const dispatchChosenElementsTypeAction = bindActionCreators(setChosenElementsType, dispatch);
    const selectedSlideElementsIds = store.getState().model.selectedSlideElementsIds;

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

    // const [chosenType, setChosenType] = useState('NONE' as ChosenElementsType);
    // const handleChange = () => {
    //     const activeSLide = store.getState().model.presentation.slidesList.slice(-1)[0];
    //     const viewModel = store.getState().viewModel;
    //     if (activeSLide === undefined) {
    //         setChosenType('NONE');
    //     } else {
    //         if (activeSLide.elementsList.length) {
    //             const selectedElementsList = activeSLide.elementsList.filter((item) =>
    //                 selectedSlideElementsIds.includes(item.id),
    //             );

    //             if (selectedElementsList.length) {
    //                 const elementsType = getSlideElementType(selectedElementsList[0].content);

    //                 selectedElementsList.every((item) => getSlideElementType(item.content) === elementsType)
    //                     ? setChosenType(elementsType)
    //                     : setChosenType('MIXED');
    //             }
    //             if (!selectedElementsList.length) setChosenType('NONE');
    //         }
    //         if (!activeSLide.elementsList.length) setChosenType('NONE');
    //     }
    // };

    // store.subscribe(handleChange);

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
                    switch ('TEXT') {
                        case 'TEXT':
                            return [<TextToolsList />, <DefaultToolsList />];
                        // );
                        // case 'PICTURE':
                        // return <DefaultToolsList />;
                        // case 'FIGURE':
                        // return <FigureToolsList />;
                        // case 'MIXED':
                        //     return <DefaultToolsList />;
                        // case 'NONE':
                        // return <span className={styles.empty_block}></span>;
                    }
                })()}
            </div>
            {/* <DefaultToolsList /> */}
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

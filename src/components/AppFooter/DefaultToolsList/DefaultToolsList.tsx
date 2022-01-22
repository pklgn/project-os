import styles from './DefaultToolsList.module.css';

import { useContext, useState } from 'react';
import { LocaleContext, LocaleContextType } from '../../../App';

import { Button, ButtonProps } from '../../common/Button/Button';
import { Reorder } from '../../common/icons/Reorder/Reorder';
import { Opacity } from '../../common/icons/Opacity/Opacity';
import { DeleteElement } from '../../common/icons/DeleteElement/DeleteElement';
import ToolTip from '../../common/ToolTip/ToolTip';
import { generateUUId } from '../../../app_model/model/utils/uuid';
import { ReorderToolsList } from '../ReorderToolsList/ReorderToolsList';
import { dispatchRemoveSelectedElementsAction } from '../../../app_model/redux_model/elementDispatchers';
import { useDispatch } from 'react-redux';
import { dispatchKeepModelAction } from '../../../app_model/redux_model/dispatchers';

enum commonList {
    DEFAULT = 'DEFAULT',
    REORDER = 'REORDER',
    OPACITY = 'OPACITY',
}

export function DefaultToolsList(): JSX.Element {
    const localeContext: LocaleContextType = useContext(LocaleContext);

    const [listSwitcher, setListSwitcher] = useState(commonList.DEFAULT);
    const dispatch = useDispatch();

    const reorderHandler = () => {
        setListSwitcher(commonList.REORDER);
    };

    const opacityHandler = () => {
        setListSwitcher(commonList.OPACITY);
    };

    const callbackHandler = () => {
        setListSwitcher(commonList.DEFAULT);
    };

    const removeSelectedElementsHandler = () => {
        dispatchRemoveSelectedElementsAction(dispatch)();
        dispatchKeepModelAction(dispatch)();
    };

    const defaultToolsButtonInfo: ButtonProps[] = [
        {
            text: localeContext.locale.localization.elementsListTool.cursorTool,
            id: 'select-tool-button',
            iconLeft: <Reorder />,
            onClick: reorderHandler,
        },
        {
            text: localeContext.locale.localization.elementsListTool.textTool,
            id: 'text-tool-button',
            iconLeft: <Opacity />,
            onMouseUp: opacityHandler,
        },
        {
            text: localeContext.locale.localization.elementsListTool.geometryTool,
            id: 'geometry-tool-button',
            iconLeft: <DeleteElement />,
            onClick: removeSelectedElementsHandler,
        },
    ];

    return (
        <div className={styles['default-tools']}>
            {(() => {
                switch (listSwitcher) {
                    case commonList.DEFAULT:
                        return (
                            <div className={styles['tools-buttons-container']} id="tools-buttons-container">
                                {defaultToolsButtonInfo.map((buttonInfo, index) => {
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
                        );
                    case commonList.REORDER:
                        return <ReorderToolsList setListSwitcher={callbackHandler} />;
                }
            })()}
        </div>
    );
}
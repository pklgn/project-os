import styles from './PictureToolsList.module.css';

import { LocaleContext, LocaleContextType } from '../../../App';
import React, { useContext, useState } from 'react';

import { Button, ButtonProps } from '../../common/Button/Button';
import { useDispatch } from 'react-redux';
import { ReorderToolsList } from '../ReorderToolsList/ReorderToolsList';
import ToolTip from '../../common/ToolTip/ToolTip';
import { Reorder } from '../../common/icons/Reorder/Reorder';
import { Opacity } from '../../common/icons/Opacity/Opacity';
import { dispatchKeepModelAction } from '../../../app_model/redux_model/dispatchers';

enum commonList {
    DEFAULT = 'DEFAULT',
    REORDER = 'REORDER',
    OPACITY = 'OPACITY',
}

export function FigureToolsList(): JSX.Element {
    const localeContext: LocaleContextType = useContext(LocaleContext);

    const dispatch = useDispatch();
    const [listSwitcher, setListSwitcher] = useState(commonList.DEFAULT);

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
        // dispatchRemoveSelectedElementsAction(dispatch)();
        dispatchKeepModelAction(dispatch)();
    };

    const pictureToolsButtonInfo: ButtonProps[] = [];

    return (
        <div className={styles['default-tools']}>
            {(() => {
                switch (listSwitcher) {
                    case commonList.DEFAULT:
                        return (
                            <div className={styles['tools-buttons-container']} id="tools-buttons-container">
                                {pictureToolsButtonInfo.map((buttonInfo, index) => {
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

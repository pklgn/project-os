import { useContext, useState } from 'react';
import { LocaleContext, LocaleContextType } from '../../../App';

import { Button, ButtonProps } from '../../common/Button/Button';
import { Reorder } from '../../common/icons/Reorder/Reorder';
import { Opacity } from '../../common/icons/Opacity/Opacity';
import { RemoveElement } from '../../common/icons/RemoveElement/RemoveElement';
import ToolTip from '../../common/ToolTip/ToolTip';
import { ReorderToolsList } from '../ReorderToolsList/ReorderToolsList';

import { useDispatch } from 'react-redux';
import { dispatchKeepModelAction } from '../../../app_model/redux_model/dispatchers';
import { OpacityToolsList } from '../OpacityToolsList/OpacityToolsList';

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
        // dispatchRemoveSelectedElementsAction(dispatch)();
        dispatchKeepModelAction(dispatch)();
    };

    const defaultToolsButtonInfo: ButtonProps[] = [
        {
            text: localeContext.locale.localization.elementsListTool.reorderTool,
            id: 'select-tool-button',
            iconLeft: <Reorder />,
            onClick: reorderHandler,
        },
        {
            text: localeContext.locale.localization.elementsListTool.opacityTool,
            id: 'text-tool-button',
            iconLeft: <Opacity />,
            onClick: opacityHandler,
        },
        {
            text: localeContext.locale.localization.elementsListTool.removeElementTool,
            id: 'geometry-tool-button',
            iconLeft: <RemoveElement />,
            onClick: removeSelectedElementsHandler,
        },
    ];

    return (
        <>
            {(() => {
                switch (listSwitcher) {
                    case commonList.DEFAULT:
                        return defaultToolsButtonInfo.map((buttonInfo, index) => {
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
                        });
                    case commonList.REORDER:
                        return <ReorderToolsList setListSwitcher={callbackHandler} />;
                    case commonList.OPACITY:
                        return <OpacityToolsList setListSwitcher={callbackHandler} />;
                }
            })()}
        </>
    );
}

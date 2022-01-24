import { useContext, useState } from 'react';
import { LocaleContext, LocaleContextType } from '../../../App';

import { Button, ButtonProps } from '../../common/Button/Button';
import { Reorder } from '../../common/icons/Reorder/Reorder';
import { Opacity } from '../../common/icons/Opacity/Opacity';

import ToolTip from '../../common/ToolTip/ToolTip';
import { ReorderToolsList } from '../ReorderToolsList/ReorderToolsList';

enum commonList {
    DEFAULT = 'DEFAULT',
    REORDER = 'REORDER',
    OPACITY = 'OPACITY',
}

export const ToolsComponents = {
    DefaultToolsList: function DefaultToolsList(): JSX.Element {
        const localeContext: LocaleContextType = useContext(LocaleContext);

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

        const defaultToolsButtonInfo: ButtonProps[] = [
            {
                text: localeContext.locale.localization.elementsListTool.cursorTool,
                id: 'select-tool-button',
                iconLeft: <Reorder />,
                onMouseUp: reorderHandler,
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
                // iconLeft: <DeleteElement />,
            },
        ];

        return (
            <div>
                {(() => {
                    switch (listSwitcher) {
                        case commonList.DEFAULT:
                            return (
                                <div id="tools-buttons-container">
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
    },
};

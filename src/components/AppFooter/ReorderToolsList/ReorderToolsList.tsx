import styles from './ReorderToolsList.module.css';

import { useContext } from 'react';
import { LocaleContext, LocaleContextType } from '../../../App';

import { Button, ButtonProps } from '../../common/Button/Button';
import { LayerBackward } from '../../common/icons/LayerBackward/LayerBackward';
import { LayerBackground } from '../../common/icons/LayerBackground/LayerBackground';
import { LayerForward } from '../../common/icons/LayerForward/LayerForward';
import { LayerForeground } from '../../common/icons/LayerForeground/LayerForeground';
import ToolTip from '../../common/ToolTip/ToolTip';
import { dispatchMoveElementsToBackgroundOrForeground } from '../../../app_model/redux_model/elementDispatchers';
import { useDispatch } from 'react-redux';
import { dispatchKeepModelAction } from '../../../app_model/redux_model/historyDispatchers';

type reorderToolsListProps = {
    setListSwitcher: () => void;
};

export function ReorderToolsList(props: reorderToolsListProps): JSX.Element {
    const localeContext: LocaleContextType = useContext(LocaleContext);

    const dispatch = useDispatch();
    const moveForegroundHandler = () => {
        dispatchMoveElementsToBackgroundOrForeground(dispatch)(false);
        dispatchKeepModelAction(dispatch)();
        props.setListSwitcher();
    };

    const moveBackgroundHandler = () => {
        dispatchMoveElementsToBackgroundOrForeground(dispatch)(true);
        dispatchKeepModelAction(dispatch)();
        props.setListSwitcher();
    };

    const reorderToolsButtonInfo: ButtonProps[] = [
        {
            text: localeContext.locale.localization.elementsListTool.cursorTool,
            id: 'select-tool-button',
            iconLeft: <LayerForward />,
            onClick: props.setListSwitcher,
        },
        {
            text: localeContext.locale.localization.elementsListTool.textTool,
            id: 'text-tool-button',
            iconLeft: <LayerForeground />,
            onClick: moveForegroundHandler,
        },
        {
            text: localeContext.locale.localization.elementsListTool.textTool,
            id: '',
            iconLeft: <LayerBackward />,
            onClick: props.setListSwitcher,
        },
        {
            text: localeContext.locale.localization.elementsListTool.textTool,
            id: '',
            iconLeft: <LayerBackground />,
            onClick: moveBackgroundHandler,
        },
    ];

    return (
        <div className={styles['reorder-tools']}>
            {reorderToolsButtonInfo.map((buttonInfo, index) => {
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
    );
}

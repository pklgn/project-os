import { useContext, useEffect } from 'react';
import { LocaleContext, LocaleContextType } from '../../../App';

import { Button, ButtonProps } from '../../common/Button/Button';
import { LayerBackward } from '../../common/icons/LayerBackward/LayerBackward';
import { LayerBackground } from '../../common/icons/LayerBackground/LayerBackground';
import { LayerForward } from '../../common/icons/LayerForward/LayerForward';
import { LayerForeground } from '../../common/icons/LayerForeground/LayerForeground';
import ToolTip from '../../common/ToolTip/ToolTip';

import { useDispatch } from 'react-redux';
import {
    dispatchKeepModelAction,
    dispatchMoveSelectedElementsForward,
    dispatchMoveSelectedElementsBackward,
    dispatchMoveSelectedElementsToBackgroundOrForegroundAction,
} from '../../../app_model/redux_model/dispatchers';

type ReorderToolsListProps = {
    setListSwitcher: () => void;
};

export function ReorderToolsList(props: ReorderToolsListProps): JSX.Element {
    const localeContext: LocaleContextType = useContext(LocaleContext);

    const dispatch = useDispatch();

    useEffect(() => {
        const onKeyDownHandler = (event: KeyboardEvent) => {
            event.stopPropagation();
            if (event.code === 'Escape') props.setListSwitcher();
        };

        document.addEventListener('keydown', onKeyDownHandler);
        return () => {
            document.removeEventListener('keydown', onKeyDownHandler);
        };
    }, []);

    const moveForwardHandler = () => {
        dispatchMoveSelectedElementsForward(dispatch)();
        dispatchKeepModelAction(dispatch)();
    };

    const moveForegroundHandler = () => {
        dispatchMoveSelectedElementsToBackgroundOrForegroundAction(dispatch)(false);
        dispatchKeepModelAction(dispatch)();
    };

    const moveBackwardHandler = () => {
        dispatchMoveSelectedElementsBackward(dispatch)();
        dispatchKeepModelAction(dispatch)();
    };

    const moveBackgroundHandler = () => {
        dispatchMoveSelectedElementsToBackgroundOrForegroundAction(dispatch)(true);
        dispatchKeepModelAction(dispatch)();
    };

    const reorderToolsButtonInfo: ButtonProps[] = [
        {
            text: localeContext.locale.localization.elementsListTool.forwardLayerTool,
            id: 'select-tool-button',
            iconLeft: <LayerForward />,
            onClick: moveForwardHandler,
        },
        {
            text: localeContext.locale.localization.elementsListTool.frontLayerTool,
            id: 'text-tool-button',
            iconLeft: <LayerForeground />,
            onClick: moveForegroundHandler,
        },
        {
            text: localeContext.locale.localization.elementsListTool.backwardLayerTool,
            id: '',
            iconLeft: <LayerBackward />,
            onClick: moveBackwardHandler,
        },
        {
            text: localeContext.locale.localization.elementsListTool.backLayerTool,
            id: '',
            iconLeft: <LayerBackground />,
            onClick: moveBackgroundHandler,
        },
    ];

    useEffect(() => {
        const onKeyDownHandler = (event: KeyboardEvent) => {
            if (event.code === 'Escape') props.setListSwitcher();
        };

        document.addEventListener('keydown', onKeyDownHandler);
        return () => {
            document.removeEventListener('keydown', onKeyDownHandler);
        };
    }, [localeContext]);

    return (
        <>
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
        </>
    );
}

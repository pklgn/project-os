import { LocaleContext, LocaleContextType } from '../../../App';
import { BaseSyntheticEvent, useContext } from 'react';

import { Button, ButtonProps } from '../../common/Button/Button';
import { useDispatch } from 'react-redux';
import { TextColor } from '../../common/icons/TextColor/TextColor';
import ToolTip from '../../common/ToolTip/ToolTip';
import {
    dispatchChangeTextsColorAction,
    dispatchChangeTextsSizeAction,
    dispatchChangeTextsStyleAction,
    dispatchKeepModelAction,
} from '../../../app_model/redux_model/dispatchers';
import { ColorInput } from '../../common/ColorInput/ColorInput';

export function TextToolsList(): JSX.Element {
    const localeContext: LocaleContextType = useContext(LocaleContext);

    const dispatch = useDispatch();

    const changeTextColorHandler = (e: BaseSyntheticEvent) => {
        dispatchChangeTextsColorAction(dispatch)(e.target.value);
        dispatchKeepModelAction(dispatch)();
        e.stopPropagation();
    };

    const changeTextSizeHandler = (e: BaseSyntheticEvent) => {
        dispatchChangeTextsSizeAction(dispatch)(e.target.value);
        dispatchKeepModelAction(dispatch)();
        e.stopPropagation();
    };

    const changeTextStyleHandler = (e: BaseSyntheticEvent) => {
        dispatchChangeTextsStyleAction(dispatch)(e.target.value);
        dispatchKeepModelAction(dispatch)();
        e.stopPropagation();
    };

    const textToolsButtonInfo: ButtonProps[] = [
        {
            text: localeContext.locale.localization.elementsListTool.changeTextColor,
            id: 'text-color-tool-button',
            iconLeft: <ColorInput onInput={changeTextColorHandler} children={TextColor()} />,
            onClick: changeTextColorHandler,
        },
        {
            text: localeContext.locale.localization.elementsListTool.changeTextSize,
            id: 'text-size-tool-button',
            iconLeft: <ColorInput onInput={changeTextColorHandler} children={TextColor()} />,
            onClick: changeTextSizeHandler,
        },
        {
            text: localeContext.locale.localization.elementsListTool.changeTextStyle,
            id: 'text-style-tool-button',
            iconLeft: <ColorInput onInput={changeTextColorHandler} children={TextColor()} />,
            onClick: changeTextStyleHandler,
        },
    ];

    return (
        <>
            {textToolsButtonInfo.map((buttonInfo, index) => {
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
        </>
    );
}

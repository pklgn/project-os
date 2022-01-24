import { LocaleContext, LocaleContextType } from '../../../App';
import { BaseSyntheticEvent, useContext } from 'react';

import { Button, ButtonProps } from '../../common/Button/Button';
import { useDispatch } from 'react-redux';
import { TextColor } from '../../common/icons/TextColor/TextColor';
import ToolTip from '../../common/ToolTip/ToolTip';
import {
    dispatchChangeTextsColorAction,
    dispatchChangeTextsStyleAction,
    dispatchKeepModelAction,
    dispatchTextsSizeDown,
    dispatchTextsSizeUp,
} from '../../../app_model/redux_model/dispatchers';
import { ColorInput } from '../../common/ColorInput/ColorInput';
import { TextStyle } from '../../common/icons/TextStyle/TextStyle';
import { TextSizeUp } from '../../common/icons/TextSizeUp/TextSizeUp';
import { TextSizeDown } from '../../common/icons/TextSizeDown/TextSizeDown';

export function TextToolsList(): JSX.Element {
    const localeContext: LocaleContextType = useContext(LocaleContext);

    const dispatch = useDispatch();

    const changeTextColorHandler = (e: BaseSyntheticEvent) => {
        dispatchChangeTextsColorAction(dispatch)(e.target.value);
        dispatchKeepModelAction(dispatch)();
        e.stopPropagation();
    };

    const textSizeUpHandler = (e: BaseSyntheticEvent) => {
        dispatchTextsSizeUp(dispatch)();
        dispatchKeepModelAction(dispatch)();
        e.stopPropagation();
    };

    const textSizeDownHandler = (e: BaseSyntheticEvent) => {
        dispatchTextsSizeDown(dispatch)();
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
            iconLeft: (
                <ColorInput onInput={changeTextColorHandler}>
                    <TextColor />
                </ColorInput>
            ),
            onClick: changeTextColorHandler,
        },
        {
            text: localeContext.locale.localization.elementsListTool.changeTextSize,
            id: 'text-size-tool-button',
            iconLeft: <TextSizeUp />,
            onClick: textSizeUpHandler,
        },
        {
            text: localeContext.locale.localization.elementsListTool.changeTextSize,
            id: 'text-size-tool-button',
            iconLeft: <TextSizeDown />,
            onClick: textSizeDownHandler,
        },
        {
            text: localeContext.locale.localization.elementsListTool.changeTextStyle,
            id: 'text-style-tool-button',
            iconLeft: (
                <ColorInput onInput={changeTextColorHandler}>
                    <TextStyle />
                </ColorInput>
            ),
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

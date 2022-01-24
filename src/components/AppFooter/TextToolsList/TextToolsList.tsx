import { LocaleContext, LocaleContextType } from '../../../App';
import { BaseSyntheticEvent, useContext } from 'react';

import { Button, ButtonProps } from '../../common/Button/Button';
import { useDispatch } from 'react-redux';
import { TextColor } from '../../common/icons/TextColor/TextColor';
import ToolTip from '../../common/ToolTip/ToolTip';
import { dispatchChangeTextsColorAction, dispatchKeepModelAction } from '../../../app_model/redux_model/dispatchers';

export function TextToolsList(): JSX.Element {
    const localeContext: LocaleContextType = useContext(LocaleContext);

    const dispatch = useDispatch();
    const changeTextColorHandler = (e: BaseSyntheticEvent) => {
        dispatchChangeTextsColorAction(dispatch)(e.target.value)
        dispatchKeepModelAction(dispatch)();
        e.stopPropagation();
    };

    const textToolsButtonInfo: ButtonProps[] = [
        {
            text: localeContext.locale.localization.elementsListTool.changeTextColor,
            id: 'text-tool-button',
            iconLeft: <TextColor />,
            onClick: changeTextColorHandler,
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

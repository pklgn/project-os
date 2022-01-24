import { LocaleContext, LocaleContextType } from '../../../App';
import React, { BaseSyntheticEvent, useContext, useState } from 'react';

import { Button, ButtonProps } from '../../common/Button/Button';

import ToolTip from '../../common/ToolTip/ToolTip';
import { BorderColor } from '../../common/icons/BorderColor/BorderColor';
import { FillColor } from '../../common/icons/FillColor/FillColor';
import {
    dispatchChangeFiguresBorderColorAction,
    dispatchChangeFiguresBorderWidthAction,
    dispatchChangeFiguresColorAction,
    dispatchChangeSelectedSlidesBackground,
    dispatchKeepModelAction,
} from '../../../app_model/redux_model/dispatchers';
import { getActiveElementsIds } from '../../../app_model/model/element_actions';
import { store } from '../../../app_model/redux_model/store';
import { ColorInput } from '../../common/ColorInput/ColorInput';
import { useDispatch } from 'react-redux';
import { BorderWidth } from '../../common/icons/BorderWidth/BorderWidth';
import { ToddlerInput } from '../../common/ToddlerInput/ToddlerInput';

enum commonList {
    DEFAULT = 'DEFAULT',
    BORDER_WIDTH = 'BORDER_WIDTH',
}

export function FigureToolsList(): JSX.Element {
    const localeContext: LocaleContextType = useContext(LocaleContext);

    const dispatch = useDispatch();
    const [listSwitcher, setListSwitcher] = useState(commonList.DEFAULT);

    const callbackHandler = () => {
        setListSwitcher(commonList.DEFAULT);
    };

    const [timeOuted, setTimeOuted] = useState(false);
    const onChangeBorderHandler = (e: BaseSyntheticEvent) => {
        if (!timeOuted) {
            setTimeOuted(true);
            setTimeout(() => {
                const el = e.target as HTMLInputElement;
                if (getActiveElementsIds(store.getState().model).length) {
                    dispatchChangeFiguresBorderColorAction(dispatch)(el.value);
                } else {
                    dispatchChangeSelectedSlidesBackground(dispatch)({ src: '', color: el.value });
                }
                setTimeOuted(false);
            }, 50);
            setTimeout(() => {
                dispatchKeepModelAction(dispatch)();
            }, 1000);
        }
        e.stopPropagation();
    };

    const onChangeFillHandler = (e: BaseSyntheticEvent) => {
        if (!timeOuted) {
            setTimeOuted(true);
            setTimeout(() => {
                const el = e.target as HTMLInputElement;
                if (getActiveElementsIds(store.getState().model).length) {
                    dispatchChangeFiguresColorAction(dispatch)(el.value);
                } else {
                    dispatchChangeSelectedSlidesBackground(dispatch)({ src: '', color: el.value });
                }
                setTimeOuted(false);
            }, 50);
            setTimeout(() => {
                dispatchKeepModelAction(dispatch)();
            }, 1000);
        }
        e.stopPropagation();
    };

    const figureToolsButtonInfo: ButtonProps[] = [
        {
            text: localeContext.locale.localization.elementsListTool.changeBorderColor,
            id: 'border-color-tool-button',
            iconLeft: (
                <ColorInput onInput={onChangeBorderHandler}>
                    <BorderColor />
                </ColorInput>
            ),
        },
        {
            text: localeContext.locale.localization.elementsListTool.changeFigureColor,
            id: 'fill-color-button',
            iconLeft: (
                <ColorInput onInput={onChangeFillHandler}>
                    <FillColor />
                </ColorInput>
            ),
        },
        {
            text: localeContext.locale.localization.elementsListTool.changeFigureBorderWidth,
            id: 'border-width-button',
            iconLeft: <BorderWidth />,
            onClick: () => setListSwitcher(commonList.BORDER_WIDTH),
        },
    ];

    const onChangeHandler = (e: BaseSyntheticEvent) => {
        e.stopPropagation();
        dispatchChangeFiguresBorderWidthAction(dispatch)(e.target.value);
        dispatchKeepModelAction(dispatch)();
    };

    return (
        <>
            {(() => {
                switch (listSwitcher) {
                    case commonList.DEFAULT:
                        return figureToolsButtonInfo.map((buttonInfo, index) => {
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
                    case commonList.BORDER_WIDTH:
                        return (
                            <ToddlerInput
                                onChangeHandler={onChangeHandler}
                                setListSwitcher={callbackHandler}
                                label={localeContext.locale.localization.toddlerTools.width}
                                min="1"
                                max="10"
                                step="0.5"
                            />
                        );
                }
            })()}
        </>
    );
}

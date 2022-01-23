import styles from './FigureToolsList.module.css';

import { LocaleContext, LocaleContextType } from '../../../App';
import React, { useContext, useEffect, useState } from 'react';

import { Button, ButtonProps } from '../../common/Button/Button';

import { useDispatch } from 'react-redux';
import ToolTip from '../../common/ToolTip/ToolTip';
import { BorderColor } from '../../common/icons/BorderColor/BorderColor';
import { FillColor } from '../../common/icons/FillColor/FillColor';

enum commonList {
    DEFAULT = 'DEFAULT',
    REORDER = 'REORDER',
    OPACITY = 'OPACITY',
}

export function FigureToolsList(): JSX.Element {
    const localeContext: LocaleContextType = useContext(LocaleContext);

    const dispatch = useDispatch();

    const figureToolsButtonInfo: ButtonProps[] = [
        {
            text: localeContext.locale.localization.elementsListTool.cursorTool,
            id: 'border-color-tool-button',
            iconLeft: <BorderColor />,
            onClick: () => {},
        },
        {
            text: localeContext.locale.localization.elementsListTool.textTool,
            id: 'fill-color-button',
            iconLeft: <FillColor />,
        },
    ];

    return (
        <>
            {figureToolsButtonInfo.map((buttonInfo, index) => {
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

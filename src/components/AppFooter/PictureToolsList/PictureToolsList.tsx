import { LocaleContext, LocaleContextType } from '../../../App';
import React, { BaseSyntheticEvent, useContext, useState } from 'react';

import { Button, ButtonProps } from '../../common/Button/Button';

import ToolTip from '../../common/ToolTip/ToolTip';
import { useDispatch } from 'react-redux';

export function PictureToolsList(): JSX.Element {
    const localeContext: LocaleContextType = useContext(LocaleContext);

    const dispatch = useDispatch();

    // const [timeOuted, setTimeOuted] = useState(false);
    // const onChangeHandler = (e: BaseSyntheticEvent) => {
    //     e.stopPropagation();
    //     if (!timeOuted) {
    //         setTimeOuted(true);
    //         setTimeout(() => {
    //             const el = e.target as HTMLInputElement;
    //             if (getActiveElementsIds(store.getState().model).length) {
    //                 dispatchChangeFiguresColorAction(dispatch)(el.value);
    //             } else {
    //                 dispatchChangeSelectedSlidesBackground(dispatch)({ src: '', color: el.value });
    //             }
    //             setTimeOuted(false);
    //         }, 50);
    //         setTimeout(() => {
    //             dispatchKeepModelAction(dispatch)();
    //         }, 1000);
    //     }
    // };

    const pictureToolsButtonInfo: ButtonProps[] = [];

    return (
        <>
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
        </>
    );
}

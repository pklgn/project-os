import styles from './TextToolsList.module.css';

import { LocaleContext, LocaleContextType } from '../../../App';
import { BaseSyntheticEvent, useContext, useEffect, useState } from 'react';

import { Button, ButtonProps } from '../../common/Button/Button';
import { useDispatch } from 'react-redux';
import { TextColor } from '../../common/icons/TextColor/TextColor';
import ToolTip from '../../common/ToolTip/ToolTip';
import { dispatchKeepModelAction } from '../../../app_model/redux_model/dispatchers';
// import {
//     dispatchChangeTextContentAction,
//     dispatchChangeTextsColorAction,
// } from '../../../app_model/redux_model/dispatchers';
// import { dispatchSetChosenElementsTypeAction } from '../../../app_model/redux_model/dispatchers';
import { ReorderToolsList } from '../ReorderToolsList/ReorderToolsList';
import { ColorInput } from '../../common/ColorInput/ColorInput';
import { getActiveElementsIds } from '../../../app_model/model/element_actions';
import { store } from '../../../app_model/redux_model/store';
// import { dispatchRemoveSelectedElementsAction } from '../../../app_model/redux_model/dispatchers';

export function TextToolsList(): JSX.Element {
    const localeContext: LocaleContextType = useContext(LocaleContext);

    const dispatch = useDispatch();

    const removeSelectedElementsHandler = () => {
        // dispatchRemoveSelectedElementsAction(dispatch)();
        dispatchKeepModelAction(dispatch)();
    };

    const changeTextColorHandler = () => {
        // dispatchChangeTextsColorAction(dispatch)('black');
        dispatchKeepModelAction(dispatch)();
    };

    const noneChosenElementsHandler = () => {
        // dispatchSetChosenElementsTypeAction(dispatch)('NONE');
    };

    useEffect(() => {
        const revocationHandler = (event: KeyboardEvent) => {
            if (event.code === 'Escape') {
                noneChosenElementsHandler();
            }
        };
        document.addEventListener('keydown', revocationHandler);

        return () => {
            document.removeEventListener('keydown', revocationHandler);
        };
    }, []);

    const [timeOuted, setTimeOuted] = useState(false);
    const onChangeHandler = (e: BaseSyntheticEvent) => {
        if (!timeOuted) {
            setTimeOuted(true);
            setTimeout(() => {
                const el = e.target as HTMLInputElement;
                if (getActiveElementsIds(store.getState().model).length) {
                    // dispatchSetElementsColorAction(el.value);
                } else {
                    // dispatchSetSlideBackgroundColorAction({ src: '', color: el.value });
                }
                dispatchKeepModelAction(dispatch)();
                setTimeOuted(false);
            }, 1000);
        }
        // setDragging(true);
    };

    const textToolsButtonInfo: ButtonProps[] = [
        {
            text: localeContext.locale.localization.elementsListTool.changeTextColor,
            id: 'text-tool-button',
            iconLeft: <TextColor />,
            onClick: changeTextColorHandler,
        },
        {
            text: localeContext.locale.localization.elementsListTool.removeElementTool,
            id: 'fawfawfaw',
            iconLeft: <ColorInput onInput={onChangeHandler} />,
            onClick: () => {},
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

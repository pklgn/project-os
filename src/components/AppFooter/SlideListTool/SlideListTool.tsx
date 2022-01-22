import styles from './SlideListTool.module.css';
import { useContext, useEffect } from 'react';

import { Button, ButtonProps } from '../../common/Button/Button';
import { AddSlideIcon } from '../../common/icons/AddSlide/AddSlide';
import { DeleteSlideIcon } from '../../common/icons/DeleteSlide/DeleteSlide';
import ToolTip from '../../common/ToolTip/ToolTip';

import { LocaleContext } from '../../../App';

import {
    dispatchActiveViewAreaAction,
    dispatchAddSlideAction,
    dispatchDeleteSlideAction,
    dispatchKeepModelAction,
} from '../../../app_model/redux_model/dispatchers';
import { getActiveViewArea } from '../../../app_model/view_model/active_view_area_actions';
import { useDispatch } from 'react-redux';
import { store } from '../../../app_model/redux_model/store';

export function SlideListTool(): JSX.Element {
    const localeContext = useContext(LocaleContext);

    const dispatch = useDispatch();

    const addSlideButtonFunction = () => {
        dispatchAddSlideAction(dispatch)();
        dispatchKeepModelAction(dispatch)();
    };

    const deleteSelectedSlidesButtonFunction = () => {
        dispatchDeleteSlideAction(dispatch)();
        dispatchKeepModelAction(dispatch)();
    };

    useEffect(() => {
        const onKeyDownHandler = (e: KeyboardEvent) => {
            if (e.ctrlKey && e.code === 'KeyM') {
                dispatchAddSlideAction(dispatch)();
                dispatchKeepModelAction(dispatch)();
                if (getActiveViewArea(store.getState().viewModel) !== 'SLIDE_LIST') {
                    dispatchActiveViewAreaAction(dispatch)('SLIDE_LIST');
                }
            }
        };

        document.addEventListener('keydown', onKeyDownHandler);

        return () => {
            document.removeEventListener('keydown', onKeyDownHandler);
        };
    }, [dispatch]);

    const buttonsInfo = [
        {
            text: localeContext.locale.localization.slideListTool.addSlide,
            id: 'add-slide-button',
            iconLeft: <AddSlideIcon color="#ffa322" />,
            onMouseUp: addSlideButtonFunction,
            cssMix: { margin: '0 5px' },
        },
        {
            text: localeContext.locale.localization.slideListTool.deleteSlide,
            id: 'delete-slide-button',
            iconLeft: <DeleteSlideIcon color="#ffa322" />,
            onMouseUp: deleteSelectedSlidesButtonFunction,
            cssMix: { margin: '0 5px' },
        },
    ] as ButtonProps[];

    return (
        <div className={styles['slides-list-tools']}>
            {buttonsInfo.map((info, index) => {
                return (
                    <ToolTip
                        key={index}
                        id={info.id}
                        title={info.text ? info.text : 'None'}
                        position="above"
                        child={
                            <Button
                                type={info.type}
                                state={info.state}
                                id={info.id}
                                optionalText={info.optionalText}
                                iconLeft={info.iconLeft}
                                iconRight={info.iconRight}
                                cssMix={info.cssMix}
                                onClick={info.onClick}
                                onMouseUp={info.onMouseUp}
                            />
                        }
                    />
                );
            })}
        </div>
    );
}

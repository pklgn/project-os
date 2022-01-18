import styles from './SlideListTool.module.css';
import { useContext, useEffect } from 'react';

import { Button, ButtonProps } from '../../common/Button/Button';
import { AddSlideIcon } from '../../common/icons/AddSlide/AddSlide';
import { DeleteSlideIcon } from '../../common/icons/DeleteSlide/DeleteSlide';
import ToolTip from '../../common/ToolTip/ToolTip';

import { LocaleContext } from '../../../App';

import {
    addSlide,
    deleteSelectedSlides,
} from '../../../app_model/redux_model/actions_model/action_creators/slide_action_creators';
import { bindActionCreators } from 'redux';
import { keepModelAction } from '../../../app_model/redux_model/actions_model/action_creators/editor_action_creators';
import { useDispatch } from 'react-redux';

export function SlideListTool(): JSX.Element {
    const localeContext = useContext(LocaleContext);

    const dispatch = useDispatch();
    const dispatchAddSlideAction = bindActionCreators(addSlide, dispatch);
    const dispatchDeleteSlideAction = bindActionCreators(deleteSelectedSlides, dispatch);
    const dispatchKeepModelAction = bindActionCreators(keepModelAction, dispatch);

    const addSlideButtonFunction = () => {
        dispatchAddSlideAction();
        dispatchKeepModelAction();
    };

    const deleteSelectedSlidesButtonFunction = () => {
        dispatchDeleteSlideAction();
        dispatchKeepModelAction();
    };

    useEffect(() => {
        const onKeyDownHandler = (e: KeyboardEvent) => {
            if (e.ctrlKey && e.code === 'KeyM') {
                dispatchAddSlideAction();
                dispatchKeepModelAction();
            }
        };

        document.addEventListener('keydown', onKeyDownHandler);

        return () => {
            document.removeEventListener('keydown', onKeyDownHandler);
        };
    }, [dispatchAddSlideAction, dispatchKeepModelAction]);

    const buttonsInfo = [
        {
            text: localeContext.locale.localization.slideListTool.addSlide,
            id: 'add-slide-button',
            iconLeft: <AddSlideIcon color="#ffa322" />,
            onMouseUp: addSlideButtonFunction,
        },
        {
            text: localeContext.locale.localization.slideListTool.deleteSlide,
            id: 'delete-slide-button',
            iconLeft: <DeleteSlideIcon color="#ffa322" />,
            onMouseUp: deleteSelectedSlidesButtonFunction,
        },
    ] as ButtonProps[];

    return (
        <div className={styles['slides-list-tools']}>
            {buttonsInfo.map((info, index) => {
                return (
                    <ToolTip
                        key={index}
                        title={info.text ? info.text : 'None'}
                        toolTipId={`${info.id}-tool-tip`}
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

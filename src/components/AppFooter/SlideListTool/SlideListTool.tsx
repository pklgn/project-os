import styles from './SlideListTool.module.css';
import { useContext, useEffect } from 'react';

import { Button, ButtonProps } from '../../common/Button/Button';
import { AddSlideIcon } from '../../common/icons/AddSlide/AddSlide';
import { DeleteSlideIcon } from '../../common/icons/DeleteSlide/DeleteSlide';
import ToolTip from '../../common/ToolTip/ToolTip';

import { LocaleContext } from '../../../App';

import { addSlide, deleteSelectedSlides } from '../../../redux/action-creators/slideActionCreators';
import { bindActionCreators } from 'redux';
import { keepModelAction } from '../../../redux/action-creators/editorActionCreators';
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
            type: 'default',
            text: localeContext.locale.localization.slideListTool.addSlide,
            state: 'independently',
            id: 'add-slide-button',
            optionalText: undefined,
            iconLeft: <AddSlideIcon color="#ffa322" />,
            cssMix: { padding: '3px 3px' },
            onClick: addSlideButtonFunction,
        },
        {
            type: 'default',
            text: localeContext.locale.localization.slideListTool.deleteSlide,
            state: 'independently',
            id: 'delete-slide-button',
            iconLeft: <DeleteSlideIcon color="#ffa322" />,
            cssMix: { padding: '3px 3px' },
            onClick: deleteSelectedSlidesButtonFunction,
        },
    ] as ButtonProps[];

    return (
        <div className={styles['slides-list-tools']}>
            {buttonsInfo.map((info, index) => {
                return (
                    <ToolTip
                        key={index}
                        title={info.text ? info.text : 'None'}
                        position="above"
                        child={
                            <Button
                                key={index}
                                type={info.type}
                                text={undefined}
                                state={info.state}
                                id={info.id}
                                optionalText={info.optionalText}
                                iconLeft={info.iconLeft}
                                iconRight={info.iconRight}
                                cssMix={info.cssMix}
                                onClick={info.onClick}
                            />
                        }
                    />
                );
            })}
        </div>
    );
}

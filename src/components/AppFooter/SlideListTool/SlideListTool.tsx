import styles from './SlideListTool.module.css';
import { useEffect, useRef, useState } from 'react';

import { Button, ButtonProps } from '../../common/Button/Button';
import { AddSlideIcon } from '../../common/icons/AddSlide/AddSlide';
import { DeleteSlideIcon } from '../../common/icons/DeleteSlide/DeleteSlide';

import { addSlide, deleteSelectedSlides } from '../../../redux/action-creators/slideActionCreators';
import { bindActionCreators } from 'redux';
import { keepModelAction } from '../../../redux/action-creators/editorActionCreators';
import { useDispatch } from 'react-redux';

type SlideListToolProps = {
    foo: () => void | undefined;
};

export function SlideListTool(_: SlideListToolProps): JSX.Element {
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
            id: 'add-slide-button',
            iconLeft: <AddSlideIcon color="#ffa322" />,
            onMouseUp: addSlideButtonFunction,
        },
        {
            id: 'delete-slide-button',
            iconLeft: <DeleteSlideIcon color="#ffa322" />,
            onMouseUp: deleteSelectedSlidesButtonFunction,
        },
    ] as ButtonProps[];

    return (
        <div className={styles['slides-list-tools']}>
            {buttonsInfo.map((info, index) => {
                return (
                    <Button
                        key={index}
                        type={info.type}
                        text={info.text}
                        state={info.state}
                        id={info.id}
                        optionalText={info.optionalText}
                        iconLeft={info.iconLeft}
                        iconRight={info.iconRight}
                        cssMix={info.cssMix}
                        onClick={info.onClick}
                        onMouseUp={info.onMouseUp}
                    />
                );
            })}
        </div>
    );
}

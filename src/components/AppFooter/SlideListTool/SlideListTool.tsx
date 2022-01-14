import styles from './SlideListTool.module.css';
import { useContext, useEffect } from 'react';

import { Button } from '../../common/Button/Button';
import { AddSlideIcon } from '../../common/icons/AddSlide/AddSlide';
import { DeleteIcon } from '../../common/icons/Delete/Delete';

import { LocaleContext, LocaleContextType } from '../../../App';

import { addSlide, deleteSelectedSlides } from '../../../redux/action-creators/slideActionCreators';
import { bindActionCreators } from 'redux';
import { keepModelAction } from '../../../redux/action-creators/editorActionCreators';
import { useDispatch } from 'react-redux';

type SlideListToolProps = {
    foo: () => void | undefined;
};

export function SlideListTool(_: SlideListToolProps): JSX.Element {
    const localeContext: LocaleContextType = useContext(LocaleContext);

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

    return (
        <div className={styles['slides-list-tools']}>
            <Button
                type={'default'}
                text={undefined}
                state={'disabled'}
                id="add-slide-button"
                shouldStopPropagation={false}
                optionalText={undefined}
                iconLeft={<AddSlideIcon color="#ffa322" />}
                iconRight={undefined}
                cssMix={undefined}
                onClick={() => {
                    undefined;
                }}
            />
            <Button
                type={'default'}
                text={undefined}
                state={'disabled'}
                id="delete-slide-button"
                shouldStopPropagation={false}
                optionalText={undefined}
                iconLeft={<DeleteIcon color="#ffa322" />}
                iconRight={undefined}
                cssMix={undefined}
                onClick={() => {
                    undefined;
                }}
            />
        </div>
    );
}

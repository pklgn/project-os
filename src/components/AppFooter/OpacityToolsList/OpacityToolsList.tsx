import styles from './OpacityToolsList.module.css';

import { BaseSyntheticEvent, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
    dispatchChangeElementsOpacityAction,
    dispatchKeepModelAction,
} from '../../../app_model/redux_model/dispatchers';

type OpacityToolsListProps = {
    setListSwitcher: () => void;
};

export function OpacityToolsList(props: OpacityToolsListProps): JSX.Element {
    const dispatch = useDispatch();

    const onChangeHandler = (event: BaseSyntheticEvent) => {
        dispatchChangeElementsOpacityAction(dispatch)(event.target.value);
        dispatchKeepModelAction(dispatch)();
    };

    useEffect(() => {
        const onKeyDownHandler = (event: KeyboardEvent) => {
            if (event.code === 'Escape') props.setListSwitcher();
        };

        document.addEventListener('keydown', onKeyDownHandler);
        return () => {
            document.removeEventListener('keydown', onKeyDownHandler);
        };
    }, []);

    return (
        <>
            <div className={styles['opacity-wrapper']}>
                <div color="white" className={styles['opacity-text']}>
                    Opacity
                </div>
                <div className={styles['opacity-picker']}>
                    <div className={styles['range-picker']}>
                        <div className={styles['range-toddler-wrapper']}>
                            <div className={styles['range-toddler-content']}></div>
                            <input
                                type="range"
                                className={styles['range-toddler']}
                                min="0.1"
                                max="1"
                                step="0.05"
                                onChange={onChangeHandler}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

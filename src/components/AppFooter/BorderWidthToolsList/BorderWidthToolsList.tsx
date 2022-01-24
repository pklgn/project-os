import styles from './BorderWidthToolsList.module.css';

import { BaseSyntheticEvent, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
    dispatchChangeElementsOpacityAction,
    dispatchKeepModelAction,
} from '../../../app_model/redux_model/dispatchers';

type BorderWidthToolsListProps = {
    setListSwitcher: () => void;
};

export function BorderWidthToolsList(props: BorderWidthToolsListProps): JSX.Element {
    const dispatch = useDispatch();

    const onChangeHandler = (e: BaseSyntheticEvent) => {
        e.stopPropagation();
        dispatchChangeElementsOpacityAction(dispatch)(e.target.value);
        dispatchKeepModelAction(dispatch)();
    };

    useEffect(() => {
        const onKeyDownHandler = (event: KeyboardEvent) => {
            event.stopPropagation();
            if (event.code === 'Escape') props.setListSwitcher();
        };

        document.addEventListener('keydown', onKeyDownHandler);
        return () => {
            document.removeEventListener('keydown', onKeyDownHandler);
        };
    }, []);

    return (
        <>
            <div className={styles['border-width-wrapper']}>
                <div color="white" className={styles['border-width-text']}>
                    Border width
                </div>
                <div className={styles['border-width-picker']}>
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

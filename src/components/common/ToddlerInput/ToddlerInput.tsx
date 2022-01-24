import styles from './ToddlerInput.module.css';

import { BaseSyntheticEvent, useEffect } from 'react';

type ToddlerInputProps = {
    setListSwitcher: () => void;
    onChangeHandler: (e: BaseSyntheticEvent) => void;
};

export function ToddlerInput(props: ToddlerInputProps): JSX.Element {

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
                                onChange={props.onChangeHandler}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

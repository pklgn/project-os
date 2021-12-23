import { BaseSyntheticEvent, useEffect, useState } from 'react';

import { AdaptiveInputField } from '../common/AdaptiveInputField/AdaptiveInputField';
import { AppLogoPng } from '../common/icons/AppLogo';
import { ToolBar } from '../common/ToolBar/ToolBar';

import styles from './AppTop.module.css';

export function AppTop(): JSX.Element {

    const [presentationTitle, _] = useState('');

    useEffect(() => {
    }, []);

    const onChangeHandler = (_: BaseSyntheticEvent) => {
    }

    return (
        <div
            className={styles['top-bar']}
        >
            <div className={styles["logo-container"]}>
                <AppLogoPng width={55} height={55} type={'default'} />
            </div>
            <ToolBar />
            <AdaptiveInputField value={presentationTitle} onChange={onChangeHandler} />
        </div>
    );
}
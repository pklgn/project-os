import { BaseSyntheticEvent } from 'react';

import { AdaptiveInputField } from '../common/AdaptiveInputField/AdaptiveInputField';
import { AppLogoPng } from '../common/icons/AppLogo';
import { ToolBar } from '../common/ToolBar/ToolBar';

import styles from './AppTop.module.css';

import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { RootState } from '../../redux/reducers/rootReducer';
import { changePresentationTitle } from '../../redux/action-creators/presentationActionCreators';

export function AppTop(): JSX.Element {
    const state = useSelector((state: RootState) => state.presentation);
    const dispatch = useDispatch();
    const dispatchPresentationName = bindActionCreators(changePresentationTitle, dispatch);

    const onChangeHandler = (event: BaseSyntheticEvent) => {
        dispatchPresentationName(event.target.value);
    }

    return (
        <div
            className={styles['top-bar']}
        >
            <div className={styles["logo-container"]}>
                <AppLogoPng width={55} height={55} type={'default'} />
            </div>
            <ToolBar />
            <AdaptiveInputField value={state.presentation.name} onChange={onChangeHandler} />
        </div>
    );
}
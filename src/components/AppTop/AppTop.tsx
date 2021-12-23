import { BaseSyntheticEvent, useEffect, useState } from 'react';

import { AdaptiveInputField } from '../common/AdaptiveInputField/AdaptiveInputField';
import { AppLogoPng } from '../common/icons/AppLogo';
import { ToolBar } from '../common/ToolBar/ToolBar';

import { connect } from 'react-redux';
import { Editor } from '../../model/types';
import { store } from '../../redux/store';

import styles from './AppTop.module.css';

export function AppTop(): JSX.Element {

    const [presentationTitle, setPresentationTitle] = useState('');

    useEffect(() => {
        setPresentationTitle(store.getState().presentation.name);
    }, []);

    const onChangeHandler = (event: BaseSyntheticEvent) => {
        mapDispatchToProps(store.dispatch, event.target.value).changePresentationTitle();
        setPresentationTitle(store.getState().presentation.name);
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

function mapStateToProps(state: Editor) {
    return {
        name: state.presentation.name
    }
}

const mapDispatchToProps = (dispatch: any, title: string) => {
    return {
        changePresentationTitle: () => dispatch(changePresentationTitle(title))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppTop);
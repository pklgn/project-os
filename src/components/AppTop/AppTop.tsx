import { BaseSyntheticEvent, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Editor } from '../../model/types';
import { changePresentationTitle } from '../../redux/actions';
import { store } from '../../redux/store';
import { AdaptiveInputField } from '../common/AdaptiveInputField/AdaptiveInputField';
import { AppLogoSVG } from '../common/icons/AppLogo';
import { ToolBar } from '../common/ToolBar/ToolBar';
import styles from './AppTop.module.css';

export function AppTop(): JSX.Element {

    const [presentationTitle, setPresentationTitle] = useState('');

    useEffect(() => {
        setPresentationTitle(store.getState().presentation.name);
    });

    const onChangeHandler = (event: BaseSyntheticEvent) => {
        mapDispatchToProps(store.dispatch, event.target.value).changePresentationTitle();
        setPresentationTitle(store.getState().presentation.name);
    }
    const onClickHandler = (_: BaseSyntheticEvent) => {
        console.log(store.getState().presentation.name);
    }

    return (
        <div
            className={styles['top-bar']}
            onClick={onClickHandler}
        >
            <div className={styles["logo-container"]}>
                <AppLogoSVG width={55} height={55} type={'default'} />
            </div>
            <input
                className={styles.input}
                type="text"
                value={presentationTitle}
                onChange={onChangeHandler}
            />
            <ToolBar />
        </div>
    );
}

function mapStateToProps(state: Editor) {
    return {
        name: state.presentation.name
    }
};

const mapDispatchToProps = (dispatch: any, title: string) => {
    return {
        changePresentationTitle: () => dispatch(changePresentationTitle(title))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppTop);
import { BaseSyntheticEvent } from 'react';

import { bindActionCreators } from 'redux';
import { changePresentationTitle } from '../../app_model/redux_model/actions_model/action_creators/presentation_action_creators';
import { RootState } from '../../app_model/redux_model/reducers/root_reducer';
import { useDispatch, useSelector } from 'react-redux';

import { AdaptiveInputField } from '../common/AdaptiveInputField/AdaptiveInputField';
import { AppLogoPng } from '../common/icons/AppLogo';
import { Button } from '../common/Button/Button';
import { FullscreenIcon } from '../common/icons/Fullscreen/Fullscreen';
import { GlobeIcon } from '../common/icons/GlobeInternationalization/GlobeInternationalizationIcon';

import styles from './AppTop.module.css';

export function AppTop(): JSX.Element {
    const state = useSelector((state: RootState) => state);

    const dispatch = useDispatch();
    const dispatchPresentationName = bindActionCreators(changePresentationTitle, dispatch);

    const onChangeNameInputHandler = (event: BaseSyntheticEvent) => {
        dispatchPresentationName(event.target.value);
        document.title = event.target.value + ' - Oladies&Slides';
    };

    const onBlurNameInputHandler = (event: BaseSyntheticEvent) => {
        if (!event.target.value) {
            dispatchPresentationName('Оладушек');
            document.title = event.target.value + 'Оладушек - Oladies&Slides';
        }
    };

    return (
        <div className={styles['top-bar']}>
            <div className={styles['top-bar-menu']}>
                <AppLogoPng width={55} height={55} type={'default'} />
                <Button text={'Файл'} id="file-button" />
                <span />
                <AdaptiveInputField
                    id="name-input-field"
                    maxLength={20}
                    value={state.model.presentation.name}
                    onChange={onChangeNameInputHandler}
                    onBlur={onBlurNameInputHandler}
                />
                <Button id="fullscreen-button" iconLeft={<FullscreenIcon color="#ffa322" />} />
                <Button id="lang-button" iconLeft={<GlobeIcon width={32} height={32} color="#ffa322" />} />
            </div>
        </div>
    );
}

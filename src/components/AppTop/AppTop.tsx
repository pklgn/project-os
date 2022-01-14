import { BaseSyntheticEvent } from 'react';

import { bindActionCreators } from 'redux';
import { changePresentationTitle } from '../../redux/action-creators/presentationActionCreators';
import { RootState } from '../../redux/reducers/rootReducer';
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
                <Button
                    type={'default'}
                    text={'Файл'}
                    state={'disabled'}
                    id="file-button"
                    shouldStopPropagation={false}
                    optionalText={undefined}
                    iconLeft={undefined}
                    iconRight={undefined}
                    cssMix={undefined}
                    onClick={() => {
                        undefined;
                    }}
                />
                <span />
                <AdaptiveInputField
                    id="name-input-field"
                    maxLength={20}
                    value={state.model.presentation.name}
                    onChange={onChangeNameInputHandler}
                    onBlur={onBlurNameInputHandler}
                />
                <Button
                    type={'default'}
                    text={undefined}
                    state={'disabled'}
                    id="fullscreen-button"
                    shouldStopPropagation={false}
                    optionalText={undefined}
                    iconLeft={<FullscreenIcon color="#ffa322" />}
                    iconRight={undefined}
                    cssMix={{ padding: '3px 2px 3px 3px' }}
                    onClick={() => {
                        undefined;
                    }}
                />
                <Button
                    type={'default'}
                    state={'disabled'}
                    id="lang-button"
                    shouldStopPropagation={false}
                    text={undefined}
                    optionalText={undefined}
                    iconLeft={<GlobeIcon width={30} height={30} color="#ffa322" />}
                    iconRight={undefined}
                    cssMix={{ borderRadius: '50%' }}
                    onClick={() => {
                        undefined;
                    }}
                />
            </div>
        </div>
    );
}

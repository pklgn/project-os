import styles from './AppTop.module.css';

import { BaseSyntheticEvent, useContext } from 'react';

import { RootState } from '../../app_model/redux_model/reducers/root_reducer';
import { useDispatch, useSelector } from 'react-redux';

import { AdaptiveInputField } from '../common/AdaptiveInputField/AdaptiveInputField';
import { AppLogoPng } from '../common/icons/AppLogo';
import { Button, ButtonProps } from '../common/Button/Button';
import { FullscreenIcon } from '../common/icons/Fullscreen/Fullscreen';
import { GlobeIcon } from '../common/icons/GlobeInternationalization/GlobeInternationalizationIcon';
import ToolTip from '../common/ToolTip/ToolTip';

import { LocaleContextType, LocaleContext } from '../../App';

import { dispatchActiveViewAreaAction, dispatchPresentationName } from '../../app_model/redux_model/dispatchers';
import { getActiveViewArea } from '../../app_model/view_model/active_view_area_actions';
import { store } from '../../app_model/redux_model/store';

export function AppTop(): JSX.Element {
    const state = useSelector((state: RootState) => state);
    const localeContext: LocaleContextType = useContext(LocaleContext);

    const dispatch = useDispatch();

    const onChangeNameInputHandler = (event: BaseSyntheticEvent) => {
        if (getActiveViewArea(store.getState().viewModel) === 'APP_TOP') {
            dispatchPresentationName(dispatch)(event.target.value);
            document.title = event.target.value + ' - Oladies&Slides';
        } else {
            event.target.blur();
        }
    };

    const onBlurNameInputHandler = (event: BaseSyntheticEvent) => {
        if (!event.target.value) {
            dispatchPresentationName(dispatch)(localeContext.locale.localization.presentationName);
            document.title =
                event.target.value + `${localeContext.locale.localization.presentationName} - Oladies&Slides`;
        }
        console.log(getActiveViewArea(store.getState().viewModel));
    };

    const miscButtonsInfo: ButtonProps[] = [
        {
            id: 'fullscreen-button',
            text: localeContext.locale.localization.appTopButtons.fullscreen,
            iconLeft: <FullscreenIcon color="#ffa322" />,
        },
        {
            id: 'lang-button',
            text: localeContext.locale.localization.appTopButtons.l18n,
            iconLeft: <GlobeIcon width={32} height={32} color="#ffa322" />,
            type: 'round',
        },
    ];

    const onFocus = () => {
        if (getActiveViewArea(store.getState().viewModel) !== 'APP_TOP') {
            dispatchActiveViewAreaAction(dispatch)('APP_TOP');
        }
    };

    return (
        <div className={styles['top-bar']}>
            <div className={styles['top-bar-menu']}>
                <ToolTip
                    title={'Hello'}
                    id="img"
                    position={'under'}
                    child={<AppLogoPng width={55} height={55} type={'default'} />}
                />
                <Button text={localeContext.locale.localization.appTopButtons.file} id="file-button" />
                <ToolTip
                    title={localeContext.locale.localization.appTopButtons.presentationNameInputField}
                    id="input"
                    position={'under'}
                    child={
                        <AdaptiveInputField
                            id="name-input-field"
                            maxLength={20}
                            value={state.model.presentation.name}
                            onFocusCapture={onFocus}
                            onChange={onChangeNameInputHandler}
                            onBlur={onBlurNameInputHandler}
                        />
                    }
                />
                {miscButtonsInfo.map((info, index) => {
                    return (
                        <ToolTip
                            title={info.text ?? 'None'}
                            id={info.id}
                            position={'under'}
                            key={index}
                            child={<Button id={info.id} key={index} iconLeft={info.iconLeft} type={info.type} />}
                        />
                    );
                })}
            </div>
        </div>
    );
}

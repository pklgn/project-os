import styles from './AppTop.module.css';

import { BaseSyntheticEvent, useContext } from 'react';

import { RootState } from '../../app_model/redux_model/reducers/root_reducer';
import { useDispatch, useSelector } from 'react-redux';

import { AdaptiveInputField } from '../common/AdaptiveInputField/AdaptiveInputField';
import { AppLogoPng } from '../common/icons/AppLogo';
import { Button, ButtonProps } from '../common/Button/Button';
import { GlobeIcon } from '../common/icons/GlobeInternationalization/GlobeInternationalizationIcon';
import ToolTip from '../common/ToolTip/ToolTip';

import { getL18nObject } from '../../l18n/l18n';
import { LocaleContext } from '../../App';

import { DropdownMenu } from '../common/DropdownMenu/DropdownMenu';
import { getFullScreenDropdownMenu } from './getFullScreenDropdownMenu';
import { FileDropdownMenu } from './FileDropdownMenu';

import {
    dispatchActiveViewAreaAction,
    dispatchPresentationName,
    dispatchSetEditorModeAction,
} from '../../app_model/redux_model/dispatchers';
import { getActiveViewArea } from '../../app_model/view_model/active_view_area_actions';
import { store } from '../../app_model/redux_model/store';

export function AppTop(): JSX.Element {
    const state = useSelector((state: RootState) => state);

    const localeContext = useContext(LocaleContext);
    const dispatch = useDispatch();

    const toggleLocaleContext = () => {
        if (localeContext.locale.currLocale === 'en_EN') {
            localeContext.changeLocale?.(getL18nObject('ru_RU'));
        } else if (localeContext.locale.currLocale === 'ru_RU') {
            localeContext.changeLocale?.(getL18nObject('en_EN'));
        }
    };

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
    };

    const onPreviewerButtonCurrentAction = () => {
        dispatchSetEditorModeAction(dispatch)('SHOW_FROM_CURRENT_SLIDE');
    };
    const onPreviewerButtonFirstAction = () => {
        dispatchSetEditorModeAction(dispatch)('SHOW_FROM_FIRST_SLIDE');
    };

    const miscButtonsInfo: ButtonProps[] = [
        {
            id: 'lang-button',
            text: localeContext.locale.localization.appTopButtons.l18n,
            iconLeft: <GlobeIcon width={28} height={28} color="#ffa322" />,
            type: 'round',
            cssMix: { margin: '0 5px' },
            onMouseUp: toggleLocaleContext,
        },
    ];

    const onFocus = () => {
        if (getActiveViewArea(store.getState().viewModel) !== 'APP_TOP') {
            dispatchActiveViewAreaAction(dispatch)('APP_TOP');
        }
    };

    const fullScreenDropdownProps = getFullScreenDropdownMenu({
        firstSlideStartHandler: onPreviewerButtonFirstAction,
        currSlideStartHandler: onPreviewerButtonCurrentAction,
        locale: localeContext.locale,
    });

    return (
        <div className={styles['top-bar']}>
            <AppLogoPng width={55} height={55} type={'default'} />
            <div className={styles['top-bar-menu']}>
                <DropdownMenu data={FileDropdownMenu.data} position={FileDropdownMenu.position} />
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
                            cssMix={{ margin: '0 5px 0 auto' }}
                        />
                    }
                />
                <DropdownMenu data={fullScreenDropdownProps.data} position={fullScreenDropdownProps.position} />
                {miscButtonsInfo.map((info, index) => {
                    return (
                        <ToolTip
                            title={info.text ?? 'None'}
                            id={info.id}
                            position={'under'}
                            key={index}
                            child={
                                <Button
                                    id={info.id}
                                    key={index}
                                    iconLeft={info.iconLeft}
                                    type={info.type}
                                    cssMix={info.cssMix}
                                    onMouseUp={info.onMouseUp}
                                />
                            }
                        />
                    );
                })}
            </div>
        </div>
    );
}

import styles from './AppTop.module.css';

import { BaseSyntheticEvent, useContext } from 'react';

import { bindActionCreators } from 'redux';
import { changePresentationTitle } from '../../app_model/redux_model/actions_model/action_creators/presentation_action_creators';
import { RootState } from '../../app_model/redux_model/reducers/root_reducer';
import { useDispatch, useSelector } from 'react-redux';

import { AdaptiveInputField } from '../common/AdaptiveInputField/AdaptiveInputField';
import { AppLogoPng } from '../common/icons/AppLogo';
import { Button, ButtonProps } from '../common/Button/Button';
import { GlobeIcon } from '../common/icons/GlobeInternationalization/GlobeInternationalizationIcon';
import ToolTip from '../common/ToolTip/ToolTip';

import { LocaleContextType, LocaleContext } from '../../App';
import { DropdownMenu } from '../common/DropdownMenu/DropdownMenu';
import { FullScreenDropdownMenu } from './FullScreenDropdownMenu';
import { FileDropdownMenu } from './FileDropdownMenu';

export function AppTop(): JSX.Element {
    const state = useSelector((state: RootState) => state);
    const localeContext: LocaleContextType = useContext(LocaleContext);

    const dispatch = useDispatch();
    const dispatchPresentationName = bindActionCreators(changePresentationTitle, dispatch);

    const onChangeNameInputHandler = (event: BaseSyntheticEvent) => {
        dispatchPresentationName(event.target.value);
        document.title = event.target.value + ' - Oladies&Slides';
    };

    const onBlurNameInputHandler = (event: BaseSyntheticEvent) => {
        if (!event.target.value) {
            dispatchPresentationName(localeContext.locale.localization.presentationName);
            document.title =
                event.target.value + `${localeContext.locale.localization.presentationName} - Oladies&Slides`;
        }
    };

    const miscButtonsInfo: ButtonProps[] = [
        {
            id: 'lang-button',
            text: localeContext.locale.localization.appTopButtons.l18n,
            iconLeft: <GlobeIcon width={28} height={28} color="#ffa322" />,
            type: 'round',
            cssMix: { margin: '0 5px' },
        },
    ];

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
                            onChange={onChangeNameInputHandler}
                            onBlur={onBlurNameInputHandler}
                            cssMix={{ margin: '0 5px 0 auto' }}
                        />
                    }
                />
                <DropdownMenu data={FullScreenDropdownMenu.data} position={FullScreenDropdownMenu.position} />
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
                                />
                            }
                        />
                    );
                })}
            </div>
        </div>
    );
}

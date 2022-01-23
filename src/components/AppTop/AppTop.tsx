import styles from './AppTop.module.css';

import { BaseSyntheticEvent, useContext, useRef } from 'react';

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
import { getFileDropdownMenu } from './getFileDropdownMenu';

import {
    dispatchActiveViewAreaAction,
    dispatchAddFigureAction,
    dispatchAddTextAction,
    dispatchKeepModelAction,
    dispatchPresentationName,
    dispatchSetEditorModeAction,
    dispatchSetWindowRatio,
    dispatchSlideToContainerRatio,
} from '../../app_model/redux_model/dispatchers';
import { getActiveViewArea } from '../../app_model/view_model/active_view_area_actions';
import { store } from '../../app_model/redux_model/store';
import { savePresentationAsJson } from '../../app_model/model/editor_actions';
import { initEditor } from '../../app_model/model/init_model_action';
import { UploadPresentationInput } from '../common/ToolBar/UploadPresentationInput';
import { generateUUId } from '../../app_model/model/utils/uuid';
import { UploadPictureInput } from '../common/ToolBar/UploadPictureInput';
import { FigureInfo, FigureShape } from '../../app_model/model/types';

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

    const uploadPresentationInputRef = useRef<HTMLInputElement>(null);
    const handleUploadPresentationClick = () => {
        uploadPresentationInputRef.current?.click();
    };

    const uploadImageInputRef = useRef<HTMLInputElement>(null);
    const handleUploadImageClick = () => {
        uploadImageInputRef.current?.click();
    };

    const saveAsJSONFunction = () => {
        const presentation = store.getState().model.presentation;
        if (presentation.slidesList.length === 0) {
            alert(localeContext.locale.localization.errors['noSlidesToSave']);
        } else {
            savePresentationAsJson({
                ...initEditor(),
                presentation: store.getState().model.presentation,
            });
        }
    };
    const mockFigure: FigureInfo = {
        shape: FigureShape.Rectangle,
        xy: {
            x: 0,
            y: 0,
        },
    };

    const handleAddText = () => {
        dispatchAddTextAction(dispatch)({ x: 0, y: 0 });
        dispatchKeepModelAction(dispatch)();
    };

    const handle16To9RatioClick = () => {
        dispatchSetWindowRatio(dispatch)('16/9');
        dispatchSlideToContainerRatio(dispatch)(0.7);
    };

    const handle16To10RatioClick = () => {
        dispatchSetWindowRatio(dispatch)('16/10');
        dispatchSlideToContainerRatio(dispatch)(0.6);
    };

    const handle4To3RatioClick = () => {
        dispatchSetWindowRatio(dispatch)('4/3');
        dispatchSlideToContainerRatio(dispatch)(0.5);
    };

    const fileDropdownMenu = getFileDropdownMenu({
        locale: localeContext.locale,
        handleScreenRatio: {
            handle16To9Ratio: handle16To9RatioClick,
            handle16To10Ratio: handle16To10RatioClick,
            handle4To3Ratio: handle4To3RatioClick,
        },
        handleOpenFile: handleUploadPresentationClick,
        handleSaveFile: saveAsJSONFunction,
        handleInsert: {
            text: handleAddText,
            image: handleUploadImageClick,
            figure: {
                circle: () => undefined,
                triangle: () => undefined,
                rectangle: () => dispatchAddFigureAction(dispatch)(mockFigure),
            },
        },
    });

    return (
        <div className={styles['top-bar']}>
            <AppLogoPng width={55} height={55} type={'default'} />
            <div className={styles['top-bar-menu']}>
                <DropdownMenu {...fileDropdownMenu} />
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
                <DropdownMenu {...fullScreenDropdownProps} />
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
            <UploadPresentationInput key={generateUUId()} inputRef={uploadPresentationInputRef} />
            <UploadPictureInput key={generateUUId()} inputRef={uploadImageInputRef} />
        </div>
    );
}

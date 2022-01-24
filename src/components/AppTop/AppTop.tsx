import styles from './AppTop.module.css';

import { BaseSyntheticEvent, useContext, useRef } from 'react';

import { AdaptiveInputField } from '../common/AdaptiveInputField/AdaptiveInputField';
import { AppLogoPng } from '../common/icons/AppLogo';
import { ButtonProps } from '../common/Button/Button';
import { GlobeIcon } from '../common/icons/GlobeInternationalization/GlobeInternationalizationIcon';
import ToolTip from '../common/ToolTip/ToolTip';

import { getL18nObject, l18nLocale } from '../../l18n/l18n';
import { LocaleContext } from '../../App';

import { DropdownMenu } from '../common/DropdownMenu/DropdownMenu';
import { getChangeLocaleDropDownMenu, getFileDropdownMenu, getFullScreenDropdownMenu } from './dropdown_creators';

import { FigureInfo, FigureShape } from '../../app_model/model/types';

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
import { RootState } from '../../app_model/redux_model/reducers/root_reducer';
import { useDispatch, useSelector } from 'react-redux';
import { store } from '../../app_model/redux_model/store';

import { getActiveViewArea } from '../../app_model/view_model/active_view_area_actions';
import {
    savePresentationAsJson,
    savePresentationAsPdf,
    setSelectedElementId,
} from '../../app_model/model/editor_actions';
import { initEditor } from '../../app_model/model/init_model_action';
import { generateUUId } from '../../app_model/model/utils/uuid';

import { UploadPresentationInput } from '../common/Uploaders/UploadPresentationInput';
import { UploadPictureInput } from '../common/Uploaders/UploadPictureInput';
import { getSlideAmount } from '../../app_model/model/slides_actions';

export function AppTop(): JSX.Element {
    const state = useSelector((state: RootState) => state);

    const localeContext = useContext(LocaleContext);
    const dispatch = useDispatch();

    const toggleLocaleContext = (key: l18nLocale) => {
        switch (key) {
            case 'ru_RU':
                return () => {
                    localeContext.changeLocale?.(getL18nObject('ru_RU'));
                };
            case 'en_EN':
                return () => {
                    localeContext.changeLocale?.(getL18nObject('en_EN'));
                };
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

    const changeLocaleDropDownProps = getChangeLocaleDropDownMenu({
        locale: localeContext.locale,
        setRussianLocale: toggleLocaleContext('ru_RU'),
        setEnglishLocale: toggleLocaleContext('en_EN'),
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
        const slidesAmount = getSlideAmount(store.getState().model);
        if (slidesAmount === 0) {
            alert(localeContext.locale.localization.errors.noSlidesToSave);
        } else {
            savePresentationAsJson({
                ...initEditor(),
                presentation: store.getState().model.presentation,
            });
        }
    };

    const handleAddText = () => {
        dispatchAddTextAction(dispatch)({ x: 0, y: 0 });
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

    const handleSavePdf = () => {
        const slidesAmount = getSlideAmount(store.getState().model);
        if (slidesAmount === 0) {
            alert(localeContext.locale.localization.errors.noSlidesToSave);
        } else {
            savePresentationAsPdf();
        }
    };

    const defaultFigure = (shape: FigureShape) => {
        return {
            shape,
            xy: {
                x: 0,
                y: 0,
            },
        };
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
        handleSavePdf: handleSavePdf,
        handleUploadImage: handleUploadImageClick,
        handleInsert: {
            text: handleAddText,
            image: handleUploadImageClick,
            figure: {
                circle: () => {
                    dispatchAddFigureAction(dispatch)(defaultFigure(FigureShape.Circle));
                    dispatchKeepModelAction(dispatch)();
                },
                triangle: () => {
                    dispatchAddFigureAction(dispatch)(defaultFigure(FigureShape.Triangle));
                    dispatchKeepModelAction(dispatch)();
                },
                rectangle: () => {
                    dispatchAddFigureAction(dispatch)(defaultFigure(FigureShape.Rectangle));
                    dispatchKeepModelAction(dispatch)();
                },
            },
        },
    });

    return (
        <div className={styles['top-bar']}>
            <div className={styles['top-bar-menu']}>
                <AppLogoPng width={55} height={55} type={'default'} />
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
                <ToolTip
                    title={localeContext.locale.localization.appTopButtons.fullscreen}
                    id={'full-screen-dropdown'}
                    position={'under'}
                    child={<DropdownMenu {...fullScreenDropdownProps} />}
                />
                <ToolTip
                    title={localeContext.locale.localization.appTopButtons.l18n}
                    id={'locale-dropdown'}
                    position={'under'}
                    child={<DropdownMenu {...changeLocaleDropDownProps} />}
                />
            </div>
            <UploadPresentationInput key={generateUUId()} inputRef={uploadPresentationInputRef} />
            <UploadPictureInput key={generateUUId()} inputRef={uploadImageInputRef} />
        </div>
    );
}

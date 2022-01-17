import styles from './ToolBar.module.css';

import { Button } from '../Button/Button';
import { DropdownMenu } from '../DropdownMenu/DropdownMenu';

import { getL18nObject } from '../../../l18n/l18n';
import { LocaleContext } from '../../../App';
import { useContext, useRef } from 'react';

import { addFigure } from '../../../redux/action-creators/figureActionCreators';
import { addText } from '../../../redux/action-creators/textActionCreators';
import { addSlide } from '../../../redux/action-creators/slideActionCreators';
import { bindActionCreators } from 'redux';
import { getSlideAmount } from '../../../model/slidesActions';
import { keepModelAction, setEditorMode } from '../../../redux/action-creators/editorActionCreators';
import { store } from '../../../redux/store';
import { useDispatch } from 'react-redux';
import { initEditor } from '../../../model/initModelActions';
import { savePresentationAsJson } from '../../../model/editorActions';
import { generateUUId } from '../../../model/utils/uuid';
import { UploadPresentationInput } from './UploadPresentationInput';
import { UploadPictureInput } from './UploadPictureInput';

import { FigureShape } from '../../../model/types';

export function ToolBar() {
    const func = () => undefined;

    const localeContext = useContext(LocaleContext);

    const toggleLocaleContext = () => {
        if (localeContext.changeLocale !== undefined) {
            if (localeContext.locale.currLocale === 'en_EN') {
                localeContext.changeLocale(getL18nObject('ru_RU'));
            } else if (localeContext.locale.currLocale === 'ru_RU') {
                localeContext.changeLocale(getL18nObject('en_EN'));
            }
        }
    };

    const uploadPresentationInputRef = useRef<HTMLInputElement>(null);
    const handleUploadPresentationClick = () => {
        uploadPresentationInputRef.current?.click();
    };

    const dispatch = useDispatch();
    const dispatchAddFigureAction = bindActionCreators(addFigure, dispatch);
    const dispatchAddTextAction = bindActionCreators(addText, dispatch);
    const dispatchAddSlideAction = bindActionCreators(addSlide, dispatch);
    const dispatchKeepModelAction = bindActionCreators(keepModelAction, dispatch);
    const dispatchSetEditorAction = bindActionCreators(setEditorMode, dispatch);

    const addTextButtonFunction = () => {
        if (getSlideAmount(store.getState().model) === 0) {
            dispatchAddSlideAction();
        }
        dispatchAddTextAction({
            x: 25,
            y: 25,
        });
    };

    const startSlideShowFromFirstSlideButtonFunction = () => {
        dispatchSetEditorAction('show-from-first-slide');
    };

    const startSlideShowFromCurrentSlideButtonFunction = () => {
        dispatchSetEditorAction('show-from-current-slide');
    };

    // const addCircleButtonFunction = () => {
    //     dispatchAddFigureAction({ shape: FigureShape.Circle, x: 0, y: 0 });
    //     dispatchKeepModelAction();
    // };

    // const addRectangleButtonFunction = () => {
    //     dispatchAddFigureAction({ shape: FigureShape.Rectangle, x: 0, y: 0 });
    //     dispatchKeepModelAction();
    // };

    // const addTriangleButtonFunction = () => {
    //     dispatchAddFigureAction({ shape: FigureShape.Triangle, x: 0, y: 0 });
    //     dispatchKeepModelAction();
    // };

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

    /* eslint-disable react/jsx-key */
    return (
        <div className={styles['top-bar']}>
            <UploadPresentationInput key={generateUUId()} inputRef={uploadPresentationInputRef} />
            <UploadPictureInput key={generateUUId()} inputRef={uploadImageInputRef} />
        </div>
    );
    /* eslint-enable */
}

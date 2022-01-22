import { getL18nObject } from '../../../l18n/l18n';
import { LocaleContext } from '../../../App';
import { useContext, useRef } from 'react';

import { addFigure } from '../../../app_model/redux_model/actions_model/action_creators/figure_action_creators';
import { addText } from '../../../app_model/redux_model/actions_model/action_creators/text_action_creators';
import { addSlide } from '../../../app_model/redux_model/actions_model/action_creators/slide_action_creators';
import { bindActionCreators } from 'redux';
import { getSlideAmount } from '../../../app_model/model/slides_actions';
import { keepModelAction } from '../../../app_model/redux_model/actions_model/action_creators/editor_action_creators';

import { useDispatch } from 'react-redux';
import { initEditor } from '../../../app_model/model/init_model_action';
import { savePresentationAsJson } from '../../../app_model/model/editor_actions';
import { store } from '../../../app_model/redux_model/store';
import { generateUUId } from '../../../app_model/model/utils/uuid';
import { UploadPresentationInput } from './UploadPresentationInput';
import { UploadPictureInput } from './UploadPictureInput';

export function ToolBar() {
    const localeContext = useContext(LocaleContext);

    const uploadPresentationInputRef = useRef<HTMLInputElement>(null);
    const handleUploadPresentationClick = () => {
        uploadPresentationInputRef.current?.click();
    };

    const dispatch = useDispatch();
    const dispatchAddFigureAction = bindActionCreators(addFigure, dispatch);
    const dispatchAddTextAction = bindActionCreators(addText, dispatch);
    const dispatchAddSlideAction = bindActionCreators(addSlide, dispatch);
    const dispatchKeepModelAction = bindActionCreators(keepModelAction, dispatch);

    const addTextButtonFunction = () => {
        if (getSlideAmount(store.getState().model) === 0) {
            dispatchAddSlideAction();
        }
        dispatchAddTextAction({
            x: 25,
            y: 25,
        });
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

    /* eslint-disable react/jsx-key */
    return (
        <>
            <UploadPresentationInput key={generateUUId()} inputRef={uploadPresentationInputRef} />
            <UploadPictureInput key={generateUUId()} inputRef={uploadImageInputRef} />
        </>
    );
    /* eslint-enable */
}

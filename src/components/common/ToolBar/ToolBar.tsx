import styles from './ToolBar.module.css';

import { Button } from '../Button/Button';
import { DropdownMenu } from '../DropdownMenu/DropdownMenu';

import { getL18nObject } from '../../../l18n/l18n';
import { LocaleContext } from '../../../App';
import { BaseSyntheticEvent, useContext, useRef } from 'react';

import { addText } from '../../../redux/action-creators/textActionCreators';
import { addSlide } from '../../../redux/action-creators/slideActionCreators';
import { bindActionCreators } from 'redux';
import { getSlideAmount } from '../../../model/slidesActions';
import {
    keepModelAction,
    setEditorMode,
    uploadPresentationFromJson,
} from '../../../redux/action-creators/editorActionCreators';
import { store } from '../../../redux/store';
import { useDispatch } from 'react-redux';
import { initEditor } from '../../../model/initModelActions';
import { savePresentationAsJson } from '../../../model/editorActions';
import { addPicture } from '../../../redux/action-creators/pictureActionCreators';
import { generateUUId } from '../../../model/utils/uuid';
import { UploadPresentationInput } from './UploadPresentationInput';
import { UploadPictureInput } from './UploadPictureInput';

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
    const dispatchAddTextAction = bindActionCreators(addText, dispatch);
    const dispatchAddSlideAction = bindActionCreators(addSlide, dispatch);
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

    const uploadImageInputRef = useRef<HTMLInputElement>(null);
    const handleUploadImageClick = () => {
        uploadImageInputRef.current?.click();
    };

    const saveAsJSONFunction = () =>
        savePresentationAsJson({
            ...initEditor(),
            presentation: store.getState().model.presentation,
        });

    /* eslint-disable react/jsx-key */
    return (
        <div className={styles['top-bar']}>
            <div className={styles['top-bar__button-list']}>
                <DropdownMenu
                    summoningButtonText={localeContext.locale.localization.file_word}
                    summoningButtonType="text"
                    summoningButtonPlace="above"
                    bottomBorderAfterElement={[2, 4]}
                    elementsArray={[
                        <DropdownMenu
                            summoningButtonText={localeContext.locale.localization.create_word}
                            summoningButtonType="textInSubMenu"
                            summoningButtonPlace="left"
                            bottomBorderAfterElement={undefined}
                            elementsArray={[
                                <Button
                                    text={localeContext.locale.localization.presentation_word}
                                    state="disabled"
                                    shouldStopPropagation={false}
                                    contentType="textInSubMenu"
                                    content={undefined}
                                    foo={func}
                                />,
                                <Button
                                    text={localeContext.locale.localization.document_word}
                                    state="disabled"
                                    shouldStopPropagation={false}
                                    contentType="textInSubMenu"
                                    content={undefined}
                                    foo={func}
                                />,
                                <Button
                                    text={localeContext.locale.localization.spreadsheet_word}
                                    state="disabled"
                                    shouldStopPropagation={false}
                                    contentType="textInSubMenu"
                                    content={undefined}
                                    foo={func}
                                />,
                            ]}
                        />,
                        <Button
                            text={localeContext.locale.localization.open_word}
                            state="disabled"
                            shouldStopPropagation={false}
                            contentType="textInSubMenu"
                            content={{
                                hotkeyInfo: 'Ctrl+O',
                                icon: <div></div>,
                            }}
                            foo={handleUploadPresentationClick}
                        />,
                        <DropdownMenu
                            summoningButtonText={localeContext.locale.localization['create-copy']}
                            summoningButtonType="textInSubMenu"
                            summoningButtonPlace="left"
                            bottomBorderAfterElement={undefined}
                            elementsArray={[
                                <Button
                                    text={localeContext.locale.localization['all-presentation']}
                                    state="disabled"
                                    shouldStopPropagation={false}
                                    contentType="textInSubMenu"
                                    content={undefined}
                                    foo={func}
                                />,
                                <Button
                                    text={localeContext.locale.localization['chosen-slides']}
                                    state="disabled"
                                    shouldStopPropagation={false}
                                    contentType="textInSubMenu"
                                    content={undefined}
                                    foo={func}
                                />,
                            ]}
                        />,
                        <DropdownMenu
                            summoningButtonText={localeContext.locale.localization.email}
                            summoningButtonType="textInSubMenu"
                            summoningButtonPlace="left"
                            bottomBorderAfterElement={undefined}
                            elementsArray={[
                                <Button
                                    text={localeContext.locale.localization['send-to-email']}
                                    state="disabled"
                                    shouldStopPropagation={false}
                                    contentType="textInSubMenu"
                                    content={undefined}
                                    foo={func}
                                />,
                                <Button
                                    text={localeContext.locale.localization['write-to-co-authors']}
                                    state="disabled"
                                    shouldStopPropagation={false}
                                    contentType="textInSubMenu"
                                    content={undefined}
                                    foo={func}
                                />,
                            ]}
                        />,
                        <DropdownMenu
                            summoningButtonText={localeContext.locale.localization.download_word}
                            summoningButtonType="textInSubMenu"
                            summoningButtonPlace="left"
                            bottomBorderAfterElement={undefined}
                            elementsArray={[
                                <Button
                                    text={localeContext.locale.localization['pdf-file-format']}
                                    state="disabled"
                                    shouldStopPropagation={false}
                                    contentType="textInSubMenu"
                                    content={undefined}
                                    foo={func}
                                />,
                                <Button
                                    text={localeContext.locale.localization['regular-text-format']}
                                    state="disabled"
                                    shouldStopPropagation={false}
                                    contentType="textInSubMenu"
                                    content={undefined}
                                    foo={saveAsJSONFunction}
                                />,
                            ]}
                        />,
                        <Button
                            text={localeContext.locale.localization.rename_word}
                            state="disabled"
                            shouldStopPropagation={false}
                            contentType="textInSubMenu"
                            content={undefined}
                            foo={func}
                        />,
                        <Button
                            text={localeContext.locale.localization.relocate_word}
                            state="disabled"
                            shouldStopPropagation={false}
                            contentType="textInSubMenu"
                            content={undefined}
                            foo={func}
                        />,
                        <Button
                            text={localeContext.locale.localization.delete_word}
                            state="disabled"
                            shouldStopPropagation={false}
                            contentType="textInSubMenu"
                            content={undefined}
                            foo={func}
                        />,
                    ]}
                />
                <DropdownMenu
                    summoningButtonText={localeContext.locale.localization.add_word}
                    summoningButtonType="text"
                    summoningButtonPlace="above"
                    bottomBorderAfterElement={undefined}
                    elementsArray={[
                        <DropdownMenu
                            summoningButtonText={localeContext.locale.localization.image_word}
                            summoningButtonType="textInSubMenu"
                            summoningButtonPlace="left"
                            bottomBorderAfterElement={undefined}
                            elementsArray={[
                                <Button
                                    text={localeContext.locale.localization['upload-from-computer']}
                                    state="disabled"
                                    shouldStopPropagation={false}
                                    contentType="textInSubMenu"
                                    content={undefined}
                                    foo={handleUploadImageClick}
                                />,
                                <Button
                                    text={localeContext.locale.localization['put-url']}
                                    state="disabled"
                                    shouldStopPropagation={false}
                                    contentType="textInSubMenu"
                                    content={undefined}
                                    foo={handleUploadPresentationClick}
                                />,
                            ]}
                        />,
                        <Button
                            text={localeContext.locale.localization.text_word}
                            state="disabled"
                            shouldStopPropagation={false}
                            contentType="textInSubMenu"
                            content={undefined}
                            foo={addTextButtonFunction}
                        />,
                        <DropdownMenu
                            summoningButtonText={localeContext.locale.localization.figures_word}
                            summoningButtonType="textInSubMenu"
                            summoningButtonPlace="left"
                            bottomBorderAfterElement={undefined}
                            elementsArray={[
                                <Button
                                    text={localeContext.locale.localization.circle_word}
                                    state="disabled"
                                    shouldStopPropagation={false}
                                    contentType="textInSubMenu"
                                    content={undefined}
                                    foo={func}
                                />,
                                <Button
                                    text={localeContext.locale.localization.triangle_word}
                                    state="disabled"
                                    shouldStopPropagation={false}
                                    contentType="textInSubMenu"
                                    content={undefined}
                                    foo={func}
                                />,
                                <Button
                                    text={localeContext.locale.localization['square-figure_word']}
                                    state="disabled"
                                    shouldStopPropagation={false}
                                    contentType="textInSubMenu"
                                    content={undefined}
                                    foo={func}
                                />,
                            ]}
                        />,
                    ]}
                />
                <DropdownMenu
                    summoningButtonText={localeContext.locale.localization['slide-show']}
                    summoningButtonType={'text'}
                    summoningButtonPlace={'above'}
                    bottomBorderAfterElement={undefined}
                    elementsArray={[
                        <Button
                            text={localeContext.locale.localization['slide-show-start-first-slide']}
                            state="disabled"
                            shouldStopPropagation={false}
                            contentType="textInSubMenu"
                            content={undefined}
                            foo={startSlideShowFromFirstSlideButtonFunction}
                        />,
                        <Button
                            text={localeContext.locale.localization['slide-show-start-current-slide']}
                            state="disabled"
                            shouldStopPropagation={false}
                            contentType="textInSubMenu"
                            content={undefined}
                            foo={startSlideShowFromCurrentSlideButtonFunction}
                        />,
                    ]}
                />
                <Button
                    text={localeContext.locale.localization['change-locale']}
                    state="default"
                    shouldStopPropagation={false}
                    contentType="text"
                    content={undefined}
                    foo={toggleLocaleContext}
                />
                <input type="file" accept={'.png, .jpeg'} className="fileUpload" onChange={addPictureButtonFunction} />
            </div>
            <UploadPresentationInput key={generateUUId()} inputRef={uploadPresentationInputRef} />
            <UploadPictureInput key={generateUUId()} inputRef={uploadImageInputRef} />
        </div>
    );
    /* eslint-enable */
}

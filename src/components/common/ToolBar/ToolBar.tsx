import { useContext, useState } from "react";
import { LocaleContext } from "../../../App";
import { getL18nObject } from "../../../l18n/l18n";
import { Button } from "../Button/Button";
import { DropdownMenu } from "../DropdownMenu/DropdownMenu";
import styles from "./ToolBar.module.css";

export function ToolBar() {

    const func = () => {
        console.log('ok!');
    }

    const localeContext = useContext(LocaleContext);

    const toggleLocaleContext = () => {
        if (localeContext.changeLocale !== undefined) {
            if (localeContext.locale.currLocale === 'en_EN') {
                localeContext.changeLocale(getL18nObject('ru_RU'));
            } else if (localeContext.locale.currLocale === 'ru_RU') {
                localeContext.changeLocale(getL18nObject('en_EN'));
            }
        }
    }
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
                                <Button text={localeContext.locale.localization.presentation_word} state='disabled' shouldStopPropagation={false} contentType='textInSubMenu' content={undefined} foo={func} />,
                                <Button text={localeContext.locale.localization.document_word} state='disabled' shouldStopPropagation={false} contentType='textInSubMenu' content={undefined} foo={func} />,
                                <Button text={localeContext.locale.localization.spreadsheet_word} state='disabled' shouldStopPropagation={false} contentType='textInSubMenu' content={undefined} foo={func} />
                            ]}
                        />,
                        <Button text={localeContext.locale.localization.open_word} state='disabled' shouldStopPropagation={false} contentType='textInSubMenu' content={{ hotkeyInfo: "Ctrl+O", icon: <div></div> }} foo={func} />,
                        <DropdownMenu
                            summoningButtonText={localeContext.locale.localization["create-copy"]}
                            summoningButtonType="textInSubMenu"
                            summoningButtonPlace="left"
                            bottomBorderAfterElement={undefined}
                            elementsArray={[
                                <Button text={localeContext.locale.localization["all-presentation"]} state='disabled' shouldStopPropagation={false} contentType='textInSubMenu' content={undefined} foo={func} />,
                                <Button text={localeContext.locale.localization["chosen-slides"]} state='disabled' shouldStopPropagation={false} contentType='textInSubMenu' content={undefined} foo={func} />
                            ]}
                        />,
                        <DropdownMenu
                            summoningButtonText={localeContext.locale.localization.email}
                            summoningButtonType="textInSubMenu"
                            summoningButtonPlace="left"
                            bottomBorderAfterElement={undefined}
                            elementsArray={[
                                <Button text={localeContext.locale.localization["send-to-email"]} state='disabled' shouldStopPropagation={false} contentType='textInSubMenu' content={undefined} foo={func} />,
                                <Button text={localeContext.locale.localization["write-to-co-authors"]} state='disabled' shouldStopPropagation={false} contentType='textInSubMenu' content={undefined} foo={func} />
                            ]}
                        />,
                        <DropdownMenu
                            summoningButtonText={localeContext.locale.localization.download_word}
                            summoningButtonType="textInSubMenu"
                            summoningButtonPlace="left"
                            bottomBorderAfterElement={undefined}
                            elementsArray={[
                                <Button text={localeContext.locale.localization["powerpoint-file-format"]} state='disabled' shouldStopPropagation={false} contentType='textInSubMenu' content={undefined} foo={func} />,
                                <Button text={localeContext.locale.localization["pdf-file-format"]} state='disabled' shouldStopPropagation={false} contentType='textInSubMenu' content={undefined} foo={func} />,
                                <Button text={localeContext.locale.localization["regular-text-format"]} state='disabled' shouldStopPropagation={false} contentType='textInSubMenu' content={undefined} foo={func} />
                            ]}
                        />,
                        <Button text={localeContext.locale.localization.rename_word} state='disabled' shouldStopPropagation={false} contentType='textInSubMenu' content={undefined} foo={func} />,
                        <Button text={localeContext.locale.localization.relocate_word} state='disabled' shouldStopPropagation={false} contentType='textInSubMenu' content={undefined} foo={func} />,
                        <Button text={localeContext.locale.localization.delete_word} state='disabled' shouldStopPropagation={false} contentType='textInSubMenu' content={undefined} foo={func} />
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
                                <Button text={localeContext.locale.localization["upload-from-computer"]} state='disabled' shouldStopPropagation={false} contentType='textInSubMenu' content={undefined} foo={func} />,
                                <Button text={localeContext.locale.localization["add-from-google-drive"]} state='disabled' shouldStopPropagation={false} contentType='textInSubMenu' content={undefined} foo={func} />,
                                <Button text={localeContext.locale.localization["put-url"]} state='disabled' shouldStopPropagation={false} contentType='textInSubMenu' content={undefined} foo={func} />
                            ]}
                        />,
                        <Button text={localeContext.locale.localization.text_word} state='disabled' shouldStopPropagation={false} contentType='textInSubMenu' content={undefined} foo={func} />,
                        <DropdownMenu
                            summoningButtonText={localeContext.locale.localization.figures_word}
                            summoningButtonType="textInSubMenu"
                            summoningButtonPlace="left"
                            bottomBorderAfterElement={undefined}
                            elementsArray={[
                                <Button text={localeContext.locale.localization.circle_word} state='disabled' shouldStopPropagation={false} contentType='textInSubMenu' content={undefined} foo={func} />,
                                <Button text={localeContext.locale.localization.triangle_word} state='disabled' shouldStopPropagation={false} contentType='textInSubMenu' content={undefined} foo={func} />,
                                <Button text={localeContext.locale.localization["square-figure_word"]} state='disabled' shouldStopPropagation={false} contentType='textInSubMenu' content={undefined} foo={func} />
                            ]}
                        />
                    ]}
                />
                <Button text={localeContext.locale.localization["slide-show"]} state='default' shouldStopPropagation={false} contentType='text' content={undefined} foo={func} />
                <Button text={localeContext.locale.localization["change-locale"]} state='default' shouldStopPropagation={false} contentType='text' content={undefined} foo={toggleLocaleContext} />
            </div>
        </div>
    );
    /* eslint-enable */
}
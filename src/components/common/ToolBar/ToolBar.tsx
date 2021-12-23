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

    const [localeContext, setLocaleContext] = useState(useContext(LocaleContext));

    const toggleLocaleContext = () => {
        if (localeContext.currLocale === 'en_EN') {
            setLocaleContext(getL18nObject('ru_RU'));
        } else if (localeContext.currLocale === 'ru_RU') {
            setLocaleContext(getL18nObject('en_EN'));
        }
    }

    return (
        <div className={styles['top-bar']}>
            <div className={styles['top-bar__button-list']}>
                <DropdownMenu
                    summoningButtonText={localeContext.localization.file_word}
                    summoningButtonType="text"
                    summoningButtonPlace="above"
                    bottomBorderAfterElement={[2, 4]}
                    elementsArray={[
                        <DropdownMenu
                            summoningButtonText={localeContext.localization.create_word}
                            summoningButtonType="textInSubMenu"
                            summoningButtonPlace="left"
                            bottomBorderAfterElement={undefined}
                            elementsArray={[
                                <Button text={localeContext.localization.presentation_word} state='disabled' contentType='textInSubMenu' content={undefined} foo={func} />,
                                <Button text={localeContext.localization.document_word} state='disabled' contentType='textInSubMenu' content={undefined} foo={func} />,
                                <Button text={localeContext.localization.spreadsheet_word} state='disabled' contentType='textInSubMenu' content={undefined} foo={func} />
                            ]}
                        />,
                        <Button text={localeContext.localization.open_word} state='disabled' contentType='textInSubMenu' content={{ hotkeyInfo: "Ctrl+O", icon: <div></div> }} foo={func} />,
                        <DropdownMenu
                            summoningButtonText={localeContext.localization["create-copy"]}
                            summoningButtonType="textInSubMenu"
                            summoningButtonPlace="left"
                            bottomBorderAfterElement={undefined}
                            elementsArray={[
                                <Button text={localeContext.localization["all-presentation"]} state='disabled' contentType='textInSubMenu' content={undefined} foo={func} />,
                                <Button text={localeContext.localization["chosen-slides"]} state='disabled' contentType='textInSubMenu' content={undefined} foo={func} />
                            ]}
                        />,
                        <DropdownMenu
                            summoningButtonText={localeContext.localization.email}
                            summoningButtonType="textInSubMenu"
                            summoningButtonPlace="left"
                            bottomBorderAfterElement={undefined}
                            elementsArray={[
                                <Button text={localeContext.localization["send-to-email"]} state='disabled' contentType='textInSubMenu' content={undefined} foo={func} />,
                                <Button text={localeContext.localization["write-to-co-authors"]} state='disabled' contentType='textInSubMenu' content={undefined} foo={func} />
                            ]}
                        />,
                        <DropdownMenu
                            summoningButtonText={localeContext.localization.download_word}
                            summoningButtonType="textInSubMenu"
                            summoningButtonPlace="left"
                            bottomBorderAfterElement={undefined}
                            elementsArray={[
                                <Button text={localeContext.localization["powerpoint-file-format"]} state='disabled' contentType='textInSubMenu' content={undefined} foo={func} />,
                                <Button text={localeContext.localization["pdf-file-format"]} state='disabled' contentType='textInSubMenu' content={undefined} foo={func} />,
                                <Button text={localeContext.localization["regular-text-format"]} state='disabled' contentType='textInSubMenu' content={undefined} foo={func} />
                            ]}
                        />,
                        <Button text={localeContext.localization.rename_word} state='disabled' contentType='textInSubMenu' content={undefined} foo={func} />,
                        <Button text={localeContext.localization.relocate_word} state='disabled' contentType='textInSubMenu' content={undefined} foo={func} />,
                        <Button text={localeContext.localization.delete_word} state='disabled' contentType='textInSubMenu' content={undefined} foo={func} />
                    ]}
                />
                <DropdownMenu
                    summoningButtonText={localeContext.localization.add_word}
                    summoningButtonType="text"
                    summoningButtonPlace="above"
                    bottomBorderAfterElement={undefined}
                    elementsArray={[
                        <DropdownMenu
                            summoningButtonText={localeContext.localization.image_word}
                            summoningButtonType="textInSubMenu"
                            summoningButtonPlace="left"
                            bottomBorderAfterElement={undefined}
                            elementsArray={[
                                <Button text={localeContext.localization["upload-from-computer"]} state='disabled' contentType='textInSubMenu' content={undefined} foo={func} />,
                                <Button text={localeContext.localization["add-from-google-drive"]} state='disabled' contentType='textInSubMenu' content={undefined} foo={func} />,
                                <Button text={localeContext.localization["put-url"]} state='disabled' contentType='textInSubMenu' content={undefined} foo={func} />
                            ]}
                        />,
                        <Button text={localeContext.localization.text_word} state='disabled' contentType='textInSubMenu' content={undefined} foo={func} />,
                        <DropdownMenu
                            summoningButtonText={localeContext.localization.figures_word}
                            summoningButtonType="textInSubMenu"
                            summoningButtonPlace="left"
                            bottomBorderAfterElement={undefined}
                            elementsArray={[
                                <Button text={localeContext.localization.circle_word} state='disabled' contentType='textInSubMenu' content={undefined} foo={func} />,
                                <Button text={localeContext.localization.triangle_word} state='disabled' contentType='textInSubMenu' content={undefined} foo={func} />,
                                <Button text={localeContext.localization["square-figure_word"]} state='disabled' contentType='textInSubMenu' content={undefined} foo={func} />
                            ]}
                        />
                    ]}
                />
                <Button text={localeContext.localization["slide-show"]} state='default' contentType='text' content={undefined} foo={func} />
                <Button text={localeContext.localization["change-locale"]} state='default' contentType='text' content={undefined} foo={toggleLocaleContext} />
            </div>
        </div>
    );
}
import { useContext, useState } from "react";
import { LocaleContext } from "../../App";
import { getL18nObject } from "../../l18n/l18n";
import { Button } from "../common/Button/Button";
import { DropdownMenu } from "../common/DropdownMenu/DropdownMenu";
import styles from "./TopBar.module.css";

function TopBar() {

    const func = () => {
        console.log('ok!');
    }

    const [localeContext, setLocaleContext] = useState(useContext(LocaleContext));
    let currLocale: string = 'ru_RU';

    const toggleLocaleContext = () => {
        console.log('i hate niggers!');
        if (currLocale === 'en_EN') {
            setLocaleContext(getL18nObject('ru_RU'));
            currLocale = 'ru_RU';
        } else {
            setLocaleContext(getL18nObject('en_EN'));
            currLocale = 'en_EN';
        }
    }

    return (
        <div className={styles['top-bar']}>
            <div className={styles['top-bar__button-list']}>
                <DropdownMenu
                    summoningButtonText={localeContext.file_word}
                    summoningButtonType="text"
                    summoningButtonPlace="above"
                    bottomBorderAfterElement={[2, 4]}
                    elementsArray={[
                        <DropdownMenu
                            summoningButtonText={localeContext.create_word}
                            summoningButtonType="textInSubMenu"
                            summoningButtonPlace="left"
                            bottomBorderAfterElement={undefined}
                            elementsArray={[
                                <Button text={localeContext.presentation_word} state='disabled' contentType='textInSubMenu' content={undefined} foo={func} />,
                                <Button text={localeContext.document_word} state='disabled' contentType='textInSubMenu' content={undefined} foo={func} />,
                                <Button text={localeContext.spreadsheet_word} state='disabled' contentType='textInSubMenu' content={undefined} foo={func} />
                            ]}
                        />,
                        <Button text={localeContext.open_word} state='disabled' contentType='textInSubMenu' content={{ hotkeyInfo: "Ctrl+O", icon: <div></div> }} foo={func} />,
                        <DropdownMenu
                            summoningButtonText={localeContext["create-copy"]}
                            summoningButtonType="textInSubMenu"
                            summoningButtonPlace="left"
                            bottomBorderAfterElement={undefined}
                            elementsArray={[
                                <Button text={localeContext["all-presentation"]} state='disabled' contentType='textInSubMenu' content={undefined} foo={func} />,
                                <Button text={localeContext["chosen-slides"]} state='disabled' contentType='textInSubMenu' content={undefined} foo={func} />
                            ]}
                        />,
                        <DropdownMenu
                            summoningButtonText={localeContext.email}
                            summoningButtonType="textInSubMenu"
                            summoningButtonPlace="left"
                            bottomBorderAfterElement={undefined}
                            elementsArray={[
                                <Button text={localeContext["send-to-email"]} state='disabled' contentType='textInSubMenu' content={undefined} foo={func} />,
                                <Button text={localeContext["write-to-co-authors"]} state='disabled' contentType='textInSubMenu' content={undefined} foo={func} />
                            ]}
                        />,
                        <DropdownMenu
                            summoningButtonText={localeContext.download_word}
                            summoningButtonType="textInSubMenu"
                            summoningButtonPlace="left"
                            bottomBorderAfterElement={undefined}
                            elementsArray={[
                                <Button text={localeContext["powerpoint-file-format"]} state='disabled' contentType='textInSubMenu' content={undefined} foo={func} />,
                                <Button text={localeContext["pdf-file-format"]} state='disabled' contentType='textInSubMenu' content={undefined} foo={func} />,
                                <Button text={localeContext["regular-text-format"]} state='disabled' contentType='textInSubMenu' content={undefined} foo={func} />
                            ]}
                        />,
                        <Button text={localeContext.rename_word}/* "Переименовать" */ state='disabled' contentType='textInSubMenu' content={undefined} foo={func} />,
                        <Button text={localeContext.relocate_word}/* "Переместить" */ state='disabled' contentType='textInSubMenu' content={undefined} foo={func} />,
                        <Button text={localeContext.delete_word}/* "Удалить" */ state='disabled' contentType='textInSubMenu' content={undefined} foo={func} />
                    ]}
                />
                <DropdownMenu
                    summoningButtonText={localeContext.add_word}
                    summoningButtonType="text"
                    summoningButtonPlace="above"
                    bottomBorderAfterElement={undefined}
                    elementsArray={[
                        <DropdownMenu
                            summoningButtonText={localeContext.image_word}
                            summoningButtonType="textInSubMenu"
                            summoningButtonPlace="left"
                            bottomBorderAfterElement={undefined}
                            elementsArray={[
                                <Button text={localeContext["upload-from-computer"]} state='disabled' contentType='textInSubMenu' content={undefined} foo={func} />,
                                <Button text={localeContext["add-from-google-drive"]} state='disabled' contentType='textInSubMenu' content={undefined} foo={func} />,
                                <Button text={localeContext["put-url"]} state='disabled' contentType='textInSubMenu' content={undefined} foo={func} />
                            ]}
                        />,
                        <Button text={localeContext.text_word} state='disabled' contentType='textInSubMenu' content={undefined} foo={func} />,
                        <DropdownMenu
                            summoningButtonText={localeContext.figures_word}
                            summoningButtonType="textInSubMenu"
                            summoningButtonPlace="left"
                            bottomBorderAfterElement={undefined}
                            elementsArray={[
                                <Button text={localeContext.circle_word} state='disabled' contentType='textInSubMenu' content={undefined} foo={func} />,
                                <Button text={localeContext.triangle_word} state='disabled' contentType='textInSubMenu' content={undefined} foo={func} />,
                                <Button text={localeContext["square-figure_word"]} state='disabled' contentType='textInSubMenu' content={undefined} foo={func} />
                            ]}
                        />
                    ]}
                />
                <span className={styles.span}></span>
                <input className={styles["presentation-name-input-field"]} type="text" />
                <span className={styles.span}></span>
                <Button text={localeContext["slide-show"]} state='default' contentType='text' content={undefined} foo={func} />
                <Button text={localeContext["change-locale"]} state='default' contentType='text' content={undefined} foo={toggleLocaleContext} />
            </div>
        </div>
    );
}

export {
    TopBar
}
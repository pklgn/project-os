import { Button } from "../common/Button/Button";
import { DropdownMenu } from "../common/DropdownMenu/DropdownMenu";
import styles from "./TopBar.module.css";

function TopBar() {

    const func = () => {
        console.log('ok!');
    }

    return (
        <div className={styles['top-bar']}>
            <div className={styles['top-bar__button-list']}>
                <DropdownMenu
                    summoningButtonText="Файл"
                    summoningButtonPlace={"above"}
                    bottomBorderAfterElement={[2, 4]}
                    elementsArray={[
                        <DropdownMenu
                            summoningButtonText="Создать"
                            summoningButtonPlace={"left"}
                            bottomBorderAfterElement={undefined}
                            elementsArray={[
                                <Button text="Презентация" content={{ hotkeyInfo: "", icon: undefined }} foo={func} />,
                                <Button text="Документ" content={{ hotkeyInfo: "", icon: undefined }} foo={func} />,
                                <Button text="Таблица" content={{ hotkeyInfo: "", icon: undefined }} foo={func} />
                            ]}
                        />,
                        <Button text="Открыть" content={{ hotkeyInfo: "Ctrl+O", icon: undefined }} foo={func} />,
                        <DropdownMenu
                            summoningButtonText="Создать копию"
                            summoningButtonPlace={"left"}
                            bottomBorderAfterElement={undefined}
                            elementsArray={[
                                <Button text="Вся презентация" content={{ hotkeyInfo: "", icon: undefined }} foo={func} />,
                                <Button text="Выбранные слайды" content={{ hotkeyInfo: "", icon: undefined }} foo={func} />
                            ]}
                        />,
                        <DropdownMenu
                            summoningButtonText="Электронная почта"
                            summoningButtonPlace={"left"}
                            bottomBorderAfterElement={undefined}
                            elementsArray={[
                                <Button text="Отправить на почту" content={{ hotkeyInfo: "", icon: undefined }} foo={func} />,
                                <Button text="Написать соавторам" content={{ hotkeyInfo: "", icon: undefined }} foo={func} />
                            ]}
                        />,
                        <DropdownMenu
                            summoningButtonText="Скачать"
                            summoningButtonPlace={"left"}
                            bottomBorderAfterElement={undefined}
                            elementsArray={[
                                <Button text="Microsoft PowerPoint (.pptx)" content={{ hotkeyInfo: "", icon: undefined }} foo={func} />,
                                <Button text="Документ PDF (.pdf)" content={{ hotkeyInfo: "", icon: undefined }} foo={func} />,
                                <Button text="Обычный текст (.txt)" content={{ hotkeyInfo: "", icon: undefined }} foo={func} />
                            ]}
                        />,
                        <Button text="Переименовать" content={{ hotkeyInfo: "", icon: undefined }} foo={func} />,
                        <Button text="Переместить" content={{ hotkeyInfo: "", icon: undefined }} foo={func} />,
                        <Button text="Удалить" content={{ hotkeyInfo: "", icon: undefined }} foo={func} />
                    ]}
                />
                <DropdownMenu
                    summoningButtonText="Изображение"
                    summoningButtonPlace={"above"}
                    bottomBorderAfterElement={undefined}
                    elementsArray={[
                        <DropdownMenu
                            summoningButtonText=""
                            summoningButtonPlace={"left"}
                            bottomBorderAfterElement={undefined}
                            elementsArray={[
                                <Button text="Загрузить с компьютера" content={{ hotkeyInfo: "", icon: undefined }} foo={func} />,
                                <Button text="Добавить с Google Диска" content={{ hotkeyInfo: "", icon: undefined }} foo={func} />,
                                <Button text="Вставить URL" content={{ hotkeyInfo: "", icon: undefined }} foo={func} />
                            ]}
                        />,
                        <Button text="Текстовое поле" content={{ hotkeyInfo: "", icon: undefined }} foo={func} />,
                        <DropdownMenu
                            summoningButtonText="Фигуры"
                            summoningButtonPlace={"left"}
                            bottomBorderAfterElement={undefined}
                            elementsArray={[
                                <Button text="Круг" content={{ hotkeyInfo: "", icon: undefined }} foo={func} />,
                                <Button text="Треугольник" content={{ hotkeyInfo: "", icon: undefined }} foo={func} />,
                                <Button text="Квадрат" content={{ hotkeyInfo: "", icon: undefined }} foo={func} />
                            ]}
                        />
                    ]}
                />
                <Button text="Показ слайдов" content={undefined} foo={func} />
            </div>
        </div>
    );
}

export {
    TopBar
}
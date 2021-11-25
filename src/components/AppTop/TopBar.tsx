import { Button } from "../common/Button/Button";
import { DropdownMenu } from "../common/DropdownMenu/DropdownMenu";
import { Circle } from "../common/icons/Circle/Circle";
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
                    summoningButtonType="text"
                    summoningButtonPlace={"above"}
                    bottomBorderAfterElement={[2, 4]}
                    elementsArray={[
                        <DropdownMenu
                            summoningButtonText="Создать"
                            summoningButtonType="textInSubMenu"
                            summoningButtonPlace={"left"}
                            bottomBorderAfterElement={undefined}
                            elementsArray={[
                                <Button text="Презентация" state={'disabled'} contentType={'textInSubMenu'} content={undefined} foo={func} />,
                                <Button text="Документ" state={'disabled'} contentType={'textInSubMenu'} content={undefined} foo={func} />,
                                <Button text="Таблица" state={'disabled'} contentType={'textInSubMenu'} content={undefined} foo={func} />
                            ]}
                        />,
                        <Button text="Открыть" state={'disabled'} contentType={'textInSubMenu'} content={{ hotkeyInfo: "Ctrl+O", icon: <div></div> }} foo={func} />,
                        <DropdownMenu
                            summoningButtonText="Создать копию"
                            summoningButtonType="textInSubMenu"
                            summoningButtonPlace={"left"}
                            bottomBorderAfterElement={undefined}
                            elementsArray={[
                                <Button text="Вся презентация" state={'disabled'} contentType={'textInSubMenu'} content={undefined} foo={func} />,
                                <Button text="Выбранные слайды" state={'disabled'} contentType={'textInSubMenu'} content={undefined} foo={func} />
                            ]}
                        />,
                        <DropdownMenu
                            summoningButtonText="Электронная почта"
                            summoningButtonType="textInSubMenu"
                            summoningButtonPlace={"left"}
                            bottomBorderAfterElement={undefined}
                            elementsArray={[
                                <Button text="Отправить на почту" state={'disabled'} contentType={'textInSubMenu'} content={undefined} foo={func} />,
                                <Button text="Написать соавторам" state={'disabled'} contentType={'textInSubMenu'} content={undefined} foo={func} />
                            ]}
                        />,
                        <DropdownMenu
                            summoningButtonText="Скачать"
                            summoningButtonType="textInSubMenu"
                            summoningButtonPlace={"left"}
                            bottomBorderAfterElement={undefined}
                            elementsArray={[
                                <Button text="Microsoft PowerPoint (.pptx)" state={'disabled'} contentType={'textInSubMenu'} content={undefined} foo={func} />,
                                <Button text="Документ PDF (.pdf)" state={'disabled'} contentType={'textInSubMenu'} content={undefined} foo={func} />,
                                <Button text="Обычный текст (.txt)" state={'disabled'} contentType={'textInSubMenu'} content={undefined} foo={func} />
                            ]}
                        />,
                        <Button text="Переименовать" state={'disabled'} contentType={'textInSubMenu'} content={undefined} foo={func} />,
                        <Button text="Переместить" state={'disabled'} contentType={'textInSubMenu'} content={undefined} foo={func} />,
                        <Button text="Удалить" state={'disabled'} contentType={'textInSubMenu'} content={undefined} foo={func} />
                    ]}
                />
                <DropdownMenu
                    summoningButtonText="Добавить"
                    summoningButtonType="text"
                    summoningButtonPlace={"above"}
                    bottomBorderAfterElement={undefined}
                    elementsArray={[
                        <DropdownMenu
                            summoningButtonText="Изображение"
                            summoningButtonType="textInSubMenu"
                            summoningButtonPlace={"left"}
                            bottomBorderAfterElement={undefined}
                            elementsArray={[
                                <Button text="Загрузить с компьютера" state={'disabled'} contentType={'textInSubMenu'} content={undefined} foo={func} />,
                                <Button text="Добавить с Google Диска" state={'disabled'} contentType={'textInSubMenu'} content={undefined} foo={func} />,
                                <Button text="Вставить URL" state={'disabled'} contentType={'textInSubMenu'} content={undefined} foo={func} />
                            ]}
                        />,
                        <Button text="Фигуры" state={'disabled'} contentType={'textInSubMenu'} content={undefined} foo={func} />,
                        <DropdownMenu
                            summoningButtonText="Фигуры"
                            summoningButtonType="textInSubMenu"
                            summoningButtonPlace={"left"}
                            bottomBorderAfterElement={undefined}
                            elementsArray={[
                                <Button text="Круг" state={'disabled'} contentType={'textInSubMenu'} content={undefined} foo={func} />,
                                <Button text="Треугольник" state={'disabled'} contentType={'textInSubMenu'} content={undefined} foo={func} />,
                                <Button text="Квадрат" state={'disabled'} contentType={'textInSubMenu'} content={undefined} foo={func} />
                            ]}
                        />
                    ]}
                />
                <Button text="Показ слайдов" state={'disabled'} contentType={'text'} content={undefined} foo={func} />
                <Button text="" state={'disabled'} contentType="icon" content={{ hotkeyInfo: "", icon: <Circle /> }} foo={func} />
            </div>
        </div>
    );
}

export {
    TopBar
}
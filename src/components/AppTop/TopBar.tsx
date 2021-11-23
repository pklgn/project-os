import { Button } from "../common/Button/Button";
import { DropdownMenu } from "../common/DropdownMenu/DropdownMenu";
import { Triangle } from "../common/icons/Triangle/Triangle";
import styles from "./TopBar.module.css";

function TopBar() {

    const func = () => {
        console.log('ok!');
    }

    return (
        <div className={styles['top-bar']}>
            <div className={styles['top-bar__button-list']}>
                <DropdownMenu
                    summoningButton={Button({ title: "Файл", content: undefined, foo: undefined})}
                    summoningButtonPlace={"above"}
                    bottomBorderAfterElement={[2, 4]}
                    elementsArray={[
                        <DropdownMenu
                            summoningButton={Button({ title: "Создать", content: { hotkeyInfo: "", icon: <Triangle /> }, foo: undefined})}
                            summoningButtonPlace={"left"}
                            bottomBorderAfterElement={undefined}
                            elementsArray={[
                                Button({ title: "Презентация", content: { hotkeyInfo: "", icon: undefined }, foo: func }).button,
                                Button({ title: "Документ", content: { hotkeyInfo: "", icon: undefined }, foo: func }).button,
                                Button({ title: "Таблица", content: { hotkeyInfo: "", icon: undefined }, foo: func }).button
                            ]}
                        />,
                        Button({ title: "Открыть", content: { hotkeyInfo: "Ctrl+O", icon: undefined }, foo: func }).button,
                        <DropdownMenu
                            summoningButton={Button({ title: "Создать копию", content: { hotkeyInfo: "", icon: <Triangle /> }, foo: undefined })}
                            summoningButtonPlace={"left"}
                            bottomBorderAfterElement={undefined}
                            elementsArray={[
                                Button({ title: "Вся презентация", content: { hotkeyInfo: "", icon: undefined }, foo: func }).button,
                                Button({ title: "Выбранные слайды", content: { hotkeyInfo: "", icon: undefined }, foo: func }).button
                            ]}
                        />,
                        <DropdownMenu
                            summoningButton={Button({ title: "Электронная почта", content: { hotkeyInfo: "", icon: <Triangle /> }, foo: undefined })}
                            summoningButtonPlace={"left"}
                            bottomBorderAfterElement={undefined}
                            elementsArray={[
                                Button({ title: "Отправить на почту", content: { hotkeyInfo: "", icon: undefined }, foo: func }).button,
                                Button({ title: "Написать соавторам", content: { hotkeyInfo: "", icon: undefined }, foo: func }).button
                            ]}
                        />,
                        <DropdownMenu
                            summoningButton={Button({ title: "Скачать", content: { hotkeyInfo: "", icon: <Triangle /> }, foo: undefined })}
                            summoningButtonPlace={"left"}
                            bottomBorderAfterElement={undefined}
                            elementsArray={[
                                Button({ title: "Microsoft PowerPoint (.pptx)", content: { hotkeyInfo: "", icon: undefined }, foo: func }).button,
                                Button({ title: "Документ PDF (.pdf)", content: { hotkeyInfo: "", icon: undefined }, foo: func }).button,
                                Button({ title: "Обычный текст (.txt)", content: { hotkeyInfo: "", icon: undefined }, foo: func }).button
                            ]}
                        />,
                        Button({ title: "Переименовать", content: { hotkeyInfo: "", icon: undefined }, foo: func }).button,
                        Button({ title: "Переместить", content: { hotkeyInfo: "", icon: undefined }, foo: func }).button,
                        Button({ title: "Удалить", content: { hotkeyInfo: "", icon: undefined }, foo: func }).button,
                    ]}
                />
                <DropdownMenu
                    summoningButton={Button({ title: "Вставить", content: undefined, foo: undefined })}
                    summoningButtonPlace={"above"}
                    bottomBorderAfterElement={undefined}
                    elementsArray={[
                        <DropdownMenu
                            summoningButton={Button({ title: "Изображение", content: { hotkeyInfo: "", icon: <Triangle /> }, foo: undefined })}
                            summoningButtonPlace={"left"}
                            bottomBorderAfterElement={undefined}
                            elementsArray={[
                                Button({ title: "Загрузить с компьютера", content: { hotkeyInfo: "", icon: undefined }, foo: func }).button,
                                Button({ title: "Добавить с Google Диска", content: { hotkeyInfo: "", icon: undefined }, foo: func }).button,
                                Button({ title: "Вставить URL", content: { hotkeyInfo: "", icon: undefined }, foo: func }).button
                            ]}
                        />,
                        Button({ title: "Текстовое поле", content: { hotkeyInfo: "", icon: undefined }, foo: func }).button,
                        <DropdownMenu
                            summoningButton={Button({ title: "Фигура", content: { hotkeyInfo: "", icon: <Triangle /> }, foo: undefined })}
                            summoningButtonPlace={"left"}
                            bottomBorderAfterElement={undefined}
                            elementsArray={[
                                Button({ title: "Круг", content: { hotkeyInfo: "", icon: undefined }, foo: func }).button,
                                Button({ title: "Треугольник", content: { hotkeyInfo: "", icon: undefined }, foo: func }).button,
                                Button({ title: "Квадрат", content: { hotkeyInfo: "", icon: undefined }, foo: func }).button
                            ]}
                        />
                    ]}
                />
                {Button({ title: "Показ слайдов", content: undefined, foo: func }).button}
            </div>
        </div>
    );
}

export {
    TopBar
}
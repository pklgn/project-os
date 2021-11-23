import { Button, ButtonType } from "../common/Button/Button";
import { DropdownMenu } from "../common/DropdownMenu/DropdownMenu";
import { Triangle } from "../common/icons/Triangle/Triangle";
import styles from "./TopBar.module.css";

function TopBar() {

    const func = () => {
        console.log('ok!');
    }

    const summoningButtonsFile: ButtonType[] = [
        Button({ text: "Файл", content: undefined, foo: undefined }),
        Button({ text: "Создать", content: { hotkeyInfo: "", icon: <Triangle /> }, foo: undefined }),
        Button({ text: "Создать копию", content: { hotkeyInfo: "", icon: <Triangle /> }, foo: undefined }),
        Button({ text: "Электронная почта", content: { hotkeyInfo: "", icon: <Triangle /> }, foo: undefined }),
        Button({ text: "Скачать", content: { hotkeyInfo: "", icon: <Triangle /> }, foo: undefined })
    ];

    const subMenuButtonsFile: ButtonType[] = [
        Button({ text: "Презентация", content: { hotkeyInfo: "", icon: undefined }, foo: func }),
        Button({ text: "Документ", content: { hotkeyInfo: "", icon: undefined }, foo: func }),
        Button({ text: "Таблица", content: { hotkeyInfo: "", icon: undefined }, foo: func }),
        Button({ text: "Вся презентация", content: { hotkeyInfo: "", icon: undefined }, foo: func }),
        Button({ text: "Выбранные слайды", content: { hotkeyInfo: "", icon: undefined }, foo: func }),
        Button({ text: "Отправить на почту", content: { hotkeyInfo: "", icon: undefined }, foo: func }),
        Button({ text: "Написать соавторам", content: { hotkeyInfo: "", icon: undefined }, foo: func }),
        Button({ text: "Microsoft PowerPoint (.pptx)", content: { hotkeyInfo: "", icon: undefined }, foo: func }),
        Button({ text: "Документ PDF (.pdf)", content: { hotkeyInfo: "", icon: undefined }, foo: func }),
        Button({ text: "Обычный текст (.txt)", content: { hotkeyInfo: "", icon: undefined }, foo: func }),
        Button({ text: "Переименовать", content: { hotkeyInfo: "", icon: undefined }, foo: func }),
        Button({ text: "Переместить", content: { hotkeyInfo: "", icon: undefined }, foo: func }),
        Button({ text: "Удалить", content: { hotkeyInfo: "", icon: undefined }, foo: func })
    ];

    const summoningButtonsInput: ButtonType[] = [
        Button({ text: "Вставить", content: undefined, foo: undefined }),
        Button({ text: "Изображение", content: { hotkeyInfo: "", icon: <Triangle /> }, foo: undefined }),
        Button({ text: "Фигура", content: { hotkeyInfo: "", icon: <Triangle /> }, foo: undefined })
    ];

    const subMenuButtonsInput: ButtonType[] = [
        Button({ text: "Загрузить с компьютера", content: { hotkeyInfo: "", icon: undefined }, foo: func }),
        Button({ text: "Добавить с Google Диска", content: { hotkeyInfo: "", icon: undefined }, foo: func }),
        Button({ text: "Вставить URL", content: { hotkeyInfo: "", icon: undefined }, foo: func }),
        Button({ text: "Круг", content: { hotkeyInfo: "", icon: undefined }, foo: func }),
        Button({ text: "Треугольник", content: { hotkeyInfo: "", icon: undefined }, foo: func }),
        Button({ text: "Квадрат", content: { hotkeyInfo: "", icon: undefined }, foo: func })
    ];

    return (
        <div className={styles['top-bar']}>
            <div className={styles['top-bar__button-list']}>
                <DropdownMenu
                    summoningButtonType={summoningButtonsFile[0]}
                    summoningButtonPlace={"above"}
                    bottomBorderAfterElement={[2, 4]}
                    elementsArray={[
                        <DropdownMenu
                            summoningButtonType={summoningButtonsFile[1]}
                            summoningButtonPlace={"left"}
                            bottomBorderAfterElement={undefined}
                            elementsArray={[
                                subMenuButtonsFile[0].buttons.buttonWithTextInSubMenu!,
                                subMenuButtonsFile[1].buttons.buttonWithTextInSubMenu!,
                                subMenuButtonsFile[2].buttons.buttonWithTextInSubMenu!
                            ]}
                        />,
                        Button({ text: "Открыть", content: { hotkeyInfo: "Ctrl+O", icon: undefined }, foo: func }).buttons.buttonWithTextAndRightHotKeyInfo!,
                        <DropdownMenu
                            summoningButtonType={summoningButtonsFile[2]}
                            summoningButtonPlace={"left"}
                            bottomBorderAfterElement={undefined}
                            elementsArray={[
                                subMenuButtonsFile[3].buttons.buttonWithTextInSubMenu!,
                                subMenuButtonsFile[4].buttons.buttonWithTextInSubMenu!
                            ]}
                        />,
                        <DropdownMenu
                            summoningButtonType={summoningButtonsFile[3]}
                            summoningButtonPlace={"left"}
                            bottomBorderAfterElement={undefined}
                            elementsArray={[
                                subMenuButtonsFile[5].buttons.buttonWithTextInSubMenu!,
                                subMenuButtonsFile[6].buttons.buttonWithTextInSubMenu!
                            ]}
                        />,
                        <DropdownMenu
                            summoningButtonType={summoningButtonsFile[4]}
                            summoningButtonPlace={"left"}
                            bottomBorderAfterElement={undefined}
                            elementsArray={[
                                subMenuButtonsFile[7].buttons.buttonWithTextInSubMenu!,
                                subMenuButtonsFile[8].buttons.buttonWithTextInSubMenu!,
                                subMenuButtonsFile[9].buttons.buttonWithTextInSubMenu!
                            ]}
                        />,
                        subMenuButtonsFile[10].buttons.buttonWithTextInSubMenu!,
                        subMenuButtonsFile[11].buttons.buttonWithTextInSubMenu!,
                        subMenuButtonsFile[12].buttons.buttonWithTextInSubMenu!
                    ]}
                />
                <DropdownMenu
                    summoningButtonType={summoningButtonsInput[0]}
                    summoningButtonPlace={"above"}
                    bottomBorderAfterElement={undefined}
                    elementsArray={[
                        <DropdownMenu
                            summoningButtonType={summoningButtonsInput[1]}
                            summoningButtonPlace={"left"}
                            bottomBorderAfterElement={undefined}
                            elementsArray={[
                                subMenuButtonsInput[0].buttons.buttonWithTextInSubMenu!,
                                subMenuButtonsInput[1].buttons.buttonWithTextInSubMenu!,
                                subMenuButtonsInput[2].buttons.buttonWithTextInSubMenu!
                            ]}
                        />,
                        Button({ text: "Текстовое поле", content: { hotkeyInfo: "", icon: undefined }, foo: func }).buttons.buttonWithTextInSubMenu!,
                        <DropdownMenu
                            summoningButtonType={summoningButtonsInput[2]}
                            summoningButtonPlace={"left"}
                            bottomBorderAfterElement={undefined}
                            elementsArray={[
                                subMenuButtonsInput[3].buttons.buttonWithTextInSubMenu!,
                                subMenuButtonsInput[4].buttons.buttonWithTextInSubMenu!,
                                subMenuButtonsInput[5].buttons.buttonWithTextInSubMenu!
                            ]}
                        />
                    ]}
                />
                {Button({ text: "Показ слайдов", content: undefined, foo: func }).buttons.buttonWithText}
            </div>
        </div>
    );
}

export {
    TopBar
}
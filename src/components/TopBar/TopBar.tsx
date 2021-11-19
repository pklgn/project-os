import { Button } from "../common/Button/Button";
import { DropdownButton } from "../common/DropdownButton/DropdownButton";
import styles from "./TopBar.module.css";

function TopBar() {
    const mockData: string[] = [
        'Вставка',
        'Показ слайдов',
    ];

    const buttonList: JSX.Element[] = mockData.map(text => {
        return <Button text={text} state={"default"} onClick={() => console.log('hello')} />
    });

    const dropDownMenuFile: Map<string, boolean[]> = new Map();
    dropDownMenuFile.set("Создать", [true, false]);
    dropDownMenuFile.set("Открыть Ctrl+O", [false, false]);
    dropDownMenuFile.set("Создать копию", [true, true]);
    dropDownMenuFile.set("Электронная почта", [false, false]);
    dropDownMenuFile.set("Скачать", [true, true]);
    dropDownMenuFile.set("Переименовать", [false, false]);
    dropDownMenuFile.set("Переместить", [false, false]);
    dropDownMenuFile.set("Удалить", [false, false]);

    const dropDownMenuInput: Map<string, boolean[]> = new Map();
    dropDownMenuInput.set("Картинка", [true, false]);
    dropDownMenuInput.set("Текст", [false, false]);
    dropDownMenuInput.set("Фигуры", [true, false]);

    return (
        <div className={styles['top-bar']}>
            <div className={styles['top-bar__button-list']}>
              <DropdownButton title="Файл" menu={dropDownMenuFile} />
              <DropdownButton title="Вставить" menu={dropDownMenuInput} />
              {buttonList}
            </div>
        </div>
    );
}

export {
    TopBar
}
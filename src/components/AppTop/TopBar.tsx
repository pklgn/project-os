import { Button } from "../common/Button/Button";
import styles from "./TopBar.module.css";

function TopBar() {
    const mockData: string[] = [
        'Показ слайдов',
    ];

<<<<<<< HEAD:src/components/TopBar/TopBar.tsx
=======
    const buttonList: JSX.Element[] = mockData.map(text => {
        return <Button text={text} state={"default"} onClick={() => console.log('hello')} />
    });

    const dropDownMenuFile: Map<string, boolean[]> = new Map();
    dropDownMenuFile.set("Создать", [true, false]);
    dropDownMenuFile.set("Открыть", [false, false]);
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

>>>>>>> dev-5-ermakov:src/components/AppTop/TopBar.tsx
    return (
        <div className={styles['top-bar']}>
            <div className={styles['top-bar__button-list']}>
              <Button title="Файл" isInDropDown={true} atDropDownMenuProps={{
                    hasTriangleAndSubMenu: false,
                    isBlockEnd: false
                }} hotkeyInfo="Ctrl+O" ></Button>
            </div>
        </div>
    );
}

export {
    TopBar
}
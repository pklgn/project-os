import { Button } from "../common/Button/Button";
import { DropdownButton } from "../common/DropdownButton/DropdownButton";
import styles from "./TopBar.module.css";

function TopBar() {
    const mockData: string[] = [
        'Файл',
        'Вставка',
        'Показ слайдов',
    ];

    const buttonList: JSX.Element[] = mockData.map(text => {
        return <Button text={text} state={"default"} onClick={() => console.log('hello')} />
    });

    const dropDownMenu: Map<string, boolean> = new Map();
    dropDownMenu.set("Open", false);
    dropDownMenu.set("Fuck", true);

    return (
        <div className={styles['top-bar']}>
            <div className={styles['top-bar__button-list']}>
            <DropdownButton title="File" state="default" menu={dropDownMenu} onClick={() => console.log('stop')} />
                {buttonList}
            </div>
        </div>
    );
}

export {
    TopBar
}
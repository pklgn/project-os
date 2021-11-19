import { Button } from "../common/Button/Button";
import styles from "./TopBar.module.css";

function TopBar() {
    const mockData: string[] = [
        'Показ слайдов',
    ];

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
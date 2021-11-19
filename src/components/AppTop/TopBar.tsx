import { Button } from "../common/Button/Button";
import styles from "./TopBar.module.css";

function TopBar() {
    const mockData: string[] = [
        'Показ слайдов',
    ];

    return (
        <div className={styles['top-bar']}>
            <div className={styles['top-bar__button-list']}>
              <Button title="Файл" elements={{triangle: undefined, hotkeyInfo: "Ctrl+O", icon: undefined}}></Button>
            </div>
        </div>
    );
}

export {
    TopBar
}
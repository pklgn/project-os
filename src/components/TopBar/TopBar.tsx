import { Button } from "../common/Button/Button";
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

    return (
        <div className={styles['top-bar']}>
            <div className={styles['top-bar__button-list']}>
                {buttonList}
            </div>
        </div>
    );
}

export {
    TopBar
}
import { Button } from "../common/Button/Button";
import { DropdownMenu } from "../common/DropdownMenu/DropdownMenu";
import { Triangle } from "../common/icons/Triangle/Triangle";
import styles from "./TopBar.module.css";

function TopBar() {
    const mockData: string[] = [
        'Показ слайдов',
    ];

    return (
        <div className={styles['top-bar']}>
            <div className={styles['top-bar__button-list']}>
                <Button
                    title="Файл"
                    content={{
                        hotkeyInfo: "",
                        icon: <Triangle />
                    }} />
            </div>
            <DropdownMenu
                SummoningButtonPlace={"above"}
                SummoningButtonId={""}
                ButtonsArray={[
                    <Button
                        title="Файл"
                        content={undefined} />
                ]}
            />
        </div>
    );
}

export {
    TopBar
}
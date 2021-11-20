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
                <DropdownMenu
                    summoningButton={
                        <Button
                            title="Файл"
                            content={undefined}
                        />
                    }
                    summoningButtonPlace={"above"}
                    hrAfterElement={[1]}
                    elementsArray={[
                        <Button
                            title="Файл"
                            content={{
                                hotkeyInfo: "",
                                icon: <Triangle />
                            }}
                        />,
                        <Button
                            title="Файл"
                            content={{
                                hotkeyInfo: "Ctrl+O",
                                icon: undefined
                            }}
                        />,
                        <Button
                            title="2"
                            content={{
                                hotkeyInfo: "",
                                icon: undefined,
                            }}
                        />
                    ]}
                />
            </div>
        </div>
    );
}

export {
    TopBar
}
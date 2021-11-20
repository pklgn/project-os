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
                    hrAfterElement={[2, 4]}
                    elementsArray={[
                        <Button
                            title="Создать"
                            content={{
                                hotkeyInfo: "",
                                icon: <Triangle />
                            }}
                        />,
                        <Button
                            title="Открыть"
                            content={{
                                hotkeyInfo: "Ctrl+O",
                                icon: undefined
                            }}
                        />,
                        <Button
                            title="Создать копию"
                            content={{
                                hotkeyInfo: "",
                                icon: <Triangle />,
                            }}
                        />,
                        <Button
                            title="Отправить по почте"
                            content={{
                                hotkeyInfo: "",
                                icon: <Triangle />,
                            }}
                        />,
                        <Button
                            title="Скачать"
                            content={{
                                hotkeyInfo: "",
                                icon: <Triangle />,
                            }}
                        />,
                        <Button
                            title="Переименовать"
                            content={{
                                hotkeyInfo: "",
                                icon: undefined,
                            }}
                        />,
                        <Button
                            title="Переместить"
                            content={{
                                hotkeyInfo: "",
                                icon: undefined,
                            }}
                        />,
                        <Button
                            title="Удалить"
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
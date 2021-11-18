import styles from "./DropdownButton.module.css";

export function DropdownButton(props: {
    title: string;
    state: 'disabled' | 'default';
    menu: Map<string, boolean>;
    onClick: () => void;
}): JSX.Element {
    const {
        title,
        state,
        menu,
        onClick
    } = props;

    const menuElements: JSX.Element[] = [];
    menu.forEach((hasSubMenu, title) => {
        const element: JSX.Element = (hasSubMenu) 
            ? <div className={styles["clickable-subbuton"]}>{title}</div>
            : <div className={styles.subbuton}>{title}</div>;
        menuElements.push(element);
    });

    return (
        <div className={styles.dropdown}>
            <button className={styles.button}>
                {title}
            </button>
            <div className={styles["dropdown-menu"]}>
              {menuElements}
            </div>
        </div>
    );
}
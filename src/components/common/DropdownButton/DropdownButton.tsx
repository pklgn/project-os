import styles from "./DropdownButton.module.css";

export function DropdownButton(props: {
    title: string;
    state: 'disabled' | 'default';
    menu: Map<string, boolean[]>;
    onClick: () => void;
}): JSX.Element {
    const {
        title,
        state,
        menu,
        onClick
    } = props;

    const menuElements: JSX.Element[] = [];
    menu.forEach((info, title) => {
        const hasSubMenu: boolean = info[0];
        const isBlockEnd: boolean = info[1];
        const element: JSX.Element = (hasSubMenu) 
            ? <div className={styles.subbuton}>{title}</div>
            : <div className={styles.subbuton}>
                {title}
                <div className={styles.triangle}></div>
            </div>;
        const finElement: JSX.Element = (isBlockEnd)
            ? <div className={styles["block-end"]}>
                {element}
                <div className={styles["block-end-line"]}></div>
              </div>
            : element;    
        menuElements.push(finElement);
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
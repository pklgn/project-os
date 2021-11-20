import styles from "./DropdownMenu.module.css";

type DropdownMenuProps = {
    SummoningButtonPlace: 'above'|'left'|'default',
    SummoningButtonId: string,
    ButtonsArray: JSX.Element[],
}

export function DropdownMenu(props: DropdownMenuProps = {
    SummoningButtonPlace: 'default',
    SummoningButtonId: 'none',
    ButtonsArray: [],
}): JSX.Element {

    return <div className={styles["dropdown-menu"]}>say</div>;
}
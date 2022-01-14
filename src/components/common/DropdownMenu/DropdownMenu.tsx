import styles from './DropdownMenu.module.css';


type DropdownMenuProps = {
    summoningButtonPlace: 'above' | 'left' | 'default';
    summoningButtonType: 'text' | 'textInSubMenu';
    elementsArray: JSX.Element[];
    summoningButtonText: string;
    bottomBorderAfterElement: number[] | undefined;
};

export function DropdownMenu(props: DropdownMenuProps): JSX.Element {


    return (
        <div className={styles.dropdown}>
           
        </div>
    );
}

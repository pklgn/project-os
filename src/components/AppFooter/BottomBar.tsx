import styles from "./BottomBar.module.css";
import { SlideInfo } from "./SlideInfo/SlideInfo";

export function BottomBar(): JSX.Element {
    return (
        <div className={styles.bottom}>
            <SlideInfo />
        </div>
    );
}
import styles from "./Center.module.css";
import { Slide } from "./Slide/Slide";
import { SlideList } from "./SlideList/SlideList";

export function Center(): JSX.Element {
    return (
        <div className={styles.center}>
            <SlideList />
            <Slide />
        </div>
    );
}
import styles from "./Bottom.module.css";
import { SlideInfo } from "./SlideInfo/SlideInfo";
import { SlideListTool } from "./SlideListTool/SlideListTool";

export function Bottom(): JSX.Element {
    return (
        <div className={styles.bottom}>
            <SlideInfo />
        </div>
    );
}
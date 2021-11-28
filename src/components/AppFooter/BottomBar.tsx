import styles from "./BottomBar.module.css";
import { ElementListTool } from "./ElementListTool/ElementListTool";

export function BottomBar(): JSX.Element {
    return (
        <div className={styles.bottom}>
            <ElementListTool />
        </div>
    );
}
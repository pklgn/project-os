import styles from "./ElementListTool.module.css";
import { Reorder } from "../../common/icons/Reorder/Reorder";
import { Opacity } from "../../common/icons/Opacity/Opacity"
import { Delete } from "../../common/icons/Delete/Delete";

export function ElementListTool(): JSX.Element {
    return <div className={styles["element-tools"]}>
        <Reorder />
        <Opacity />
        <Delete />
    </div>;
}
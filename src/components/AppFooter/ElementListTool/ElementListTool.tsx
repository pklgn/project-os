import styles from "./ElementListTool.module.css";
import { Undo } from "../../common/icons/Undo/Undo";
import { Redo } from "../../common/icons/Redo/Redo";
import { Reorder } from "../../common/icons/Reorder/Reorder";
import { Opacity } from "../../common/icons/Opacity/Opacity"
import { Delete } from "../../common/icons/Delete/Delete";
import { Fullscreen } from "../../common/icons/Fullscreen/Fullscreen";
import { VerticalLine } from "../../common/VerticalLine/VerticalLine";
import { LayerBackward } from "../../common/icons/LayerBackward/LayerBackward";
import { LayerForward } from "../../common/icons/LayerForward/LayerForward";

export function ElementListTool(): JSX.Element {
    return <div className={styles["element-tools"]}>
        <Undo />
        <VerticalLine />
        <Redo />
        <VerticalLine />
        <Reorder />
        <VerticalLine />
        <Opacity />
        <VerticalLine />
        <Delete />
        <VerticalLine />
        <Fullscreen />
    </div>;
}
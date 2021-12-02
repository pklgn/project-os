import styles from "./ElementListTool.module.css";
import { Button } from "../../common/Button/Button"
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
        <Button text="" state="active" contentType="icon" content={{hotkeyInfo: "", icon: <Undo />}} foo={undefined}/>
        <VerticalLine />
        <Button text="" state="active" contentType="icon" content={{hotkeyInfo: "", icon: <Redo />}} foo={undefined}/>
        <VerticalLine />
        <Button text="" state="active" contentType="icon" content={{hotkeyInfo: "", icon: <Reorder />}} foo={undefined}/>
        <VerticalLine />
        <Button text="" state="active" contentType="icon" content={{hotkeyInfo: "", icon: <Opacity />}} foo={undefined}/>
        <VerticalLine />
        <Button text="" state="active" contentType="icon" content={{hotkeyInfo: "", icon: <Delete />}} foo={undefined}/>
        <VerticalLine />
        <Button text="" state="active" contentType="icon" content={{hotkeyInfo: "", icon: <Fullscreen />}} foo={undefined}/>
    </div>;
}
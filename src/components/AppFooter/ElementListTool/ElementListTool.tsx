import styles from "./ElementListTool.module.css";
import { Button } from "../../common/Button/Button"
import { Undo } from "../../common/icons/Undo/Undo";
import { Redo } from "../../common/icons/Redo/Redo";
import { Reorder } from "../../common/icons/Reorder/Reorder";
import { Opacity } from "../../common/icons/Opacity/Opacity"
import { Delete } from "../../common/icons/Delete/Delete";
import { Fullscreen } from "../../common/icons/Fullscreen/Fullscreen";
import { VerticalLine } from "../../common/VerticalLine/VerticalLine";

type ElementListToolProps = {
    foo: () => void | undefined
}

export function ElementListTool(props: ElementListToolProps): JSX.Element {
    return <div className={styles["element-tools"]}>
        <Button text="Undo" state="disabled" contentType="icon" content={{hotkeyInfo: "", icon: <Undo />}} foo={() => undefined}/>
        <VerticalLine />
        <Button text="Redo" state="disabled" contentType="icon" content={{hotkeyInfo: "", icon: <Redo />}} foo={() => undefined}/>
        <VerticalLine />
        <Button  text="Reorder" state="disabled" contentType="icon" content={{hotkeyInfo: "", icon: <Reorder />}} foo={props.foo}/>
        <VerticalLine />
        <Button text="Opacity" state="disabled" contentType="icon" content={{hotkeyInfo: "", icon: <Opacity />}} foo={() => undefined}/>
        <VerticalLine />
        <Button text="Delete" state="disabled" contentType="icon" content={{hotkeyInfo: "", icon: <Delete />}} foo={() => undefined}/>
        <VerticalLine />
        <Button text="Fullscreen" state="disabled" contentType="icon" content={{hotkeyInfo: "", icon: <Fullscreen />}} foo={() => undefined}/>
    </div>;
}
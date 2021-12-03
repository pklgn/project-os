import styles from "./ReorderListTool.module.css";
import { Button } from "../../common/Button/Button"
import { VerticalLine } from "../../common/VerticalLine/VerticalLine";
import { LayerBackward } from "../../common/icons/LayerBackward/LayerBackward";
import { LayerBackground } from "../../common/icons/LayerBackground/LayerBackground";
import { LayerForward } from "../../common/icons/LayerForward/LayerForward";
import { LayerForeground } from "../../common/icons/LayerForeground/LayerForeground";

type ReorderListToolProps = {
    foo: Function | undefined
}

export function ReorderListTool(props: ReorderListToolProps): JSX.Element {
    return <div className={styles["reorder-tools"]}>
        <Button text="" state="active" contentType="icon" content={{hotkeyInfo: "", icon: <LayerBackward />}} foo={props.foo}/>
        <VerticalLine />
        <Button text="" state="active" contentType="icon" content={{hotkeyInfo: "", icon: <LayerBackground />}} foo={props.foo}/>
        <VerticalLine />
        <Button text="" state="active" contentType="icon" content={{hotkeyInfo: "", icon: <LayerForward />}} foo={props.foo}/>
        <VerticalLine />
        <Button text="" state="active" contentType="icon" content={{hotkeyInfo: "", icon: <LayerForeground />}} foo={props.foo}/>
    </div>
}
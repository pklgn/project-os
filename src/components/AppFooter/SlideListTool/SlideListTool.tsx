import styles from "./SlideListTool.module.css";
import { Button } from "../../common/Button/Button"
import { VerticalLine } from "../../common/VerticalLine/VerticalLine";
import { AddSlide } from "../../common/icons/AddSlide/AddSlide";
import { RemoveSlide } from "../../common/icons/RemoveSlide/RemoveSlide";

type SlideListToolProps = {
    foo: () => void | undefined
}

export function SlideListTool(props: SlideListToolProps): JSX.Element {
    return <div className={styles["slides-list-tools"]}>
        <Button text="Add" state="disabled" contentType="icon" content={{hotkeyInfo: "", icon: <AddSlide />}} foo={props.foo}/>
        <VerticalLine />
        <Button text="Remove" state="disabled" contentType="icon" content={{hotkeyInfo: "", icon: <RemoveSlide />}} foo={props.foo}/>        
    </div>;
}
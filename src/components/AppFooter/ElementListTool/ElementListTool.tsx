import styles from "./ElementListTool.module.css";

import { useContext } from "react";
import { LocaleContext, LocaleContextType } from "../../../App";

import { Button } from "../../common/Button/Button"
import { Undo } from "../../common/icons/Undo/Undo";
import { Redo } from "../../common/icons/Redo/Redo";
import { Reorder } from "../../common/icons/Reorder/Reorder";
import { Opacity } from "../../common/icons/Opacity/Opacity"
import { Delete } from "../../common/icons/Delete/Delete";
import { Fullscreen } from "../../common/icons/Fullscreen/Fullscreen";
import { VerticalLine } from "../../common/VerticalLine/VerticalLine";

import { RootState } from "../../../redux/reducers/rootReducer";
import { useSelector } from "react-redux";

type ElementListToolProps = {
    foo: () => void | undefined
}

export function ElementListTool(props: ElementListToolProps): JSX.Element {
    const localeContext: LocaleContextType = useContext(LocaleContext);
    const state = useSelector((state: RootState) => state.presentation);

    return <div className={styles["element-tools"]}>
        <Button text={localeContext.locale.localization.undo_word} state="disabled" contentType="icon" content={{hotkeyInfo: "", icon: <Undo />}} foo={() => undefined}/>
        <VerticalLine />
        <Button text={localeContext.locale.localization.redo_word} state="disabled" contentType="icon" content={{hotkeyInfo: "", icon: <Redo />}} foo={() => undefined}/>
        <VerticalLine />
        <Button  text={localeContext.locale.localization.reorder_word} state="disabled" contentType="icon" content={{hotkeyInfo: "", icon: <Reorder />}} foo={props.foo}/>
        <VerticalLine />
        <Button text={localeContext.locale.localization.opacity_word} state="disabled" contentType="icon" content={{hotkeyInfo: "", icon: <Opacity />}} foo={() => undefined}/>
        <VerticalLine />
        <Button text={localeContext.locale.localization.delete_word} state="disabled" contentType="icon" content={{hotkeyInfo: "", icon: <Delete />}} foo={() => undefined}/>
        <VerticalLine />
        <Button text={localeContext.locale.localization.delete_word} state="disabled" contentType="icon" content={{hotkeyInfo: "", icon: <Fullscreen />}} foo={() => console.log(state)}/>
    </div>;
}
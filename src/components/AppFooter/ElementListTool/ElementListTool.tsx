import styles from "./ElementListTool.module.css";

import { LocaleContext, LocaleContextType } from "../../../App";
import { useContext } from "react";

import { Button } from "../../common/Button/Button"
import { Delete } from "../../common/icons/Delete/Delete";
import { Fullscreen } from "../../common/icons/Fullscreen/Fullscreen";
import { Opacity } from "../../common/icons/Opacity/Opacity"
import { Redo } from "../../common/icons/Redo/Redo";
import { Reorder } from "../../common/icons/Reorder/Reorder";
import { VerticalLine } from "../../common/VerticalLine/VerticalLine";
import { Undo } from "../../common/icons/Undo/Undo";

import { bindActionCreators } from "redux";
import { useDispatch } from "react-redux";
import { redo, undo } from "../../../model/historyActions";
import { store } from "../../../redux/store";

type ElementListToolProps = {
    foo: () => void | undefined
}

export function ElementListTool(_: ElementListToolProps): JSX.Element {
    const localeContext: LocaleContextType = useContext(LocaleContext);
    const state = store.getState();

    const dispatch = useDispatch();
    const dispatchSetPreviousModelStateAction = bindActionCreators(undo, dispatch);
    const dispatchTurnBackModelStateAction = bindActionCreators(redo, dispatch);

    return <div className={styles["element-tools"]}>
        <Button
          text={localeContext.locale.localization.undo_word}
          state="disabled" contentType="icon"
          content={{hotkeyInfo: "", icon: <Undo />}}
          foo={() => dispatchSetPreviousModelStateAction(state.allReducers)}
        />
        <VerticalLine />
        <Button
          text={localeContext.locale.localization.redo_word}
          state="disabled" contentType="icon"
          content={{hotkeyInfo: "", icon: <Redo />}}
          foo={() => dispatchTurnBackModelStateAction(state.allReducers)}
        />
        <VerticalLine />
        <Button
          text={localeContext.locale.localization.reorder_word}
          state="disabled"
          contentType="icon"
          content={{hotkeyInfo: "", icon: <Reorder />}}
          foo={() => undefined}
        />
        <VerticalLine />
        <Button
          text={localeContext.locale.localization.opacity_word}
          state="disabled"
          contentType="icon"
          content={{hotkeyInfo: "", icon: <Opacity />}}
          foo={() => undefined}
        />
        <VerticalLine />
        <Button
          text={localeContext.locale.localization.delete_word}
          state="disabled"
          contentType="icon"
          content={{hotkeyInfo: "", icon: <Delete />}}
          foo={() => undefined}
        />
        <VerticalLine />
        <Button
          text={localeContext.locale.localization.fullscreen_word}
          state="disabled"
          contentType="icon"
          content={{hotkeyInfo: "", icon: <Fullscreen />}}
          foo={() => console.log(state)}
        />
    </div>;
}
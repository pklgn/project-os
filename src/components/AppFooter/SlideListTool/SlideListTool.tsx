import styles from "./SlideListTool.module.css";
import { useContext } from "react";

import { AddSlide } from "../../common/icons/AddSlide/AddSlide";
import { Button } from "../../common/Button/Button"
import { RemoveSlide } from "../../common/icons/RemoveSlide/RemoveSlide";
import { VerticalLine } from "../../common/VerticalLine/VerticalLine";

import { LocaleContext, LocaleContextType } from "../../../App";

import { addSlide, deleteSelectedSlides } from "../../../redux/action-creators/slideActionCreators";
import { bindActionCreators, EmptyObject } from "redux";
import { Editor } from "../../../model/types";
import { keepModelAction } from "../../../redux/action-creators/historyActionCreators";
import { store } from "../../../redux/store";
import { useDispatch } from "react-redux";

type SlideListToolProps = {
    foo: () => void | undefined
}

export function SlideListTool(_: SlideListToolProps): JSX.Element {
    const localeContext: LocaleContextType = useContext(LocaleContext);

    const dispatch = useDispatch();
    const dispatchAddSlideAction = bindActionCreators(addSlide, dispatch);
    const dispatchDeleteSlideAction = bindActionCreators(deleteSelectedSlides, dispatch);
    const dispatchKeepModelAction = bindActionCreators(keepModelAction, dispatch);

    const addSlideButtonFunction = () => {
        dispatchAddSlideAction();
        console.log(`after: ${store.getState()}`)
        dispatchKeepModelAction();
    }

    const deleteSelectedSlidesButtonFunction = () => {
        dispatchDeleteSlideAction();
        dispatchKeepModelAction();
    }

    return <div className={styles["slides-list-tools"]}>
        <Button text={localeContext.locale.localization.add_word} state="disabled" contentType="icon" content={{ hotkeyInfo: "", icon: <AddSlide /> }} foo={addSlideButtonFunction} />
        <VerticalLine />
        <Button text={localeContext.locale.localization.delete_word} state="disabled" contentType="icon" content={{ hotkeyInfo: "", icon: <RemoveSlide /> }} foo={deleteSelectedSlidesButtonFunction} />
    </div>;
}
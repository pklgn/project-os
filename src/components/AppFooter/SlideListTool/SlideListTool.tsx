import styles from "./SlideListTool.module.css";
import { useContext } from "react";

import { Button } from "../../common/Button/Button"
import { VerticalLine } from "../../common/VerticalLine/VerticalLine";
import { AddSlide } from "../../common/icons/AddSlide/AddSlide";
import { RemoveSlide } from "../../common/icons/RemoveSlide/RemoveSlide";

import { LocaleContext, LocaleContextType } from "../../../App";

import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { addSlide, deleteSelectedSlides } from "../../../redux/action-creators/slideActionCreators";

type SlideListToolProps = {
    foo: () => void | undefined
}

export function SlideListTool(props: SlideListToolProps): JSX.Element {
    const localeContext: LocaleContextType = useContext(LocaleContext);

    const dispatch = useDispatch();
    const dispatchAddSlideAction = bindActionCreators(addSlide, dispatch);
    const dispatchDeleteSlideAction = bindActionCreators(deleteSelectedSlides, dispatch);

    const addSlideButtonFunction = () => {
        dispatchAddSlideAction();
    }

    const deleteSelectedSlidesButtonFunction = () => {
        dispatchDeleteSlideAction();
    }

    return <div className={styles["slides-list-tools"]}>
        <Button text={localeContext.locale.localization.add_word} state="disabled" contentType="icon" content={{hotkeyInfo: "", icon: <AddSlide />}} foo={addSlideButtonFunction} />
        <VerticalLine />
        <Button text={localeContext.locale.localization.delete_word} state="disabled" contentType="icon" content={{hotkeyInfo: "", icon: <RemoveSlide />}} foo={deleteSelectedSlidesButtonFunction} />        
    </div>;
}
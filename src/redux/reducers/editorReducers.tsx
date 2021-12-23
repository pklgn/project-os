import { SlideAction } from "../actions/slidesActions"
import { ActionType } from "../actions-types/types";
import { addSlide } from "../../model/slidesActions";
import { Editor } from "../../model/types";
import { initEditor } from "../../model/initModelActions";

export const presentationReducers = (editor = initEditor(), action: SlideAction): Editor => {
    switch(action.type) {
        case ActionType.ADD_SLIDE:
            return addSlide(editor)
        default:
            return editor
    }
}

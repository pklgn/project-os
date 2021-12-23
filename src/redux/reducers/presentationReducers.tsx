import { SlideAction } from "../actions/slidesActions";
import { PresentationActions } from "../actions/presentationActions";
import { ActionType } from "../actions-types/types";
import { changePresentationName } from "../../model/presentationActions";
import { addSlide } from "../../model/slidesActions";
import { Editor } from "../../model/types";
import { initEditor } from "../../model/initModelActions";

export const presentationReducers = (editor = initEditor(), action: SlideAction | PresentationActions): Editor => {
    switch(action.type) {
        case ActionType.ADD_SLIDE:
            return addSlide(editor);
        case ActionType.CHANGE_PRESENTATION_TITLE:
            return changePresentationName(editor, action.payload);
        default:
            return editor
    }
}

import { SlideAction } from "../actions/slidesActions";
import { PresentationActions } from "../actions/presentationActions";
import { ActionType } from "../action-types/types";
import { changePresentationName, setSelectedIdInEditor } from "../../model/presentationActions";
import { addSlide } from "../../model/slidesActions";
import { Editor } from "../../model/types";
import { initEditor } from "../../model/initModelActions";

export const presentationReducers = (editor = initEditor(), action: SlideAction | PresentationActions): Editor => {
    switch(action.type) {
        case ActionType.ADD_SLIDE:
            return addSlide(editor);
        case ActionType.CHANGE_PRESENTATION_TITLE:
            return changePresentationName(editor, action.payload);
        case ActionType.SET_SELECTED_ID_IN_EDITOR:
            return setSelectedIdInEditor(editor, action.payload.selectedSlidesIds, action.payload.selectedSlideElementsIds);
        default:
            return editor
    }
}

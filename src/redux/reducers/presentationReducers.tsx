import { SlideAction } from "../actions/slidesActions";
import { PresentationActions } from "../actions/presentationActions";
import { ActionType } from "../action-types/types";
import { changePresentationName } from "../../model/presentationActions";
import { addSlide, deleteSelectedSlides } from "../../model/slidesActions";
import { Editor } from "../../model/types";
import { initEditor } from "../../model/initModelActions";

export const presentationReducers = (editor = initEditor(), action: SlideAction | PresentationActions): Editor => {
    console.log(`in reducer ${editor.selectedSlidesIds}`);
    switch(action.type) {
        case ActionType.ADD_SLIDE:
            return addSlide(editor);
        case ActionType.CHANGE_PRESENTATION_TITLE:
            return changePresentationName(editor, action.payload);
        case ActionType.DELETE_SELECTED_SLIDES:
            return deleteSelectedSlides(editor);
        default:
            return editor
    }
}

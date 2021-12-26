import { SlideAction } from "../actions/slidesActions";
import { PresentationActions } from "../actions/presentationActions";
import { ActionType } from "../action-types/types";
import { changePresentationName, setSelectedIdInEditor } from "../../model/presentationActions";
import { addSlide, deleteSelectedSlides } from "../../model/slidesActions";
import { Editor } from "../../model/types";
import { initEditor } from "../../model/initModelActions";

export const presentationReducers = (state: Editor = initEditor(), action: SlideAction | PresentationActions): Editor => {
    switch(action.type) {
        case ActionType.ADD_SLIDE:
            return addSlide(state);
        case ActionType.CHANGE_PRESENTATION_TITLE:
            return changePresentationName(state, action.payload);
        case ActionType.SET_SELECTED_ID_IN_EDITOR:
            return setSelectedIdInEditor(state, action.payload.selectedSlidesIds, action.payload.selectedSlideElementsIds);
        case ActionType.DELETE_SELECTED_SLIDES:
            return deleteSelectedSlides(state);
        default:
            return state
    }
}

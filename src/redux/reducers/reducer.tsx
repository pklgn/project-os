import { ActionType } from "../action-types/types";
import { ElementAction } from "../actions/elementActions";
import { HistoryActions } from "../actions/historyActions";
import { PresentationActions } from "../actions/presentationActions";
import { SlideAction } from "../actions/slidesActions";

import { Editor } from "../../model/types";
import { initEditor } from "../../model/initModelActions";

import { addSlide, deleteSelectedSlides } from "../../model/slidesActions";
import { changePresentationName, setSelectedIdInEditor } from "../../model/presentationActions";
import { keep, redo, undo } from "../../model/historyActions";
import { moveElementsToBackgroundOrForeground, changeElementsSize, changeElementsOpacity, changeElementsPosition } from "../../model/elementActions";

export const allReducers = (state: Editor = initEditor(), action: SlideAction | PresentationActions | ElementAction | HistoryActions): Editor => {
    switch (action.type) {
        case ActionType.KEEP:
            keep(state);
            return state;
        case ActionType.REDO:
            redo(state);
            return state;
        case ActionType.UNDO:
            undo(state);
            return state;

        case ActionType.ADD_SLIDE:
            return addSlide(state);
        case ActionType.CHANGE_PRESENTATION_TITLE:
            return changePresentationName(state, action.payload);
        case ActionType.SET_SELECTED_ID_IN_EDITOR:
            return setSelectedIdInEditor(state, action.payload.selectedSlidesIds, action.payload.selectedSlideElementsIds);
        case ActionType.DELETE_SELECTED_SLIDES:
            return deleteSelectedSlides(state);

        case ActionType.MOVE_ELEMENTS_TO_BACKGROUND_OR_FOREGROUND:
            return moveElementsToBackgroundOrForeground(state, action.payload);
        case ActionType.CHANGE_ELEMENTS_SIZE:
            return changeElementsSize(state, action.payload.scaleX, action.payload.scaleY);
        case ActionType.CHANGE_ELEMENTS_OPACITY:
            return changeElementsOpacity(state, action.payload);
        //case ActionType.REMOVE_SELECTED_ELEMENTS:
        //return removeSelectedElements(state);
        case ActionType.CHANGE_ELEMENTS_POSITION:
            return changeElementsPosition(state, action.payload.dx, action.payload.dy);

        default:
            return state
    }
}

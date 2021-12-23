import { changeElementsOpacity, changeElementsPosition, changeElementsSize, moveElementsToBackgroundOrForeground, removeSelectedElements } from "../../model/elementActions";
import { initEditor } from "../../model/initModelActions";
import { Editor } from "../../model/types";
import { ActionType } from "../actions-types/types";
import { ElementAction } from "../actions/elementActions"

const elementReducer = (state: Editor = initEditor(), action: ElementAction): Editor => {
    switch (action.type){
        case ActionType.MOVE_ELEMENTS_TO_BACKGROUND_OR_FOREGROUND:
            return moveElementsToBackgroundOrForeground(state, action.payload);
        case ActionType.CHANGE_ELEMENTS_SIZE:
            return changeElementsSize(state, action.payload.scaleX, action.payload.scaleY);
        case ActionType.CHANGE_ELEMENTS_OPACITY:
            return changeElementsOpacity(state, action.payload);
        case ActionType.REMOVE_SELECTED_ELEMENTS:
            return removeSelectedElements(state);
        case ActionType.CHANGE_ELEMENTS_POSITION:
            return changeElementsPosition(state, action.payload.dx, action.payload.dy);
        default:
            return state
    }
}

export default elementReducer
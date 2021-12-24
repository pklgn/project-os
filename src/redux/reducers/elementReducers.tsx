import { changeElementsOpacity, changeElementsPosition, changeElementsSize, moveElementsToBackgroundOrForeground, removeSelectedElements } from "../../model/elementActions";
import { initEditor } from "../../model/initModelActions";
import { Editor } from "../../model/types";
import { ActionType } from "../action-types/types";
import { ElementAction } from "../actions/elementActions"

const elementReducers = (editor: Editor = initEditor(), action: ElementAction): Editor => {
    switch (action.type){
        case ActionType.MOVE_ELEMENTS_TO_BACKGROUND_OR_FOREGROUND:
            return moveElementsToBackgroundOrForeground(editor, action.payload);
        case ActionType.CHANGE_ELEMENTS_SIZE:
            return changeElementsSize(editor, action.payload.scaleX, action.payload.scaleY);
        case ActionType.CHANGE_ELEMENTS_OPACITY:
            return changeElementsOpacity(editor, action.payload);
        case ActionType.REMOVE_SELECTED_ELEMENTS:
            return removeSelectedElements(editor);
        case ActionType.CHANGE_ELEMENTS_POSITION:
            return changeElementsPosition(editor, action.payload.dx, action.payload.dy);
        default:
            return editor
    }
}

export default elementReducers
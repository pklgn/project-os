import { Action } from "../actions"
import { ActionType } from "../action-types/types";
import { addSlide } from "../../model/slidesActions";
import { Editor } from "../../model/types";
import { initEditor } from "../../model/initModelActions";

export const editorReducers = (editor = initEditor(), action: Action): Editor => {
    switch(action.type) {
        case ActionType.ADD_SLIDE:
            return addSlide(editor)
        default:
            return editor
    }
}


// const title = (editor = '', action: Action) => {
//     if (action.type === 'CHANGE_PRESENTATION_TITLE') {
//         return action.title
//     } else {
//         return editor
//     }
// }

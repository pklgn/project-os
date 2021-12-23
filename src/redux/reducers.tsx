import { Actions } from "./actions"
import { addSlide } from "../model/slidesActions";
import { ADD_SLIDE } from "./constants";

export const editorReducers = (editor: any, action: Actions) => {
    switch(action.type) {
        case ADD_SLIDE:
            return addSlide(editor)
    }

    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            name: title(editor.presentation.name, action)
        }
    };
}

const title = (editor = '', action: Actions) => {
    if (action.type === 'CHANGE_PRESENTATION_TITLE') {
        return action.title
    } else {
        return editor
    }
}

import { Actions } from "./actions"
import { combineReducers } from "redux";

export const editorReducers = (editor: any, action: Actions) => {
    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            name: title(editor.presentation.name, action)
        }
    };
}

const title = (editor: string = '', action: Actions) => {
    if (action.type === 'CHANGE_PRESENTATION_TITLE') {
        return action.title
    } else {
        return editor
    }
}

const reducers = combineReducers({
    editor: editorReducers
})

export default reducers

export type RootState = ReturnType<typeof reducers>

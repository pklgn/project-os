import { Actions } from "./actions"

export const editorReducers = (editor: any, action: Actions) => {
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

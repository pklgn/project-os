import {Editor, PresentationMode, History} from './model/common'
import {initPresentation} from './presentationFunction'

export function initEditor(): Editor {
    return {
        mode: "edit",
        presentation: initPresentation(),
        history: initHistory()
    }
}

function initHistory(): History {
    return {
        states: [],
        currState: -1,
    }
}

function changeMode(editor: Editor, mode: PresentationMode): void {
    editor.mode = mode
}
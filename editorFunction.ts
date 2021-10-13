import {Editor, PresentationMode, History} from './model/types'
import {initPresentation} from './presentationFunction'

export function initEditor(): Editor {
    return {
        mode: "edit",
        presentation: initPresentation(),
        history: initHistory(),
        selectedSlideIndexes: [-1],
        selectedElementIndexes: []
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
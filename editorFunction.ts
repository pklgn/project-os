import {Editor, PresentationMode} from './model/common'
import {initPresentation} from './presentationFunction'

/**
 * @returns {Editor} 
 */
export function initEditor() {
    return {
        mode: "edit",
        presentation: initPresentation(),
        history: initHistory()
    }
}

function initHistory() {
    return {
        states: [],
        currState: -1,
    }
}

/**
 * @param {Editor} editor
 * @param {PresentationMode} mode
 * @description Изменяет режим презентации
 */
function changeMode(editor, mode) {
    editor.mode = mode
}
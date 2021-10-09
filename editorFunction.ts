import {
    Editor,
    PresentationMode
} from './model/common'
import { initPresentation } from './presentationFunction'

/**
 * @returns {Editor} 
 */
export function initEditor() {
    /** @type {Editor} */
    var editor = {
        mode: "edit",
        presintation: initPresentation(),
        history: {
            presentationState: [],
            currPresentationState: -1,
        }
    }

    return editor
}

/**
 * @param {Editor} editor
 * @param {PresentationMode} mode
 * @description Изменяет режим презентации
 */
function changeMode(editor, mode) {
    editor.mode = mode
}
import {
    Editor,
    PresentationMode
} from './model/common'

/**
 * @param {Editor} editor
 * @param {PresentationMode} mode
 * @description Изменяет режим презентации
 */
function changeMode(editor, mode) {
    editor.mode = mode
}
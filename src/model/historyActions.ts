import { Editor } from "./types";

export function undo(editor: Editor): void {
    if (editor.history.currState > 0) {
        editor.history.currState -= 1

        const currState: number = editor.history.currState;
        editor.presentation =
            editor.history.presentationStates[currState];
        editor.selectedSlidesIds =
            editor.history.selectedSlidesIdsStates[currState];
        editor.selectedSlideElementsIds =
            editor.history.selectedSlideElementsIdsStates[currState];
    }
}

export function redo(editor: Editor): void {
    if (editor.history.currState < editor.history.presentationStates.length - 1) {
        editor.history.currState += 1;

        const currState: number = editor.history.currState;
        editor.presentation =
            editor.history.presentationStates[currState];
        editor.selectedSlidesIds =
            editor.history.selectedSlidesIdsStates[currState];
        editor.selectedSlideElementsIds =
            editor.history.selectedSlideElementsIdsStates[currState];
    }
}

export function keep(editor: Editor): void {
    const spliceStart: number = editor.history.currState + 1;

    const selectedSlidesIds = editor.selectedSlidesIds;
    const selectedSlideElementsIds = editor.selectedSlideElementsIds;

    editor.history.presentationStates.splice(spliceStart);
    editor.history.presentationStates.push(editor.presentation);

    editor.history.selectedSlidesIdsStates.splice(spliceStart);
    editor.history.selectedSlidesIdsStates.push(selectedSlidesIds);

    editor.history.selectedSlideElementsIdsStates.splice(spliceStart);
    editor.history.selectedSlideElementsIdsStates.push(selectedSlideElementsIds);

    editor.history.currState = editor.history.presentationStates.length - 1;
}
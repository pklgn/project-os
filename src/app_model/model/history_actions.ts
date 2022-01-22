import { Editor } from './types';

const historyCapacity = 50;

export function undo(editor: Editor): Editor {
    if (editor.history.currState > 0) {
        const currState = editor.history.currState - 1;
        const history = {
            ...editor.history,
            currState: currState,
        };
        const presentation = editor.history.presentationStates[currState];
        const selectedSlidesIds = editor.history.selectedSlidesIdsStates[currState];
        const selectedSlideElementsIds = editor.history.selectedSlideElementsIdsStates[currState];
        return {
            ...editor,
            presentation,
            history,
            selectedSlideElementsIds,
            selectedSlidesIds,
        };
    }

    return editor;
}

export function redo(editor: Editor): Editor {
    if (editor.history.currState < editor.history.presentationStates.length - 1) {
        const currState = editor.history.currState + 1;
        const history = {
            ...editor.history,
            currState: currState,
        };
        const presentation = editor.history.presentationStates[currState];
        const selectedSlidesIds = editor.history.selectedSlidesIdsStates[currState];
        const selectedSlideElementsIds = editor.history.selectedSlideElementsIdsStates[currState];
        return {
            ...editor,
            presentation,
            history,
            selectedSlideElementsIds,
            selectedSlidesIds,
        };
    }

    return editor;
}

export function keep(editor: Editor): Editor {
    if (
        editor.history.presentationStates.length === historyCapacity &&
        editor.history.currState === editor.history.presentationStates.length - 1
    ) {
        editor.history.presentationStates.splice(0, 1);
        editor.history.presentationStates.push(editor.presentation);
    }
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

    return editor;
}

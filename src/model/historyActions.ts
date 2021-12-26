import { Editor } from "./types";

export function undo(editor: Editor): Editor {
    if (editor.history.currState > 0) {
        const currState = editor.history.currState - 1
        const history = {
            ...editor.history,
            currState: currState
        }
        const presentation = editor.history.presentationStates[currState];
        const selectedSlidesIds = editor.history.selectedSlidesIdsStates[currState];
        const selectedSlideElementsIds = editor.history.selectedSlideElementsIdsStates[currState];
        return {
            ...editor,
            presentation,
            history,
            selectedSlideElementsIds,
            selectedSlidesIds,
        }
        // editor.history.currState -= 1

        // const currState: number = editor.history.currState;
        // editor.presentation =
        //     editor.history.presentationStates[currState];
        // editor.selectedSlidesIds =
        //     editor.history.selectedSlidesIdsStates[currState];
        // editor.selectedSlideElementsIds =
        //     editor.history.selectedSlideElementsIdsStates[currState];
    }

    return editor;
}

export function redo(editor: Editor): Editor {
    if (editor.history.currState < editor.history.presentationStates.length - 1) {
        const currState = editor.history.currState + 1
        const history = {
            ...editor.history,
            currState: currState
        }
        const presentation = editor.history.presentationStates[currState];
        const selectedSlidesIds = editor.history.selectedSlidesIdsStates[currState];
        const selectedSlideElementsIds = editor.history.selectedSlideElementsIdsStates[currState];
        return {
            ...editor,
            presentation,
            history,
            selectedSlideElementsIds,
            selectedSlidesIds,
        }
        // editor.history.currState += 1;

        // const currState: number = editor.history.currState;
        // editor.presentation =
        //     editor.history.presentationStates[currState];
        // editor.selectedSlidesIds =
        //     editor.history.selectedSlidesIdsStates[currState];
        // editor.selectedSlideElementsIds =
        //     editor.history.selectedSlideElementsIdsStates[currState];
    }

    return editor;
}

export function keep(editor: Editor): Editor {
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
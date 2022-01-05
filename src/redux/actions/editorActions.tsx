import { ActionType } from '../action-types/types';

interface ToggleEditorModeAction {
    type: ActionType.TOGGLE_EDITOR_MODE;
}

interface KeepHistoryAction {
    type: ActionType.KEEP;
}

interface RedoHistoryAction {
    type: ActionType.REDO;
}

interface SelectedIdAction {
    type: ActionType.SET_SELECTED_ID_IN_EDITOR;
    payload: {
        selectedSlidesIds: string[];
        selectedSlideElementsIds: string[];
    };
}

interface UndoHistoryAction {
    type: ActionType.UNDO;
}


export type EditorActions =
    | ToggleEditorModeAction
    | KeepHistoryAction
    | RedoHistoryAction
    | SelectedIdAction
    | UndoHistoryAction;

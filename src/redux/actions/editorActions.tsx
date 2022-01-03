import { ActionType } from '../action-types/types';

interface SelectedIdAction {
    type: ActionType.SET_SELECTED_ID_IN_EDITOR;
    payload: {
        selectedSlidesIds: string[];
        selectedSlideElementsIds: string[];
    };
}

interface KeepHistoryAction {
    type: ActionType.KEEP;
}

interface UndoHistoryAction {
    type: ActionType.UNDO;
}

interface RedoHistoryAction {
    type: ActionType.REDO;
}

export type EditorActions =
    | SelectedIdAction
    | KeepHistoryAction
    | UndoHistoryAction
    | RedoHistoryAction;

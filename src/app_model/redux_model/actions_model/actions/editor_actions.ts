import { ActionType } from '../action_types/types';

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

interface UploadPresentationFromJSON {
    type: ActionType.UPLOAD_PRESENTATION_FROM_JSON;
    payload: string;
}

export type EditorActions =
    | KeepHistoryAction
    | RedoHistoryAction
    | SelectedIdAction
    | UndoHistoryAction
    | UploadPresentationFromJSON;

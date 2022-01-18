import { ActionType } from '../action-types/types';
import { PresentationMode } from '../../model/types';

interface SetEditorModeAction {
    type: ActionType.SET_EDITOR_MODE;
    payload: PresentationMode;
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

interface UploadPresentationFromJSON {
    type: ActionType.UPLOAD_PRESENTATION_FROM_JSON;
    payload: string;
}

export type EditorActions =
    | KeepHistoryAction
    | RedoHistoryAction
    | SelectedIdAction
    | SetEditorModeAction
    | UndoHistoryAction
    | UploadPresentationFromJSON;
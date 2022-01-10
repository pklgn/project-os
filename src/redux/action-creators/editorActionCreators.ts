import { ActionType } from '../action-types/types';
import { EditorActions } from '../actions/editorActions';
import { PresentationMode, SelectedAreaLocation } from '../../model/types';

import { Dispatch } from 'react';

export const setEditorMode = (payload: PresentationMode) => {
    return (dispatch: Dispatch<EditorActions>) => {
        dispatch({
            type: ActionType.SET_EDITOR_MODE,
            payload,
        });
    };
};

export const setSelectedIdInEditor = (payload: { selectedSlidesIds: string[]; selectedSlideElementsIds: string[] }) => {
    return (dispatch: Dispatch<EditorActions>) => {
        dispatch({
            type: ActionType.SET_SELECTED_ID_IN_EDITOR,
            payload,
        });
    };
};

export const undoModelAction = () => {
    return (dispatch: Dispatch<EditorActions>) => {
        dispatch({
            type: ActionType.UNDO,
        });
    };
};

export const redoModelAction = () => {
    return (dispatch: Dispatch<EditorActions>) => {
        dispatch({
            type: ActionType.REDO,
        });
    };
};

export const keepModelAction = () => {
    return (dispatch: Dispatch<EditorActions>) => {
        dispatch({
            type: ActionType.KEEP,
        });
    };
};

export const uploadPresentationFromJson = (payload: string) => {
    return (dispatch: Dispatch<EditorActions>) => {
        dispatch({
            type: ActionType.UPLOAD_PRESENTATION_FROM_JSON,
            payload,
        });
    };
};

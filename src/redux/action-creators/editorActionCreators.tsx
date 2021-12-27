import { ActionType } from "../action-types/types";
import { EditorActions } from "../actions/editorActions";

import { Dispatch } from "react";

export const setSelectedIdInEditor = (payload: {
    selectedSlidesIds: string[],
    selectedSlideElementsIds: string[]
}) => {
    return (dispatch: Dispatch<EditorActions>) => {
        dispatch({
            type: ActionType.SET_SELECTED_ID_IN_EDITOR,
            payload
        });
    }
}

export const undoModelAction = () => {
    return (dispatch: Dispatch<EditorActions>) => {
        dispatch({
            type: ActionType.UNDO
        });
    }
}

export const redoModelAction = () => {
    return (dispatch: Dispatch<EditorActions>) => {
        dispatch({
            type: ActionType.REDO
        });
    }
}

export const keepModelAction = () => {
    return (dispatch: Dispatch<EditorActions>) => {
        dispatch({
            type: ActionType.KEEP
        });
    }
}
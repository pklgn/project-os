import { ActionType } from "../action-types/types";
import { Dispatch } from "redux"
import { HistoryActions } from "../actions/historyActions"

export const undoModelAction = () => {
    return (dispatch: Dispatch<HistoryActions>) => {
        dispatch({
            type: ActionType.UNDO
        })
    }
}

export const redoModelAction = () => {
    return (dispatch: Dispatch<HistoryActions>) => {
        dispatch({
            type: ActionType.REDO
        })
    }
}

export const keepModelAction = () => {
    return (dispatch: Dispatch<HistoryActions>) => {
        dispatch({
            type: ActionType.KEEP
        })
    }
}
import { Dispatch } from "redux"
import { ActionType } from "../action-types/types";
import { PresentationActions } from "../actions/presentationActions"

export const changePresentationTitle = (payload: string) => {
    return (dispatch: Dispatch<PresentationActions>) => {
        dispatch({
            type: ActionType.CHANGE_PRESENTATION_TITLE,
            payload
        })
    }
}

export const setSelectedIdInEditor = (payload: {
    selectedSlidesIds: string[],
    selectedSlideElementsIds: string[]
}) => {
    return (dispatch: Dispatch<PresentationActions>) => {
        dispatch({
            type: ActionType.SET_SELECTED_ID_IN_EDITOR,
            payload
        })
    }
}
import { ActionType } from "../action-types/types";
import { PresentationActions } from "../actions/presentationActions";

import { Dispatch } from "redux";

export const changePresentationTitle = (payload: string) => {
    return (dispatch: Dispatch<PresentationActions>) => {
        dispatch({
            type: ActionType.CHANGE_PRESENTATION_TITLE,
            payload
        });
    }
}
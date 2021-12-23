import { ActionType } from "../action-types/types";

interface TitleAction {
    type: ActionType.CHANGE_PRESENTATION_TITLE,
    payload: string
}

interface SelectedIdAction {
    type: ActionType.SET_SELECTED_ID_IN_EDITOR,
    payload: {
        selectedSlidesIds: string[],
        selectedSlideElementsIds: string[]
    }
}

export type PresentationActions = TitleAction | SelectedIdAction;
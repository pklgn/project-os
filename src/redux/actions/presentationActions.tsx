import { ActionType } from "../actions-types/types";

interface TitleAction {
    type: ActionType.CHANGE_PRESENTATION_TITLE,
    payload: string
}

export type PresentationActions = TitleAction;
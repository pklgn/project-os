import { ActionType } from "../actions-types/types";

interface ElementsToForegroundOrBackgroundLayoutAction {
    type: ActionType.MOVE_ELEMENTS_TO_BACKGROUND_OR_FOREGROUND,
    payload: boolean
}

interface ElementsSizeAction {
    type: ActionType.CHANGE_ELEMENTS_SIZE,
    payload: {
        scaleX: number,
        scaleY: number
    }
}

interface ElementsOpacityAction {
    type: ActionType.CHANGE_ELEMENTS_OPACITY,
    payload: number
}

interface ElementsRemoveAction {
    type: ActionType.REMOVE_SELECTED_ELEMENTS
}

interface ElementsPositionAction {
    type: ActionType.CHANGE_ELEMENTS_POSITION,
    payload: {
        dx: number,
        dy: number
    }
}

export type ElementAction = ElementsToForegroundOrBackgroundLayoutAction | ElementsSizeAction | ElementsOpacityAction | ElementsRemoveAction | ElementsPositionAction
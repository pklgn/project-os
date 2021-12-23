import { ActionType } from "../action-types/types";

interface ElementsMoveToForegroundOrBackgroundAction {
    type: ActionType.MOVE_ELEMENTS_TO_BACKGROUND_OR_FOREGROUND,
    payload: boolean
}

interface ElementsChangeSizeAction {
    type: ActionType.CHANGE_ELEMENTS_SIZE,
    payload: {
        scaleX: number,
        scaleY: number
    }
}

interface ElementsChangeOpacityAction {
    type: ActionType.CHANGE_ELEMENTS_OPACITY,
    payload: number
}

interface ElementsRemoveAction {
    type: ActionType.REMOVE_SELECTED_ELEMENTS
}

interface ElementsChangePositionAction {
    type: ActionType.CHANGE_ELEMENTS_POSITION,
    payload: {
        dx: number,
        dy: number
    }
}

export type ElementAction = ElementsMoveToForegroundOrBackgroundAction | ElementsChangeSizeAction | ElementsChangeOpacityAction | ElementsRemoveAction | ElementsChangePositionAction
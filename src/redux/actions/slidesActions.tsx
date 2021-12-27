import { ActionType } from "../action-types/types";

interface SlideAddAction {
    type: ActionType.ADD_SLIDE
}

interface DeleteSelectedSlideAction {
    type: ActionType.DELETE_SELECTED_SLIDES
}

export type SlideAction = SlideAddAction | DeleteSelectedSlideAction;
import { ActionType } from "../action-types/types"

interface AddSlide {
    type: ActionType.ADD_SLIDE
}

interface DeleteSelectedSlides {
    type: ActionType.DELETE_SELECTED_SLIDES
}

export type Action = AddSlide | DeleteSelectedSlides;
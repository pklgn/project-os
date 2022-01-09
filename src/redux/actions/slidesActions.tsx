import { Background } from '../../model/types';
import { ActionType } from '../action-types/types';

interface AddSlideAction {
    type: ActionType.ADD_SLIDE;
}

interface ChangeSlideBackgroundAction {
    type: ActionType.CHANGE_SELECTED_SLIDES_BACKGROUND,
    payload: Background,
}

interface DeleteSelectedSlideAction {
    type: ActionType.DELETE_SELECTED_SLIDES;
}

interface InsertSelectedSlidesAtIndexAction {
    type: ActionType.INSERT_SELECTED_SLIDES_AT_INDEX;
    payload: number;
}

export type SlideAction =
    | AddSlideAction
    | ChangeSlideBackgroundAction
    | DeleteSelectedSlideAction
    | InsertSelectedSlidesAtIndexAction;

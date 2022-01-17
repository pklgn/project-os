import { ActionType } from '../action_types/types';
import { SlideAction } from '../actions/slides_actions';

import { Dispatch } from 'redux';
import { Background } from '../../../model/types';

export const addSlide = () => {
    return (dispatch: Dispatch<SlideAction>) => {
        dispatch({
            type: ActionType.ADD_SLIDE,
        });
    };
};

export const changeSlidesBackground = (payload: Background) => {
    return (dispatch: Dispatch<SlideAction>) => {
        dispatch({
            type: ActionType.CHANGE_SELECTED_SLIDES_BACKGROUND,
            payload,
        });
    };
};

export const deleteSelectedSlides = () => {
    return (dispatch: Dispatch<SlideAction>) => {
        dispatch({
            type: ActionType.DELETE_SELECTED_SLIDES,
        });
    };
};

export const insertSelectedSlidesAtIndexAction = (payload: number) => {
    return (dispatch: Dispatch<SlideAction>) => {
        dispatch({
            type: ActionType.INSERT_SELECTED_SLIDES_AT_INDEX,
            payload,
        });
    };
};

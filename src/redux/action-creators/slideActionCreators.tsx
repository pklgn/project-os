import { ActionType } from '../action-types/types';
import { SlideAction } from '../actions/slidesActions';

import { Dispatch } from 'redux';

export const addSlide = () => {
    return (dispatch: Dispatch<SlideAction>) => {
        dispatch({
            type: ActionType.ADD_SLIDE,
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

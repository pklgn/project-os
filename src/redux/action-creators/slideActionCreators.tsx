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

export const changeSlidesBackground = (payload: string) => {
    return (dispatch: Dispatch<SlideAction>) => {
        dispatch({
            type: ActionType.CHANGE_SELECTED_SLIDES_BACKGROUND_COLOR,
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

import { RenderRatio } from '../../../view_model/types';

import { Dispatch } from 'react';
import { SlideRenderActions } from '../actions/slide_render_actions';
import { ViewActionType } from '../action_types/types';

export const setSlideContainerDimensions = (payload: { width: number; height: number }) => {
    return (dispatch: Dispatch<SlideRenderActions>) => {
        dispatch({
            type: ViewActionType.SET_SLIDE_CONTAINER_DIMENSIONS,
            payload,
        });
    };
};

export const setSlideToContainerRatio = (payload: number) => {
    return (dispatch: Dispatch<SlideRenderActions>) => {
        dispatch({
            type: ViewActionType.SET_SLIDE_TO_CONTAINER_RATIO,
            payload,
        });
    };
};

export const setWindowRatio = (payload: RenderRatio) => {
    return (dispatch: Dispatch<SlideRenderActions>) => {
        dispatch({
            type: ViewActionType.SET_WINDOW_RATIO,
            payload,
        });
    };
};

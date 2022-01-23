import { ElementsRatioType, RenderRatio, ViewBoxType } from '../../../view_model/types';

import { Dispatch } from 'react';
import { SlideRenderActions } from '../actions/slide_render_actions';
import { ViewActionType } from '../action_types/types';
import { AreaLocation } from '../../../model/types';

export const setElementsRenderRatio = (payload: ElementsRatioType) => {
    return (dispatch: Dispatch<SlideRenderActions>) => {
        dispatch({
            type: ViewActionType.SET_ELEMENTS_RENDER_RATIO,
            payload,
        });
    };
};

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

export const setSlideWhiteAreaLocation = (payload: AreaLocation) => {
    return (dispatch: Dispatch<SlideRenderActions>) => {
        dispatch({
            type: ViewActionType.SET_SLIDE_WHITE_AREA_LOCATION,
            payload,
        });
    };
};

export const setSlideViewBox = (payload: ViewBoxType) => {
    return (dispatch: Dispatch<SlideRenderActions>) => {
        dispatch({
            type: ViewActionType.SET_SLIDE_VIEWBOX,
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

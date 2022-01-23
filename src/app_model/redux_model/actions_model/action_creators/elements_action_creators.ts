import CSS from 'csstype';

import { ActionType } from '../action_types/types';
import { Dispatch } from 'redux';
import { ElementAction } from '../actions/element_actions';
import { AreaLocation, LocationDeltas } from '../../../model/types';

export const removeSelectedElements = () => {
    return (dispatch: Dispatch<ElementAction>) => {
        dispatch({
            type: ActionType.REMOVE_SELECTED_ELEMENTS,
        });
    };
};

export const changeSelectedElementsPosition = (payload: { dx: number; dy: number }) => {
    return (dispatch: Dispatch<ElementAction>) => {
        dispatch({
            type: ActionType.CHANGE_ELEMENTS_POSITION,
            payload,
        });
    };
};

export const changeSelectedElementsOpacity = (payload: number) => {
    return (dispatch: Dispatch<ElementAction>) => {
        dispatch({
            type: ActionType.CHANGE_ELEMENTS_OPACITY,
            payload,
        });
    };
};

export const changeSelectedElementsSize = (payload: AreaLocation) => {
    return (dispatch: Dispatch<ElementAction>) => {
        dispatch({
            type: ActionType.CHANGE_ELEMENTS_SIZE,
            payload,
        });
    };
};

export const moveSelectedElementsToBackgroundOrForeground = (payload: boolean) => {
    return (dispatch: Dispatch<ElementAction>) => {
        dispatch({
            type: ActionType.MOVE_ELEMENTS_TO_BACKGROUND_OR_FOREGROUND,
            payload,
        });
    };
};

export const setSelectedElementsTransformProperty = (payload: CSS.Properties) => {
    return (dispatch: Dispatch<ElementAction>) => {
        dispatch({
            type: ActionType.SET_ELEMENTS_TRANSFORM_PROP,
            payload,
        });
    };
};

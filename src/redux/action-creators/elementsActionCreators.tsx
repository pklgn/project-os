import { ActionType } from '../action-types/types';
import { Dispatch } from 'redux';
import { ElementAction } from '../actions/elementActions';

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

export const changeSelectedElementsSize = (payload: { scaleX: number; scaleY: number }) => {
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

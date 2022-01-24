import { ActionType } from '../action_types/types';
import { TextActions } from '../actions/text_actions';

import { Dispatch } from 'redux';

export const addText = (payload: { x: number; y: number }) => {
    return (dispatch: Dispatch<TextActions>) => {
        dispatch({
            type: ActionType.ADD_TEXT_AT_SELECTED_SLIDE,
            payload,
        });
    };
};

export const changeTextsColor = (payload: string) => {
    return (dispatch: Dispatch<TextActions>) => {
        dispatch({
            type: ActionType.CHANGE_SELECTED_TEXTS_COLOR,
            payload,
        });
    };
};

export const changeTextContent = (payload: string[]) => {
    return (dispatch: Dispatch<TextActions>) => {
        dispatch({
            type: ActionType.CHANGE_SELECTED_TEXT_CONTENT,
            payload,
        });
    };
};

export const changeTextsSize = (payload: number) => {
    return (dispatch: Dispatch<TextActions>) => {
        dispatch({
            type: ActionType.CHANGE_SELECTED_TEXTS_SIZE,
            payload,
        });
    };
};

export const textsSizeUp = () => {
    return (dispatch: Dispatch<TextActions>) => {
        dispatch({
            type: ActionType.SELECTED_TEXTS_SIZE_UP,
        });
    };
};

export const textsSizeDown = () => {
    return (dispatch: Dispatch<TextActions>) => {
        dispatch({
            type: ActionType.SELECTED_TEXTS_SIZE_DOWN,
        });
    };
};

export const changeTextsStyle = (payload: string) => {
    return (dispatch: Dispatch<TextActions>) => {
        dispatch({
            type: ActionType.CHANGE_SELECTED_TEXTS_STYLE,
            payload,
        });
    };
};

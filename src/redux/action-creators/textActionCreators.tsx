import { ActionType } from '../action-types/types';
import { TextActions } from '../actions/textActions';

import { Dispatch } from 'redux';

export const addText = () => {
    return (dispatch: Dispatch<TextActions>) => {
        dispatch({
            type: ActionType.ADD_TEXT_AT_SELECTED_SLIDE,
        });
    };
};

export const changeTextsColor = (payload: string) => {
    return (dispatch: Dispatch<TextActions>) => {
        dispatch({
            type: ActionType.CHANGE_SELECTED_TEXTS_COLOR,
            payload
        });
    };
};

export const changeTextContent = (payload: string) => {
    return (dispatch: Dispatch<TextActions>) => {
        dispatch({
            type: ActionType.CHANGE_SELECTED_TEXT_CONTENT,
            payload
        });
    };
};

export const changeTextsSize = (payload: number) => {
    return (dispatch: Dispatch<TextActions>) => {
        dispatch({
            type: ActionType.CHANGE_SELECTED_TEXTS_SIZE,
            payload
        });
    };
};

export const changeTextsStyle = (payload: string) => {
    return (dispatch: Dispatch<TextActions>) => {
        dispatch({
            type: ActionType.CHANGE_SELECTED_TEXTS_STYLE,
            payload
        });
    };
};
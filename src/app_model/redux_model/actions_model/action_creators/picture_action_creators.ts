import { Dispatch } from 'redux';
import { PictureActions } from '../actions/picture_actions';
import { ActionType } from '../action_types/types';

export type PictureData = {
    src: string;
    alt: string;
    width: number;
    height: number;
};

export const addPicture = (payload: PictureData) => {
    return (dispatch: Dispatch<PictureActions>) => {
        dispatch({
            type: ActionType.ADD_PICTURE_AT_SELECTED_SLIDE,
            payload,
        });
    };
};

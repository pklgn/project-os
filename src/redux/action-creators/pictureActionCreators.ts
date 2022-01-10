import { Dispatch } from 'redux';
import { PictureActions } from '../actions/pictureActions';
import { ActionType } from '../action-types/types';

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

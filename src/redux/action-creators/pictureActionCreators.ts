import { Dispatch } from 'redux';
import { PictureActions } from '../actions/pictureActions';
import { ActionType } from '../action-types/types';

export const addPicture = (payload: { src: string; alt: string }) => {
    return (dispatch: Dispatch<PictureActions>) => {
        dispatch({
            type: ActionType.ADD_PICTURE_AT_SELECTED_SLIDE,
            payload,
        });
    };
};

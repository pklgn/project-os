import { PictureData } from '../action-creators/pictureActionCreators';
import { ActionType } from '../action-types/types';

interface AddPicture {
    type: ActionType.ADD_PICTURE_AT_SELECTED_SLIDE;
    payload: PictureData;
}

export type PictureActions = AddPicture;

import { PictureData } from '../action_creators/picture_action_creators';
import { ActionType } from '../action_types/types';

interface AddPicture {
    type: ActionType.ADD_PICTURE_AT_SELECTED_SLIDE;
    payload: PictureData;
}

export type PictureActions = AddPicture;

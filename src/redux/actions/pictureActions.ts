import { ActionType } from '../action-types/types';

interface AddPicture {
    type: ActionType.ADD_PICTURE_AT_SELECTED_SLIDE;
    payload: {
        src: string;
        alt: string;
    };
}

export type PictureActions = AddPicture;

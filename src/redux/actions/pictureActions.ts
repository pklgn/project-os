import { ActionType } from '../action-types/types';

interface AddPicture {
    type: ActionType.ADD_PICTURE_AT_SELECTED_SLIDE;
    payload: {
        src: string;
        alt: string;
        width: number;
        height: number;
    };
}

export type PictureActions = AddPicture;

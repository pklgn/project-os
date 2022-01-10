import { ActionType } from '../action-types/types';

interface TextAddAction {
    type: ActionType.ADD_TEXT_AT_SELECTED_SLIDE;
    payload: {
        x: number;
        y: number;
    };
}

interface ChangeTextColorAction {
    type: ActionType.CHANGE_SELECTED_TEXTS_COLOR;
    payload: string;
}

interface ChangeTextContentAction {
    type: ActionType.CHANGE_SELECTED_TEXT_CONTENT;
    payload: string[];
}

interface ChangeTextSizeAction {
    type: ActionType.CHANGE_SELECTED_TEXTS_SIZE;
    payload: number;
}

interface ChangeTextStyleAction {
    type: ActionType.CHANGE_SELECTED_TEXTS_STYLE;
    payload: string;
}

export type TextActions =
    | TextAddAction
    | ChangeTextColorAction
    | ChangeTextContentAction
    | ChangeTextSizeAction
    | ChangeTextStyleAction;

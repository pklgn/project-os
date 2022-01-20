import { ActionType } from '../action_types/types';
import { PresentationActions } from '../actions/presentation_actions';

import { Dispatch } from 'redux';

export const changePresentationTitle = (payload: string) => {
    return (dispatch: Dispatch<PresentationActions>) => {
        dispatch({
            type: ActionType.CHANGE_PRESENTATION_TITLE,
            payload,
        });
    };
};

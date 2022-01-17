import { Dispatch } from 'react';
import { AppModeAction } from '../actions/app_mode_action';
import { AppModeType } from '../../../view_model/types';
import { ViewActionType } from '../action_types/types';

export const setAppViewMode = (payload: AppModeType) => {
    return (dispatch: Dispatch<AppModeAction>) => {
        dispatch({
            type: ViewActionType.SET_APP_MODE,
            payload,
        });
    };
};

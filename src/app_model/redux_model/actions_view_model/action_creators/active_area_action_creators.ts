import { Dispatch } from 'react';
import { ActiveAreaStateType } from '../../../view_model/types';
import { ActiveAreaActions } from '../actions/active_view_area_actions';
import { ViewActionType } from '../action_types/types';

export const setEditingToolMode = (payload: ActiveAreaStateType) => {
    return (dispatch: Dispatch<ActiveAreaActions>) => {
        dispatch({
            type: ViewActionType.SET_ACTIVE_VIEW_AREA,
            payload,
        });
    };
};

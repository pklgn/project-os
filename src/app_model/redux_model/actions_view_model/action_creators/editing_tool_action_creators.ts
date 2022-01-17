import { Dispatch } from 'react';
import { EditingToolActions } from '../actions/editing_tool_actions';
import { EditingToolStateType } from '../../../view_model/types';
import { ViewActionType } from '../action_types/types';

export const setEditingToolMode = (payload: EditingToolStateType) => {
    return (dispatch: Dispatch<EditingToolActions>) => {
        dispatch({
            type: ViewActionType.SET_TOOL_STATE,
            payload,
        });
    };
};

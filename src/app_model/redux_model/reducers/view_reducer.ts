import { EditingToolActions } from '../actions_view_model/actions/editing_tool_actions';
import { ViewActionType } from '../actions_view_model/action_types/types';
import { ViewModelType } from '../../view_model/types';

import { initViewModel } from '../../view_model/init_view_model_action';
import { SetEditingToolState } from '../../view_model/editing_tool_actions';

type ViewModelActionsType = EditingToolActions;

export const viewModelReducers = (
    state: ViewModelType = initViewModel(),
    action: ViewModelActionsType,
): ViewModelType => {
    switch (action.type) {
        case ViewActionType.SET_TOOL_STATE:
            return SetEditingToolState(state, action.payload);

        default:
            return state;
    }
};

import { ActiveAreaActions } from '../actions_view_model/actions/active_view_area_actions';
import { AppModeAction } from '../actions_view_model/actions/app_mode_action';
import { EditingToolActions } from '../actions_view_model/actions/editing_tool_actions';

import { ViewActionType } from '../actions_view_model/action_types/types';
import { ViewModelType } from '../../view_model/types';

import { initViewModel } from '../../view_model/init_view_model_action';
import { SetActiveViewArea } from '../../view_model/active_view_area_actions';
import { SetAppMode } from '../../view_model/app_mode_action';
import { SetEditingToolState } from '../../view_model/editing_tool_actions';

type ViewModelActionsType = EditingToolActions | ActiveAreaActions | AppModeAction;

export const viewModelReducers = (
    state: ViewModelType = initViewModel(),
    action: ViewModelActionsType,
): ViewModelType => {
    switch (action.type) {
        case ViewActionType.SET_ACTIVE_VIEW_AREA:
            return SetActiveViewArea(state, action.payload);

        case ViewActionType.SET_APP_MODE:
            return SetAppMode(state, action.payload);

        case ViewActionType.SET_TOOL_STATE:
            return SetEditingToolState(state, action.payload);

        default:
            return state;
    }
};

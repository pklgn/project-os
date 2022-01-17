import { EditingToolStateType } from '../../../view_model/types';
import { ViewActionType } from '../action_types/types';

interface SetToolStateAction {
    type: ViewActionType.SET_TOOL_STATE;
    payload: EditingToolStateType;
}

export type EditingToolActions = SetToolStateAction;

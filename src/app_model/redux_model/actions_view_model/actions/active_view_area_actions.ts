import { ActiveAreaStateType } from '../../../view_model/types';
import { ViewActionType } from '../action_types/types';

interface SetActiveAreaStateAction {
    type: ViewActionType.SET_ACTIVE_VIEW_AREA;
    payload: ActiveAreaStateType;
}

export type ActiveAreaActions = SetActiveAreaStateAction;

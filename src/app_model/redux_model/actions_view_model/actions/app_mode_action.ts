import { AppModeType } from '../../../view_model/types';
import { ViewActionType } from '../action_types/types';

interface SetAppModeAction {
    type: ViewActionType.SET_APP_MODE;
    payload: AppModeType;
}

export type AppModeAction = SetAppModeAction;

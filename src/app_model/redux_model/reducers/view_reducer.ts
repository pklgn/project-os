import { ActiveAreaActions } from '../actions_view_model/actions/active_view_area_actions';
import { AppModeAction } from '../actions_view_model/actions/app_mode_action';
import { EditingToolActions } from '../actions_view_model/actions/editing_tool_actions';
import { ElementsTypeAction } from '../actions_view_model/actions/chosen_elements_action';
import { SlideRenderActions } from '../actions_view_model/actions/slide_render_actions';

import { ViewActionType } from '../actions_view_model/action_types/types';
import { ViewModelType } from '../../view_model/types';

import { initViewModel } from '../../view_model/init_view_model_action';
import { setActiveViewArea } from '../../view_model/active_view_area_actions';
import { setAppMode } from '../../view_model/app_mode_action';
import { setChosenElementsType } from '../../view_model/chosen_elements_action';
import { setEditingToolState } from '../../view_model/editing_tool_actions';
import {
    setElementsRenderRatio,
    setSlideContainerDimensions,
    setSlideToContainerRatio,
    setSlideWhiteAreaLocation,
    setWindowRatio,
} from '../../view_model/slide_render_actions';

type ViewModelActionsType =
    | ActiveAreaActions
    | AppModeAction
    | EditingToolActions
    | ElementsTypeAction
    | SlideRenderActions;

export const viewModelReducers = (
    state: ViewModelType = initViewModel(),
    action: ViewModelActionsType,
): ViewModelType => {
    switch (action.type) {
        case ViewActionType.SET_ACTIVE_VIEW_AREA:
            return setActiveViewArea(state, action.payload);

        case ViewActionType.SET_APP_MODE:
            return setAppMode(state, action.payload);

        case ViewActionType.SET_ELEMENTS_RENDER_RATIO:
            return setElementsRenderRatio(state, action.payload);

        case ViewActionType.SET_CHOSEN_ELEMENTS_TYPE:
            return setChosenElementsType(state, action.payload);

        case ViewActionType.SET_TOOL_STATE:
            return setEditingToolState(state, action.payload);

        case ViewActionType.SET_SLIDE_CONTAINER_DIMENSIONS:
            return setSlideContainerDimensions(state, action.payload);
        case ViewActionType.SET_SLIDE_TO_CONTAINER_RATIO:
            return setSlideToContainerRatio(state, action.payload);
        case ViewActionType.SET_SLIDE_WHITE_AREA_LOCATION:
            return setSlideWhiteAreaLocation(state, action.payload);
        case ViewActionType.SET_WINDOW_RATIO:
            return setWindowRatio(state, action.payload);

        default:
            return state;
    }
};

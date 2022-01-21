import { bindActionCreators, Dispatch } from 'redux';

import { setAppViewMode } from './actions_view_model/action_creators/app_mode_action_creator';

const dispatchSetEditorModeAction = (dispatch: Dispatch) => {
    return bindActionCreators(setAppViewMode, dispatch);
};

export { dispatchSetEditorModeAction };

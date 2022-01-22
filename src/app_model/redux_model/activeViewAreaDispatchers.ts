import { bindActionCreators, Dispatch } from 'redux';

import { setActiveViewArea } from './actions_view_model/action_creators/active_area_action_creators';

const dispatchActiveViewAreaAction = (dispatch: Dispatch) => {
    return bindActionCreators(setActiveViewArea, dispatch);
};

export { dispatchActiveViewAreaAction };

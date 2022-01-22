import { bindActionCreators, Dispatch } from 'redux';

import { setChosenElementsType } from './actions_view_model/action_creators/chosen_elements_action_creator';

const dispatchSetChosenElementsTypeAction = (dispatch: Dispatch) => {
    return bindActionCreators(setChosenElementsType, dispatch);
};

export { dispatchSetChosenElementsTypeAction };

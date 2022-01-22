import { bindActionCreators, Dispatch } from 'redux';
import { changePresentationTitle } from './actions_model/action_creators/presentation_action_creators';

const dispatchPresentationName = (dispatch: Dispatch) => {
    return bindActionCreators(changePresentationTitle, dispatch);
};

export { dispatchPresentationName };

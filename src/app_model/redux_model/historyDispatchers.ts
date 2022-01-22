import { bindActionCreators, Dispatch } from 'redux';
import * as editorActionCreator from './actions_model/action_creators/editor_action_creators';

const dispatchKeepModelAction = (dispatch: Dispatch) => {
    return bindActionCreators(editorActionCreator.keepModelAction, dispatch);
};
const dispatchUndoAction = (dispatch: Dispatch) => {
    return bindActionCreators(editorActionCreator.undoModelAction, dispatch);
};
const dispatchRedoAction = (dispatch: Dispatch) => {
    return bindActionCreators(editorActionCreator.redoModelAction, dispatch);
};

export { dispatchKeepModelAction, dispatchUndoAction, dispatchRedoAction };

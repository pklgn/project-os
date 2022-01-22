import { bindActionCreators, Dispatch } from 'redux';
import * as textAction from './actions_model/action_creators/text_action_creators';

const dispatchAddTextAction = (dispatch: Dispatch) => {
    return bindActionCreators(textAction.addText, dispatch);
};
const dispatchChangeTextContentAction = (dispatch: Dispatch) => {
    return bindActionCreators(textAction.changeTextContent, dispatch);
};
const dispatchChangeTextsColorAction = (dispatch: Dispatch) => {
    return bindActionCreators(textAction.changeTextsColor, dispatch);
};
const dispatchChangeTextsSizeAction = (dispatch: Dispatch) => {
    return bindActionCreators(textAction.changeTextsSize, dispatch);
};
const dispatchChangeTextsStyleAction = (dispatch: Dispatch) => {
    return bindActionCreators(textAction.changeTextsStyle, dispatch);
};

export {
    dispatchAddTextAction,
    dispatchChangeTextContentAction,
    dispatchChangeTextsColorAction,
    dispatchChangeTextsSizeAction,
    dispatchChangeTextsStyleAction,
};

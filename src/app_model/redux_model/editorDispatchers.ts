import { bindActionCreators, Dispatch } from 'redux';

import * as slideActionCreator from './actions_model/action_creators/slide_action_creators';
import * as editorActionCreator from './actions_model/action_creators/editor_action_creators';

const dispatchAddSlideAction = (dispatch: Dispatch) => {
    return bindActionCreators(slideActionCreator.addSlide, dispatch);
};
const dispatchDeleteSlideAction = (dispatch: Dispatch) => {
    return bindActionCreators(slideActionCreator.deleteSelectedSlides, dispatch);
};
const dispatchInsertSelectedSlides = (dispatch: Dispatch) => {
    return bindActionCreators(slideActionCreator.insertSelectedSlidesAtIndexAction, dispatch);
};
const dispatchSetIdAction = (dispatch: Dispatch) => {
    return bindActionCreators(editorActionCreator.setSelectedIdInEditor, dispatch);
};

export { dispatchAddSlideAction, dispatchDeleteSlideAction, dispatchInsertSelectedSlides, dispatchSetIdAction };

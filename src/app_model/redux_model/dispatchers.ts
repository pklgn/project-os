import { bindActionCreators, Dispatch } from 'redux';

import { changePresentationTitle } from './actions_model/action_creators/presentation_action_creators';
import {
    addSlide,
    deleteSelectedSlides,
    insertSelectedSlidesAtIndexAction,
} from './actions_model/action_creators/slide_action_creators';
import { keepModelAction, setSelectedIdInEditor } from './actions_model/action_creators/editor_action_creators';
import { setActiveViewArea } from './actions_view_model/action_creators/active_area_action_creators';
import { setSlideContainerDimensions } from './actions_view_model/action_creators/slide_render_action_creators';

const dispatchAddSlideAction = (dispatch: Dispatch<any>) => {
    return bindActionCreators(addSlide, dispatch);
};
const dispatchActiveViewAreaAction = (dispatch: Dispatch<any>) => {
    return bindActionCreators(setActiveViewArea, dispatch);
};
const dispatchSlideContainerDimensions = (dispatch: Dispatch<any>) => {
    return bindActionCreators(setSlideContainerDimensions, dispatch);
};
const dispatchDeleteSlideAction = (dispatch: Dispatch<any>) => {
    return bindActionCreators(deleteSelectedSlides, dispatch);
};
const dispatchPresentationName = (dispatch: Dispatch<any>) => {
    return bindActionCreators(changePresentationTitle, dispatch);
};
const dispatchInsertSelectedSlides = (dispatch: Dispatch<any>) => {
    return bindActionCreators(insertSelectedSlidesAtIndexAction, dispatch);
};
const dispatchKeepModelAction = (dispatch: Dispatch<any>) => {
    return bindActionCreators(keepModelAction, dispatch);
};
const dispatchSetIdAction = (dispatch: Dispatch<any>) => {
    return bindActionCreators(setSelectedIdInEditor, dispatch);
};

export {
    dispatchAddSlideAction,
    dispatchActiveViewAreaAction,
    dispatchDeleteSlideAction,
    dispatchInsertSelectedSlides,
    dispatchKeepModelAction,
    dispatchPresentationName,
    dispatchSlideContainerDimensions,
    dispatchSetIdAction,
};

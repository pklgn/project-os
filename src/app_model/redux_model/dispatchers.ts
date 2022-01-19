import { bindActionCreators, Dispatch } from 'redux';

import { addFigure } from './actions_model/action_creators/figure_action_creators';
import {
    addSlide,
    deleteSelectedSlides,
    insertSelectedSlidesAtIndexAction,
} from './actions_model/action_creators/slide_action_creators';
import { changePresentationTitle } from './actions_model/action_creators/presentation_action_creators';
import {
    keepModelAction,
    redoModelAction,
    setSelectedIdInEditor,
    undoModelAction,
} from './actions_model/action_creators/editor_action_creators';
import { setActiveViewArea } from './actions_view_model/action_creators/active_area_action_creators';
import { setSlideContainerDimensions } from './actions_view_model/action_creators/slide_render_action_creators';

const dispatchAddSlideAction = (dispatch: Dispatch<any>) => {
    return bindActionCreators(addSlide, dispatch);
};
const dispatchAddFigureAction = (dispatch: Dispatch<any>) => {
    return bindActionCreators(addFigure, dispatch);
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
const dispatchUndoAction = (dispatch: Dispatch<any>) => {
    return bindActionCreators(undoModelAction, dispatch);
};
const dispatchRedoAction = (dispatch: Dispatch<any>) => {
    return bindActionCreators(redoModelAction, dispatch);
};

export {
    dispatchAddSlideAction,
    dispatchAddFigureAction,
    dispatchActiveViewAreaAction,
    dispatchDeleteSlideAction,
    dispatchInsertSelectedSlides,
    dispatchKeepModelAction,
    dispatchPresentationName,
    dispatchSlideContainerDimensions,
    dispatchSetIdAction,
    dispatchUndoAction,
    dispatchRedoAction,
};

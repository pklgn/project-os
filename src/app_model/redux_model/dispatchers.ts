import { bindActionCreators, Dispatch } from 'redux';

import * as slideActionCreator from './actions_model/action_creators/slide_action_creators';

import * as editorActionCreator from './actions_model/action_creators/editor_action_creators';
import { changePresentationTitle } from './actions_model/action_creators/presentation_action_creators';

import {
    changeSelectedElementsPosition,
    changeSelectedElementsSize,
} from './actions_model/action_creators/elements_action_creators';

import { addFigure } from './actions_model/action_creators/figure_action_creators';

import { setActiveViewArea } from './actions_view_model/action_creators/active_area_action_creators';
import { setAppViewMode } from './actions_view_model/action_creators/app_mode_action_creator';
import * as slideRenderActions from './actions_view_model/action_creators/slide_render_action_creators';
import { addText } from './actions_model/action_creators/text_action_creators';

const dispatchAddSlideAction = (dispatch: Dispatch) => {
    return bindActionCreators(slideActionCreator.addSlide, dispatch);
};
const dispatchDeleteSlideAction = (dispatch: Dispatch) => {
    return bindActionCreators(slideActionCreator.deleteSelectedSlides, dispatch);
};
const dispatchInsertSelectedSlides = (dispatch: Dispatch) => {
    return bindActionCreators(slideActionCreator.insertSelectedSlidesAtIndexAction, dispatch);
};

const dispatchPresentationName = (dispatch: Dispatch) => {
    return bindActionCreators(changePresentationTitle, dispatch);
};
const dispatchSetIdAction = (dispatch: Dispatch) => {
    return bindActionCreators(editorActionCreator.setSelectedIdInEditor, dispatch);
};

const dispatchSetElementsSizeAction = (dispatch: Dispatch) => {
    return bindActionCreators(changeSelectedElementsSize, dispatch);
};
const dispatchSetElementsPoistionAction = (dispatch: Dispatch) => {
    return bindActionCreators(changeSelectedElementsPosition, dispatch);
};

const dispatchAddFigureAction = (dispatch: Dispatch) => {
    return bindActionCreators(addFigure, dispatch);
};

const dispatchActiveViewAreaAction = (dispatch: Dispatch) => {
    return bindActionCreators(setActiveViewArea, dispatch);
};
const dispatchSetEditorModeAction = (dispatch: Dispatch) => {
    return bindActionCreators(setAppViewMode, dispatch);
};
const dispatchSetElementsRenderRatioAction = (dispatch: Dispatch) => {
    return bindActionCreators(slideRenderActions.setElementsRenderRatio, dispatch);
};
const dispatchSlideContainerDimensions = (dispatch: Dispatch) => {
    return bindActionCreators(slideRenderActions.setSlideContainerDimensions, dispatch);
};
const dispatchSetSlideWhiteAreaLocationAction = (dispatch: Dispatch) => {
    return bindActionCreators(slideRenderActions.setSlideWhiteAreaLocation, dispatch);
};

const dispatchKeepModelAction = (dispatch: Dispatch) => {
    return bindActionCreators(editorActionCreator.keepModelAction, dispatch);
};
const dispatchUndoAction = (dispatch: Dispatch) => {
    return bindActionCreators(editorActionCreator.undoModelAction, dispatch);
};
const dispatchRedoAction = (dispatch: Dispatch) => {
    return bindActionCreators(editorActionCreator.redoModelAction, dispatch);
};

const dispatchAddTextAction = (dispatch: Dispatch) => {
    return bindActionCreators(addText, dispatch);
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
    dispatchSetEditorModeAction,
    dispatchSetElementsPoistionAction,
    dispatchSetElementsRenderRatioAction,
    dispatchSetElementsSizeAction,
    dispatchSetIdAction,
    dispatchSetSlideWhiteAreaLocationAction,
    dispatchUndoAction,
    dispatchRedoAction,
    dispatchAddTextAction,
};

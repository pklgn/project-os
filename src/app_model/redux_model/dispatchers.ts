import { bindActionCreators, Dispatch } from 'redux';

import * as slideActionCreator from './actions_model/action_creators/slide_action_creators';

import * as editorActionCreator from './actions_model/action_creators/editor_action_creators';
import { changePresentationTitle } from './actions_model/action_creators/presentation_action_creators';

import {
    changeSelectedElementsOpacity,
    changeSelectedElementsPosition,
    changeSelectedElementsSize,
    moveSelectedElementsBackwardOrForward,
    moveSelectedElementsToBackgroundOrForeground,
    removeSelectedElements,
    setSelectedElementsTransformProperty,
} from './actions_model/action_creators/elements_action_creators';

import {
    addFigure,
    changeFiguresBorderColor,
    changeFiguresBorderWidth,
    changeFiguresColor,
} from './actions_model/action_creators/figure_action_creators';

import { setActiveViewArea } from './actions_view_model/action_creators/active_area_action_creators';
import { setAppViewMode } from './actions_view_model/action_creators/app_mode_action_creator';
import * as slideRenderActions from './actions_view_model/action_creators/slide_render_action_creators';
import {
    addText,
    changeTextContent,
    changeTextsColor,
    changeTextsSize,
    changeTextsStyle,
} from './actions_model/action_creators/text_action_creators';
import { addPicture } from './actions_model/action_creators/picture_action_creators';

//EditorActions
const dispatchSetIdAction = (dispatch: Dispatch) => {
    return bindActionCreators(editorActionCreator.setSelectedIdInEditor, dispatch);
};
const dispatchSetEditorModeAction = (dispatch: Dispatch) => {
    return bindActionCreators(setAppViewMode, dispatch);
};
//EditorActions

//HistoryActions
const dispatchKeepModelAction = (dispatch: Dispatch) => {
    return bindActionCreators(editorActionCreator.keepModelAction, dispatch);
};
const dispatchUndoAction = (dispatch: Dispatch) => {
    return bindActionCreators(editorActionCreator.undoModelAction, dispatch);
};
const dispatchRedoAction = (dispatch: Dispatch) => {
    return bindActionCreators(editorActionCreator.redoModelAction, dispatch);
};
//HistoryActions

//PresentationActions
const dispatchPresentationName = (dispatch: Dispatch) => {
    return bindActionCreators(changePresentationTitle, dispatch);
};
//PresentationActions

//SlideActions
const dispatchAddSlideAction = (dispatch: Dispatch) => {
    return bindActionCreators(slideActionCreator.addSlide, dispatch);
};
const dispatchDeleteSlideAction = (dispatch: Dispatch) => {
    return bindActionCreators(slideActionCreator.deleteSelectedSlides, dispatch);
};
const dispatchInsertSelectedSlides = (dispatch: Dispatch) => {
    return bindActionCreators(slideActionCreator.insertSelectedSlidesAtIndexAction, dispatch);
};
const dispatchChangeSelecredSlidesBackground = (dispatch: Dispatch) => {
    return bindActionCreators(slideActionCreator.changeSlidesBackground, dispatch);
};
//SlideActions

//ElementsActions
const dispatchSetElementsSizeAction = (dispatch: Dispatch) => {
    return bindActionCreators(changeSelectedElementsSize, dispatch);
};
const dispatchSetElementsPositionAction = (dispatch: Dispatch) => {
    return bindActionCreators(changeSelectedElementsPosition, dispatch);
};
const dispatchSetElementsTransform = (dispatch: Dispatch) => {
    return bindActionCreators(setSelectedElementsTransformProperty, dispatch);
};
const dispatchChangeElementsOpacityAction = (dispatch: Dispatch) => {
    return bindActionCreators(changeSelectedElementsOpacity, dispatch);
};
const dispatchMoveSelectedElementsToBackgroundOrForegroundAction = (dispatch: Dispatch) => {
    return bindActionCreators(moveSelectedElementsToBackgroundOrForeground, dispatch);
};
const dispatchMoveSelectedElementsBackwardOrForward = (dispatch: Dispatch) => {
    return bindActionCreators(moveSelectedElementsBackwardOrForward, dispatch);
};
const dispatchRemoveSelectedElementsAction = (dispatch: Dispatch) => {
    return bindActionCreators(removeSelectedElements, dispatch);
};
//ElementsActions

//TextActions
const dispatchAddTextAction = (dispatch: Dispatch) => {
    return bindActionCreators(addText, dispatch);
};
const dispatchChangeTextContentAction = (dispatch: Dispatch) => {
    return bindActionCreators(changeTextContent, dispatch);
};
const dispatchChangeTextsColorAction = (dispatch: Dispatch) => {
    return bindActionCreators(changeTextsColor, dispatch);
};
const dispatchChangeTextsSizeAction = (dispatch: Dispatch) => {
    return bindActionCreators(changeTextsSize, dispatch);
};
const dispatchChangeTextsStyleAction = (dispatch: Dispatch) => {
    return bindActionCreators(changeTextsStyle, dispatch);
};
//TextActions

//PictureActions
const dispatchAddPictureAction = (dispatch: Dispatch) => {
    return bindActionCreators(addPicture, dispatch);
};
//PictureActions

//FigureActions
const dispatchAddFigureAction = (dispatch: Dispatch) => {
    return bindActionCreators(addFigure, dispatch);
};
const dispatchChangeFiguresColorAction = (dispatch: Dispatch) => {
    return bindActionCreators(changeFiguresColor, dispatch);
};
const dispatchChangeFiguresBorderColorAction = (dispatch: Dispatch) => {
    return bindActionCreators(changeFiguresBorderColor, dispatch);
};
const dispatchChangeFiguresBorderWidthAction = (dispatch: Dispatch) => {
    return bindActionCreators(changeFiguresBorderWidth, dispatch);
};
//FigureActions

const dispatchActiveViewAreaAction = (dispatch: Dispatch) => {
    return bindActionCreators(setActiveViewArea, dispatch);
};

const dispatchSetElementsRenderRatioAction = (dispatch: Dispatch) => {
    return bindActionCreators(slideRenderActions.setElementsRenderRatio, dispatch);
};

const dispatchSlideToContainerRatio = (dispatch: Dispatch) => {
    return bindActionCreators(slideRenderActions.setSlideToContainerRatio, dispatch);
};

const dispatchSlideContainerDimensions = (dispatch: Dispatch) => {
    return bindActionCreators(slideRenderActions.setSlideContainerDimensions, dispatch);
};

const dispatchSetSlideWhiteAreaLocationAction = (dispatch: Dispatch) => {
    return bindActionCreators(slideRenderActions.setSlideWhiteAreaLocation, dispatch);
};

const dispatchSetWindowRatio = (dispatch: Dispatch) => {
    return bindActionCreators(slideRenderActions.setWindowRatio, dispatch);
};

export {
    dispatchAddSlideAction,
    dispatchAddFigureAction,
    dispatchActiveViewAreaAction,
    dispatchChangeElementsOpacityAction,
    dispatchDeleteSlideAction,
    dispatchInsertSelectedSlides,
    dispatchKeepModelAction,
    dispatchMoveSelectedElementsBackwardOrForward,
    dispatchMoveSelectedElementsToBackgroundOrForegroundAction,
    dispatchPresentationName,
    dispatchRemoveSelectedElementsAction,
    dispatchSlideContainerDimensions,
    dispatchSetEditorModeAction,
    dispatchSetElementsPositionAction,
    dispatchSetElementsRenderRatioAction,
    dispatchSlideToContainerRatio,
    dispatchSetElementsSizeAction,
    dispatchSetElementsTransform,
    dispatchSetIdAction,
    dispatchSetSlideWhiteAreaLocationAction,
    dispatchSetWindowRatio,
    dispatchUndoAction,
    dispatchRedoAction,
    dispatchChangeFiguresColorAction,
    dispatchChangeFiguresBorderColorAction,
    dispatchChangeFiguresBorderWidthAction,
    dispatchAddTextAction,
    dispatchChangeTextContentAction,
    dispatchChangeTextsColorAction,
    dispatchChangeTextsSizeAction,
    dispatchChangeTextsStyleAction,
    dispatchAddPictureAction,
};

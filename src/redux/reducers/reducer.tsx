import { ActionType } from '../action-types/types';
import { EditorActions } from '../actions/editorActions';
import { ElementAction } from '../actions/elementActions';
import { PresentationActions } from '../actions/presentationActions';
import { SlideAction } from '../actions/slidesActions';
import { TextActions } from '../actions/textActions';

import { Editor } from '../../model/types';
import { initEditor } from '../../model/initModelActions';

import {
    addTextElement,
    changeTextsColor,
    changeTextsContent,
    changeTextsSize,
    changeTextsStyle,
} from '../../model/specifiedActions/textActions';
import {
    addSlide,
    deleteSelectedSlides,
    insertSelectedSlides,
} from '../../model/slidesActions';
import {
    changePresentationName,
    setSelectedIdInEditor,
} from '../../model/presentationActions';
import { keep, redo, undo } from '../../model/historyActions';
import {
    moveElementsToBackgroundOrForeground,
    changeElementsSize,
    changeElementsOpacity,
    changeElementsPosition,
    removeSelectedElements,
} from '../../model/elementActions';

type ModelActions =
    | SlideAction
    | PresentationActions
    | ElementAction
    | EditorActions
    | TextActions;

export const allReducers = (
    state: Editor = initEditor(),
    action: ModelActions,
): Editor => {
    switch (action.type) {
        case ActionType.SET_SELECTED_ID_IN_EDITOR:
            return setSelectedIdInEditor(
                state,
                action.payload.selectedSlidesIds,
                action.payload.selectedSlideElementsIds,
            );
        case ActionType.KEEP:
            return keep(state);
        case ActionType.REDO:
            return redo(state);
        case ActionType.UNDO:
            return undo(state);

        case ActionType.ADD_SLIDE:
            return addSlide(state);
        case ActionType.CHANGE_PRESENTATION_TITLE:
            return changePresentationName(state, action.payload);
        case ActionType.DELETE_SELECTED_SLIDES:
            return deleteSelectedSlides(state);
        case ActionType.INSERT_SELECTED_SLIDES_AT_INDEX:
            return insertSelectedSlides(state, action.payload);

        case ActionType.MOVE_ELEMENTS_TO_BACKGROUND_OR_FOREGROUND:
            return moveElementsToBackgroundOrForeground(state, action.payload);
        case ActionType.CHANGE_ELEMENTS_SIZE:
            return changeElementsSize(
                state,
                action.payload.scaleX,
                action.payload.scaleY,
            );
        case ActionType.CHANGE_ELEMENTS_OPACITY:
            return changeElementsOpacity(state, action.payload);
        case ActionType.REMOVE_SELECTED_ELEMENTS:
            return removeSelectedElements(state);
        case ActionType.CHANGE_ELEMENTS_POSITION:
            return changeElementsPosition(
                state,
                action.payload.dx,
                action.payload.dy,
            );

        case ActionType.ADD_TEXT_AT_SELECTED_SLIDE:
            return addTextElement(state, action.payload.x, action.payload.y);
        case ActionType.CHANGE_SELECTED_TEXTS_COLOR:
            return changeTextsColor(state, action.payload);
        case ActionType.CHANGE_SELECTED_TEXT_CONTENT:
            return changeTextsContent(state, action.payload);
        case ActionType.CHANGE_SELECTED_TEXTS_SIZE:
            return changeTextsSize(state, action.payload);
        case ActionType.CHANGE_SELECTED_TEXTS_STYLE:
            return changeTextsStyle(state, action.payload);

        default:
            return state;
    }
};

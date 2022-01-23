import CSS from 'csstype';

import { AreaLocation } from '../../../model/types';
import { ActionType } from '../action_types/types';

interface ElementsMoveToForegroundOrBackgroundAction {
    type: ActionType.MOVE_ELEMENTS_TO_BACKGROUND_OR_FOREGROUND;
    payload: boolean;
}

interface ElementsChangeSizeAction {
    type: ActionType.CHANGE_ELEMENTS_SIZE;
    payload: AreaLocation;
}

interface ElementsChangeOpacityAction {
    type: ActionType.CHANGE_ELEMENTS_OPACITY;
    payload: number;
}

interface ElementsChangePositionAction {
    type: ActionType.CHANGE_ELEMENTS_POSITION;
    payload: {
        dx: number;
        dy: number;
    };
}

interface ElementsRemoveAction {
    type: ActionType.REMOVE_SELECTED_ELEMENTS;
}

interface SetElementsTranfsormProperty {
    type: ActionType.SET_ELEMENTS_TRANSFORM_PROP;
    payload: CSS.Properties;
}

export type ElementAction =
    | ElementsMoveToForegroundOrBackgroundAction
    | ElementsChangeSizeAction
    | ElementsChangeOpacityAction
    | ElementsChangePositionAction
    | ElementsRemoveAction
    | SetElementsTranfsormProperty;

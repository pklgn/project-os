import { ChosenElementsType } from '../../../view_model/types';
import { ViewActionType } from '../action_types/types';

interface SetChosenElementsTypeAction {
    type: ViewActionType.SET_CHOSEN_ELEMENTS_TYPE;
    payload: ChosenElementsType;
}

export type ElementsTypeAction = SetChosenElementsTypeAction;

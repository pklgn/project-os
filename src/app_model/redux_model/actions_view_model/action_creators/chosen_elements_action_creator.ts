import { Dispatch } from 'react';
import { ChosenElementsType } from '../../../view_model/types';
import { ElementsTypeAction } from '../actions/chosen_elements_action';
import { ViewActionType } from '../action_types/types';

export const setChosenElementsType = (payload: ChosenElementsType) => {
    return (dispatch: Dispatch<ElementsTypeAction>) => {
        dispatch({
            type: ViewActionType.SET_CHOSEN_ELEMENTS_TYPE,
            payload,
        });
    };
};

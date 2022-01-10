import { ActionType } from '../action-types/types';
import { Dispatch } from 'redux';
import { FigureActions } from '../actions/figureActions';
import { FigureShape } from '../../model/types';

export const addFigure = (payload: { shape: FigureShape; x: number; y: number }) => {
    return (dispatch: Dispatch<FigureActions>) => {
        dispatch({
            type: ActionType.ADD_FIGURE_ELEMENT,
            payload,
        });
    };
};

export const changeFiguresBorderColor = (payload: string) => {
    return (dispatch: Dispatch<FigureActions>) => {
        dispatch({
            type: ActionType.CHANGE_FIGURES_BORDER_COLOR,
            payload,
        });
    };
};

export const changeFiguresBorderWidth = (payload: number) => {
    return (dispatch: Dispatch<FigureActions>) => {
        dispatch({
            type: ActionType.CHANGE_FIGURES_BORDER_WIDTH,
            payload,
        });
    };
};

export const changeFiguresColor = (payload: string) => {
    return (dispatch: Dispatch<FigureActions>) => {
        dispatch({
            type: ActionType.CHANGE_FIGURES_COLOR,
            payload,
        });
    };
};

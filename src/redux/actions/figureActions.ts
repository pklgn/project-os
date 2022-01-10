import { FigureShape } from '../../model/types';
import { ActionType } from '../action-types/types';

interface AddFigureAction {
    type: ActionType.ADD_FIGURE_ELEMENT;
    payload: {
        shape: FigureShape;
        x: number;
        y: number;
    };
}

interface ChangeFiguresBorderWidthAction {
    type: ActionType.CHANGE_FIGURES_BORDER_WIDTH;
    payload: number;
}

interface ChangeFiguresBorderColorAction {
    type: ActionType.CHANGE_FIGURES_BORDER_COLOR;
    payload: string;
}

interface ChangeFiguresColorAction {
    type: ActionType.CHANGE_FIGURES_COLOR;
    payload: string;
}

export type FigureActions =
    | AddFigureAction
    | ChangeFiguresBorderColorAction
    | ChangeFiguresBorderWidthAction
    | ChangeFiguresColorAction;

import { bindActionCreators, Dispatch } from 'redux';

import { addFigure } from './actions_model/action_creators/figure_action_creators';
import {
    setElementsRenderRatio,
    setSlideContainerDimensions,
} from './actions_view_model/action_creators/slide_render_action_creators';
import {
    changeSelectedElementsPosition,
    moveSelectedElementsToBackgroundOrForeground,
    removeSelectedElements,
} from './actions_model/action_creators/elements_action_creators';

const dispatchAddFigureAction = (dispatch: Dispatch) => {
    return bindActionCreators(addFigure, dispatch);
};
const dispatchSlideContainerDimensions = (dispatch: Dispatch) => {
    return bindActionCreators(setSlideContainerDimensions, dispatch);
};
const dispatchSetElementsPoistionAction = (dispatch: Dispatch) => {
    return bindActionCreators(changeSelectedElementsPosition, dispatch);
};
const dispatchSetElementsRenderRatioAction = (dispatch: Dispatch) => {
    return bindActionCreators(setElementsRenderRatio, dispatch);
};
const dispatchMoveElementsToBackgroundOrForeground = (dispatch: Dispatch) => {
    return bindActionCreators(moveSelectedElementsToBackgroundOrForeground, dispatch);
};
const dispatchRemoveSelectedElementsAction = (dispatch: Dispatch) => {
    return bindActionCreators(removeSelectedElements, dispatch);
};

export {
    dispatchAddFigureAction,
    dispatchSlideContainerDimensions,
    dispatchSetElementsPoistionAction,
    dispatchSetElementsRenderRatioAction,
    dispatchRemoveSelectedElementsAction,
    dispatchMoveElementsToBackgroundOrForeground,
};
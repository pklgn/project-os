import { AreaLocation } from '../../../model/types';
import { ElementsRatioType, RenderRatio, ViewBoxType } from '../../../view_model/types';

import { ViewActionType } from '../action_types/types';

interface SetElementsRenderRatio {
    type: ViewActionType.SET_ELEMENTS_RENDER_RATIO;
    payload: ElementsRatioType;
}
interface SetSlideContainerDimensionsAction {
    type: ViewActionType.SET_SLIDE_CONTAINER_DIMENSIONS;
    payload: {
        width: number;
        height: number;
    };
}

interface SetSlideToContainerRatioAction {
    type: ViewActionType.SET_SLIDE_TO_CONTAINER_RATIO;
    payload: number;
}

interface SetSlideWhiteAreaLocationAction {
    type: ViewActionType.SET_SLIDE_WHITE_AREA_LOCATION;
    payload: AreaLocation;
}

interface SetSLideViewBox {
    type: ViewActionType.SET_SLIDE_VIEWBOX;
    payload: ViewBoxType;
}

interface SetWindowRatioAction {
    type: ViewActionType.SET_WINDOW_RATIO;
    payload: RenderRatio;
}

export type SlideRenderActions =
    | SetElementsRenderRatio
    | SetSlideContainerDimensionsAction
    | SetSlideToContainerRatioAction
    | SetSlideWhiteAreaLocationAction
    | SetSLideViewBox
    | SetWindowRatioAction;

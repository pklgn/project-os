import { AreaLocation } from '../model/types';

export type ViewModelType = {
    activeArea: ActiveAreaStateType;
    appMode: AppModeType;
    chosenElementsType: ChosenElementsType;
    editingTool: EditingToolStateType;
    slideRenderInfo: {
        elementsRenderRatio: ElementsRatioType;
        resizersInfo: ResizersInfoType;
        slideContainerDimensions: SlideContainerDimensionsType;
        slideToContainerRatio: number;
        slideWhiteAreaRectLocation: AreaLocation;
        windowRatio: RenderRatio;
    };
};

export type ActiveAreaStateType =
    | 'APP_TOP'
    | 'SLIDE_LIST'
    | 'MAIN_SLIDE'
    | 'SLIDE_LIST_TOOL'
    | 'ELEMENTS_LIST_TOOL'
    | 'NONE';

export type AppModeType = 'EDIT' | 'SHOW_FROM_FIRST_SLIDE' | 'SHOW_FROM_CURRENT_SLIDE';

export type ElementsRatioType = {
    width: number;
    height: number;
};

export type EditingToolStateType = 'CHOOSE_TOOL' | 'TEXT_TOOL' | 'CIRCLE_TOOL' | 'TRIANGLE_TOOL' | 'RECTANGLE_TOOL';

export type ChosenElementsType = 'TEXT' | 'PICTURE' | 'FIGURE' | 'MIXED' | 'NONE';

export type RenderRatio = '4/3' | '16/9' | '16/10';

export type ResizersInfoType = {
    dimension: number;
    offset: number;
};

export type SlideContainerDimensionsType = {
    width: number;
    height: number;
};

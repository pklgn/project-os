export type ViewModelType = {
    activeArea: ActiveAreaStateType;
    appMode: AppModeType;
    chosenElementsType: ChosenElementsType;
    editingTool: EditingToolStateType;
    slideRenderInfo: {
        slideContainerDimensions: {
            width: number;
            height: number;
        };
        slideToContainerRatio: number;
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

export type EditingToolStateType = 'CHOOSE_TOOL' | 'TEXT_TOOL' | 'CIRCLE_TOOL' | 'TRIANGLE_TOOL' | 'RECTANGLE_TOOL';

export type ChosenElementsType = 'TEXT' | 'PICTURE' | 'FIGURE' | 'MIXED' | 'NONE';

export type RenderRatio = '4/3' | '16/9' | '16/10';

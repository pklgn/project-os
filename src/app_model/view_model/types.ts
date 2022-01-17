export type ViewModelType = {
    editingTool: EditingToolStateType;
    activeArea: ActiveAreaStateType;
};

export type ActiveAreaStateType =
    | 'APP_TOP'
    | 'SLIDE_LIST'
    | 'MAIN_SLIDE'
    | 'SLIDE_LIST_TOOL'
    | 'ELEMENTS_LIST_TOOL'
    | 'NONE';

export type EditingToolStateType = 'CHOOSE_TOOL' | 'TEXT_TOOL' | 'CIRCLE_TOOL' | 'TRIANGLE_TOOL' | 'RECTANGLE_TOOL';

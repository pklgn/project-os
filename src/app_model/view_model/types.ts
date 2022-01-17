export type EditingToolStateType = 'CHOOSE_TOOL' | 'TEXT_TOOL' | 'CIRCLE_TOOL' | 'TRIANGLE_TOOL' | 'RECTANGLE_TOOL';

export type ViewModelType = {
    editingTool: EditingToolStateType;
};

import { EditingToolStateType, ViewModelType } from './types';

export function getCurrentEditingToolState(viewModel: ViewModelType): EditingToolStateType {
    return viewModel.editingTool;
}

export function setEditingToolState(viewModel: ViewModelType, state: EditingToolStateType): ViewModelType {
    return {
        ...viewModel,
        editingTool: state,
    };
}

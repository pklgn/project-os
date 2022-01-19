import { EditingToolStateType, ViewModelType } from './types';

export function setEditingToolState(viewModel: ViewModelType, state: EditingToolStateType): ViewModelType {
    return {
        ...viewModel,
        editingTool: state,
    };
}

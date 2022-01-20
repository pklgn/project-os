import { EditingToolStateType, ViewModelType } from './types';

export function SetEditingToolState(viewModel: ViewModelType, state: EditingToolStateType): ViewModelType {
    return {
        ...viewModel,
        editingTool: state,
    };
}

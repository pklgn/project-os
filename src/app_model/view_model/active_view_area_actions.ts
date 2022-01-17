import { ActiveAreaStateType, ViewModelType } from './types';

export function SetActiveViewArea(viewModel: ViewModelType, viewArea: ActiveAreaStateType): ViewModelType {
    return {
        ...viewModel,
        activeArea: viewArea,
    };
}

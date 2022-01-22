import { ActiveAreaStateType, ViewModelType } from './types';

export function getActiveViewArea(viewModel: ViewModelType): ActiveAreaStateType {
    return viewModel.activeArea;
}

export function setActiveViewArea(viewModel: ViewModelType, viewArea: ActiveAreaStateType): ViewModelType {
    return {
        ...viewModel,
        activeArea: viewArea,
    };
}

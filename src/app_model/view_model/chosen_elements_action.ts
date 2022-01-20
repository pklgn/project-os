import { ChosenElementsType, ViewModelType } from './types';

export function SetChosenElementsType(viewModel: ViewModelType, type: ChosenElementsType): ViewModelType {
    return {
        ...viewModel,
        chosenElementsType: type,
    };
}

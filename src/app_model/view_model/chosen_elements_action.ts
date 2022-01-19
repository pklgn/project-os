import { ChosenElementsType, ViewModelType } from './types';

export function setChosenElementsType(viewModel: ViewModelType, type: ChosenElementsType): ViewModelType {
    return {
        ...viewModel,
        chosenElementsType: type,
    };
}

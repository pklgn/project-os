import { AppModeType, ViewModelType } from './types';

export function SetAppMode(viewModel: ViewModelType, mode: AppModeType): ViewModelType {
    const newMode: AppModeType =
        mode === 'EDIT'
            ? 'EDIT'
            : mode === 'SHOW_FROM_FIRST_SLIDE'
            ? 'SHOW_FROM_FIRST_SLIDE'
            : 'SHOW_FROM_CURRENT_SLIDE';

    return {
        ...viewModel,
        appMode: newMode,
    };
}

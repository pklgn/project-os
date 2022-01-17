import { ViewModelType } from './types';

export function initViewModel(): ViewModelType {
    return {
        activeArea: 'NONE',
        appMode: 'EDIT',
        chosenElementsType: 'NONE',
        editingTool: 'CHOOSE_TOOL',
    };
}

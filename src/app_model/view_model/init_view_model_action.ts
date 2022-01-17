import { ViewModelType } from './types';

export function initViewModel(): ViewModelType {
    return {
        editingTool: 'CHOOSE_TOOL',
        activeArea: 'NONE',
        appMode: 'EDIT',
    };
}

import { ViewModelType } from './types';

export function initViewModel(): ViewModelType {
    return {
        activeArea: 'NONE',
        appMode: 'EDIT',
        chosenElementsType: 'NONE',
        editingTool: 'CHOOSE_TOOL',
        slideRenderInfo: {
            slideContainerDimensions: {
                width: 100,
                height: 100,
            },
            slideToContainerRatio: 0.7,
            windowRatio: '16/9',
        },
    };
}

import { ViewModelType } from './types';

export function initViewModel(): ViewModelType {
    return {
        activeArea: 'NONE',
        appMode: 'EDIT',
        chosenElementsType: 'NONE',
        editingTool: 'CHOOSE_TOOL',
        slideRenderInfo: {
            elementsRenderRatio: {
                width: 1,
                height: 1,
            },
            resizersInfo: {
                dimension: 10,
                offset: 3,
            },
            slideContainerDimensions: {
                width: 100,
                height: 100,
            },
            slideWhiteAreaRectLocation: {
                xy: {
                    x: 0,
                    y: 0,
                },
                dimensions: {
                    width: 0,
                    height: 0,
                },
            },
            slideViewBox: {
                x: 0,
                y: 0,
                width: 0,
                height: 0,
            },
            slideToContainerRatio: 0.7,
            windowRatio: '16/9',
        },
    };
}

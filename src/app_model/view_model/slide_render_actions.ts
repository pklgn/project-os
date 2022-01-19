import { RenderRatio, ViewModelType } from './types';

export function SetSlideContainerDimensions(
    viewModel: ViewModelType,
    dimensions: { width: number; height: number },
): ViewModelType {
    return {
        ...viewModel,
        slideRenderInfo: {
            ...viewModel.slideRenderInfo,
            slideContainerDimensions: dimensions,
        },
    };
}

export function SetSlideToContainerRatio(viewModel: ViewModelType, ratio: number): ViewModelType {
    return {
        ...viewModel,
        slideRenderInfo: {
            ...viewModel.slideRenderInfo,
            slideToContainerRatio: ratio,
        },
    };
}

export function SetWindowRatio(viewModel: ViewModelType, ratio: RenderRatio): ViewModelType {
    return {
        ...viewModel,
        slideRenderInfo: {
            ...viewModel.slideRenderInfo,
            windowRatio: ratio,
        },
    };
}

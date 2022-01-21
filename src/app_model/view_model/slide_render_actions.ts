import { RenderRatio, ResizersInfoType, SlideContainerDimensionsType, ViewModelType } from './types';

export function getResizersInfo(viewModel: ViewModelType): ResizersInfoType {
    return viewModel.slideRenderInfo.resizersInfo;
}

export function getElementsRenderRatio(viewModel: ViewModelType): number {
    return viewModel.slideRenderInfo.elementsRenderRatio;
}

export function getSlideContainerDimension(viewModel: ViewModelType): SlideContainerDimensionsType {
    return viewModel.slideRenderInfo.slideContainerDimensions;
}

export function getSlideToContainerRatio(viewModel: ViewModelType): number {
    return viewModel.slideRenderInfo.slideToContainerRatio;
}

export function getWindowRatio(viewModel: ViewModelType): number {
    const ratioInfo = viewModel.slideRenderInfo.windowRatio.split('/');
    const ratio = parseInt(ratioInfo[0]) / parseInt(ratioInfo[1]);
    return ratio;
}

export function setElementsRenderRatio(viewModel: ViewModelType, ratio: number): ViewModelType {
    return {
        ...viewModel,
        slideRenderInfo: {
            ...viewModel.slideRenderInfo,
            elementsRenderRatio: ratio,
        },
    };
}

export function setSlideContainerDimensions(
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

export function setSlideToContainerRatio(viewModel: ViewModelType, ratio: number): ViewModelType {
    return {
        ...viewModel,
        slideRenderInfo: {
            ...viewModel.slideRenderInfo,
            slideToContainerRatio: ratio,
        },
    };
}

export function setWindowRatio(viewModel: ViewModelType, ratio: RenderRatio): ViewModelType {
    return {
        ...viewModel,
        slideRenderInfo: {
            ...viewModel.slideRenderInfo,
            windowRatio: ratio,
        },
    };
}

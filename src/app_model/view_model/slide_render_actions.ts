import { AreaLocation } from '../model/types';
import {
    ElementsRatioType,
    RenderRatio,
    ResizersInfoType,
    SlideContainerDimensionsType,
    ViewBoxType,
    ViewModelType,
} from './types';

export function getResizersInfo(viewModel: ViewModelType): ResizersInfoType {
    return viewModel.slideRenderInfo.resizersInfo;
}

export function getElementsRenderRatio(viewModel: ViewModelType): ElementsRatioType {
    return viewModel.slideRenderInfo.elementsRenderRatio;
}

export function getSlideContainerDimension(viewModel: ViewModelType): SlideContainerDimensionsType {
    return viewModel.slideRenderInfo.slideContainerDimensions;
}

export function getSlideToContainerRatio(viewModel: ViewModelType): number {
    return viewModel.slideRenderInfo.slideToContainerRatio;
}

export function getSlideWhiteAreaLocation(viewModel: ViewModelType): AreaLocation {
    return viewModel.slideRenderInfo.slideWhiteAreaRectLocation;
}

export function getSlideViewBox(viewModel: ViewModelType): ViewBoxType {
    return viewModel.slideRenderInfo.slideViewBox;
}

export function getWindowRatio(viewModel: ViewModelType): number {
    const ratioInfo = viewModel.slideRenderInfo.windowRatio.split('/');
    const ratio = parseInt(ratioInfo[0]) / parseInt(ratioInfo[1]);
    return ratio;
}

export function getWindowRatioAsString(viewModel: ViewModelType): string {
    return viewModel.slideRenderInfo.windowRatio;
}

export function setElementsRenderRatio(viewModel: ViewModelType, ratios: ElementsRatioType): ViewModelType {
    return {
        ...viewModel,
        slideRenderInfo: {
            ...viewModel.slideRenderInfo,
            elementsRenderRatio: ratios,
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

export function setSlideWhiteAreaLocation(viewModel: ViewModelType, location: AreaLocation): ViewModelType {
    return {
        ...viewModel,
        slideRenderInfo: {
            ...viewModel.slideRenderInfo,
            slideWhiteAreaRectLocation: location,
        },
    };
}

export function setSlideViewBox(viewModel: ViewModelType, viewBox: ViewBoxType): ViewModelType {
    return {
        ...viewModel,
        slideRenderInfo: {
            ...viewModel.slideRenderInfo,
            slideViewBox: viewBox,
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

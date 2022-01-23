import { isPicture } from '../../../app_model/model/utils/tools';
import { PictureElement, SlideElement } from '../../../app_model/model/types';

import { store } from '../../../app_model/redux_model/store';
import {
    getElementsRenderRatio,
    getSlideToContainerRatio,
    getWindowRatio,
} from '../../../app_model/view_model/slide_render_actions';

type PictureElementProps = {
    element: SlideElement;
    elementIndex: number;
};

export function PictureElementComponent(props: PictureElementProps) {
    let element: PictureElement;
    if (isPicture(props.element.content)) {
        element = props.element.content;
    } else {
        return null;
    }

    const renderScale = getElementsRenderRatio(store.getState().viewModel);
    const windowRatio = getWindowRatio(store.getState().viewModel);
    const slideToContainerRatio = getSlideToContainerRatio(store.getState().viewModel);

    return (
        <image
            id={`${props.elementIndex}`}
            href={element.src}
            x={props.element.startPoint.x * renderScale.width * slideToContainerRatio}
            y={props.element.startPoint.y * renderScale.height * (slideToContainerRatio / windowRatio)}
            width={props.element.size.width * renderScale.width * slideToContainerRatio}
            height={props.element.size.height * renderScale.height * (slideToContainerRatio / windowRatio)}
        />
    );
}

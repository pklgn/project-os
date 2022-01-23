import { Slide } from '../../../app_model/model/types';

import { useState } from 'react';

import { getSlideToContainerRatio, getWindowRatio } from '../../../app_model/view_model/slide_render_actions';

import { store } from '../../../app_model/redux_model/store';
import { getSlideElementType } from '../../../app_model/model/utils/tools';

import { TextElementComponent } from '../../SlideElements/Text/TextElementComponent';
import { FigureElementComponent } from '../../SlideElements/FigureElements/FigureElementComponent';
import { PictureElementComponent } from '../../SlideElements/Picture/PictureElementComponent';

type DefaultSlideProps = {
    slide: Slide | undefined;
    viewBox?: {
        x: number;
        y: number;
        width: number;
        height: number;
    };
    containerWidth?: number;
    containerHeight?: number;
    slideWidth?: number;
    slideHeight?: number;
    id?: string;
};

export function SlideDefaultComponent(props: DefaultSlideProps): JSX.Element {
    const [slideContainerRatio, setSlideContainerRatio] = useState(
        getSlideToContainerRatio(store.getState().viewModel),
    );
    const [windowRatio, setWindowRatio] = useState(getWindowRatio(store.getState().viewModel));

    const handler = () => {
        const prevSlideContainerRatio = slideContainerRatio;
        const prevWindowRatio = windowRatio;

        const currSlideContainerRatio = getSlideToContainerRatio(store.getState().viewModel);
        const currWindowRatio = getWindowRatio(store.getState().viewModel);

        if (prevSlideContainerRatio !== currSlideContainerRatio) {
            setSlideContainerRatio(currSlideContainerRatio);
        }
        if (prevWindowRatio !== currWindowRatio) {
            setWindowRatio(currWindowRatio);
        }
    };

    store.subscribe(handler);

    const emptySlideWidth = props.containerWidth! * slideContainerRatio;
    const emptySlideHeight = emptySlideWidth / windowRatio;

    let elementIndex = 0;
    return props.slide !== undefined ? (
        <svg
            width={props.slideWidth}
            height={props.slideHeight}
            viewBox={`${-emptySlideWidth / 2} ${
                -emptySlideWidth / 2 / windowRatio
            } ${emptySlideWidth} ${emptySlideHeight}`}
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            id={props.id}
        >
            <rect
                x={-emptySlideWidth / 2}
                y={-emptySlideHeight / 2}
                width={emptySlideWidth}
                height={emptySlideHeight}
                style={{ fill: `${props.slide.background.color}` }}
            />
            {props.slide !== undefined ? (
                props.slide.elementsList.map((element) => {
                    elementIndex = elementIndex + 1;
                    switch (getSlideElementType(element.content)) {
                        case 'TEXT':
                            return (
                                <TextElementComponent key={element.id} elementIndex={elementIndex} element={element} />
                            );
                        case 'FIGURE':
                            return (
                                <FigureElementComponent
                                    key={element.id}
                                    elementIndex={elementIndex}
                                    element={element}
                                />
                            );
                        case 'PICTURE':
                            return (
                                <PictureElementComponent
                                    key={element.id}
                                    elementIndex={elementIndex}
                                    element={element}
                                />
                            );
                    }
                })
            ) : (
                <></>
            )}
        </svg>
    ) : (
        <></>
    );
}

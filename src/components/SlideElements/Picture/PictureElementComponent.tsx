import { isPicture } from '../../../model/utils/tools';
import { PictureElement, SlideElement } from '../../../model/types';
import { useContext, useRef } from 'react';
import { ScaleContext } from '../../AppContent/Slide/SlideComponent';

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

    return (
        <image
            id={`${props.elementIndex}`}
            href={element.src}
            width={props.element.size.width}
            height={props.element.size.height}
            x={props.element.startPoint.x}
            y={props.element.startPoint.y}
        />
    );
}

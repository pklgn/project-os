import { PictureElement, SlideElement } from '../../model/types';
import { isPicture } from '../../model/utils/tools';
import { useRef } from 'react';

type PictureElementProps = {
    element: SlideElement;
};

export function PictureElementComponent(props: PictureElementProps) {
    const ref = useRef(null);
    let element: PictureElement;
    if (isPicture(props.element.content)) {
        element = props.element.content;
    } else {
        return null;
    }

    return (
        <image
            ref={ref}
            href={element.src}
            x={props.element.startPoint.x}
            y={props.element.startPoint.y}
            width={props.element.size.width}
            height={props.element.size.height}
        />
    );
}

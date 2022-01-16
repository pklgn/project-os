import { RefObject, useLayoutEffect, useState } from 'react';
import { getElementsAreaLoaction } from '../../model/elementActions';
import { SelectedAreaLocation, Slide } from '../../model/types';

export function useSlideResize(ref: RefObject<HTMLDivElement>, slide: Slide | undefined) {
    const [selectedAreaLocation, setAreaInfo] = useState(undefined as SelectedAreaLocation | undefined);

    useLayoutEffect(() => {
        if (!ref.current) {
            return;
        }

        if (slide) {
            const selectedElementsArea = getElementsAreaLoaction(
                slide,
                slide.elementsList.map((element) => {
                    return element.id;
                }),
            );

            setAreaInfo(selectedElementsArea);
        }
    }, [ref, slide]);

    return selectedAreaLocation;
}

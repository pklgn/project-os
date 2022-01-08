import styles from './Slide.module.css';

import { FigureElementComponent } from '../../SlideElements/FigureElements/FigureElementComponent';
import { getSlideElementType } from '../../../model/utils/tools';
import { PictureElementComponent } from '../../SlideElements/Picture/PictureElementComponent';
import { Slide } from '../../../model/types';
import { TextElementComponent } from '../../SlideElements/Text/TextElementComponent';
import React, { createContext, LegacyRef, useEffect, useLayoutEffect, useRef, useState } from 'react';

type WorkSpaceProps = {
    width: number;
    height: number;
    slide: Slide | undefined;
};
const defaultScaleValue = 1;
export const ScaleContext = createContext(defaultScaleValue);

export function SlideComponent(props: WorkSpaceProps) {
    const ref = useRef<SVGSVGElement>(null);
    const refSlideBackground = useRef<SVGRectElement>(null);
    // const [scale, setScale] = useState(defaultScaleValue);
    useLayoutEffect(() => {
        // const height = ref.current?.getBoundingClientRect().height ?? 90;
        // setScale(height / 90);
        const refEl = ref.current as SVGElement;
        const refNEl = refSlideBackground.current as SVGGraphicsElement;
        // positionEleToCenter(refNEl, refEl);
    });

    const handle = (e: React.MouseEvent<SVGElement>) => {
        const l = e.target as SVGElement;
        const offset = getOffset(l);
        console.log(`x:${e.clientX - offset.left} y:${e.clientY - offset.top}`);
    };

    return (
        // <ScaleContext.Provider value={scale}>
        <svg
            ref={ref}
            className={styles['slide-component']}
            preserveAspectRatio={'xMinYMin meet'}
            viewBox={'0 0 160 90'}
            onClick={handle}
            height={props.height}
            width={props.width}
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
        >
            {props.slide !== undefined ? (
                props.slide.elementsList.map((element) => {
                    switch (getSlideElementType(element.content)) {
                        case 'TEXT':
                            return <TextElementComponent element={element} />;
                        case 'FIGURE':
                            return <FigureElementComponent element={element} />;
                        case 'PICTURE':
                            return <PictureElementComponent element={element} />;
                    }
                })
            ) : (
                <></>
            )}
            <rect
                ref={refSlideBackground}
                className={styles['visible-workspace']}
                width={80}
                height={45}
                fill="white"
            />
        </svg>
        // </ScaleContext.Provider>
    );
}

function positionEleToCenter(element: SVGGraphicsElement, svgEl: SVGElement) {
    const bbox = element.getBBox();

    const viewBox = svgEl.getAttribute('viewBox')!.split(' ');

    const cx = parseFloat(viewBox[0]) + parseFloat(viewBox[2]) / 2;
    const cy = parseFloat(viewBox[1]) + parseFloat(viewBox[3]) / 2;
    console.log(`center x:${cx} y:${cy}`);

    const x = cx - bbox.x - bbox.width;
    const y = cy - bbox.y - bbox.height;
    console.log(`old x:${bbox.x} y:${bbox.y}`);
    console.log(`new x:${x} y:${y}`);
    const matrix = '1 0 0 1 ' + x.toString() + ' ' + y.toString();

    element.setAttribute('transform', 'matrix(' + matrix + ')');
}

function getOffset(el: SVGElement) {
    const rect = el.getBoundingClientRect();
    return { left: rect.left + window.scrollX, top: rect.top + window.scrollY };
}

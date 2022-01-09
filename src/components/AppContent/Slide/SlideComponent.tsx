import styles from './SlideComponent.module.css';

import { FigureElementComponent } from '../../SlideElements/FigureElements/FigureElementComponent';
import { getSlideElementType } from '../../../model/utils/tools';
import { PictureElementComponent } from '../../SlideElements/Picture/PictureElementComponent';
import { Slide } from '../../../model/types';
import { TextElementComponent } from '../../SlideElements/Text/TextElementComponent';
import { createContext, useRef } from 'react';
import { mockText } from '../../../model/mock/mockEditor';

const VIEWBOX = {
    x_min: 0,
    y_min: 0,
    width: window.screen.width,
    height: window.screen.height,
};

type SlideProps = {
    slide: Slide | undefined;
};

export const ScaleContext = createContext(VIEWBOX);

export function SlideComponent(props: SlideProps) {
    const ref = useRef<SVGSVGElement>(null);

    return (
        <ScaleContext.Provider value={VIEWBOX}>
            <svg
                ref={ref}
                height={'100%'}
                className={styles['slide-container']}
                viewBox={`${Object.values(VIEWBOX).join(' ')}`}
                preserveAspectRatio={'xMinYMin meet'}
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
            >
                <text x={0} y={90} fontSize={16}>
                    {[props.slide?.id]}
                </text>
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
            </svg>
        </ScaleContext.Provider>
    );
}

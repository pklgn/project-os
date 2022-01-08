import styles from './Slide.module.css';

import { FigureElementComponent } from '../../SlideElements/FigureElements/FigureElementComponent';
import { getSlideElementType } from '../../../model/utils/tools';
import { PictureElementComponent } from '../../SlideElements/Picture/PictureElementComponent';
import { Slide } from '../../../model/types';
import { TextElementComponent } from '../../SlideElements/Text/TextElementComponent';
import { createContext, useEffect, useRef, useState } from 'react';

const VIEWBOX = {
    x_min: 0,
    y_min: 0,
    width: 160,
    height: 90,
};

type SlideProps = {
    slide: Slide | undefined;
};
const defaultScaleValue = 1;
export const ScaleContext = createContext(defaultScaleValue);

export function SlideComponent(props: SlideProps) {
    const ref = useRef<SVGSVGElement>(null);
    const [scale, setScale] = useState(defaultScaleValue);
    useEffect(() => {
        const height = ref.current?.getBoundingClientRect().height ?? 90;
        setScale(height / 90);
        console.log(height / 90);
    }, [ref]);

    return (
        <ScaleContext.Provider value={scale}>
            <svg
                ref={ref}
                height={'100%'}
                className={styles['slide-container']}
                viewBox={`${Object.values(VIEWBOX).join(' ')}`}
                preserveAspectRatio={'xMinYMin meet'}
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
            >
                <text x={-10} y={90}>
                    {props.slide?.id}
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

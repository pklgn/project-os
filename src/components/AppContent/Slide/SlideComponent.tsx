import styles from './Slide.module.css';

import { FigureElementComponent } from '../../SlideElements/FigureElements/FigureElementComponent';
import { getSlideElementType } from '../../../model/utils/tools';
import { PictureElementComponent } from '../../SlideElements/Picture/PictureElementComponent';
import { Slide } from '../../../model/types';
import { TextElementComponent } from '../../SlideElements/Text/TextElementComponent';
import { useRef } from 'react';

type SlideProps = {
    id: string | undefined;
    slide: Slide | undefined;
};

export function SlideComponent(props: SlideProps) {
    const ref = useRef<SVGSVGElement>(null);
    const height = ref.current?.getBoundingClientRect().height ?? 90;
    const scale = height / 90;

    return (
        <svg
            ref={ref}
            width={'100%'}
            height={'100%'}
            className={styles['slide-container']}
            viewBox={'0 0 160 90'}
            preserveAspectRatio={'xMinYMin meet'}
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            data-scale={scale}
            id={props.id}
        >
            <text y={90}>{props.slide?.id}</text>
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
    );
}

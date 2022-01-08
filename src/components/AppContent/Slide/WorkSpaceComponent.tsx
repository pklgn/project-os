import styles from './WorkSpace.module.css';
import { getCurrentSlide } from '../../../model/slidesActions';
import { store } from '../../../redux/store';
import { SlideComponent } from './SlideComponent';
import { useResize } from '../../utils/useResize';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';

function WorkSpaceComponent() {
    const ref = useRef(null);
    // const dimensions = useResize(ref);
    const [dimensions, setDimensions] = useState([0, 0]);
    const currentSlide = getCurrentSlide(store.getState().model);
    const unsubscribe = store.subscribe(() => {
        // setDimensions(useResize(ref));
    });

    useLayoutEffect(() => {
        const el = ref.current! as HTMLElement;
        const verticalScrollBarWidth = el.offsetWidth - el.clientWidth;
        const horizonatlScrollBarWidth = el.offsetHeight - el.clientHeight;
        const width = el.offsetWidth - verticalScrollBarWidth;
        const height = el.offsetHeight - horizonatlScrollBarWidth;
        // console.log(`clientW:${el.clientWidth} scrollW:${el.scrollWidth} offsetW:${el.offsetWidth}`);
        // console.log(`clientH:${el.clientHeight} scrollH:${el.scrollHeight} offsetH:${el.offsetHeight}`);
        // console.log(`final width:${width} h:${height}`);
        setDimensions([width, height]);
    }, [ref.current, getCurrentSlide(store.getState().model)]);

    return (
        <div ref={ref} className={styles['workspace-wrapper']}>
            <SlideComponent slide={currentSlide} width={dimensions[0]} height={dimensions[1]} />
        </div>
    );
}

export { WorkSpaceComponent };

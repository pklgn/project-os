import styles from './SlideWorkspace.module.css';
import { getCurrentSlide } from '../../../model/slidesActions';
import { store } from '../../../redux/store';
import { SlideComponentNew } from './SlideComponentNew';
import { useResize } from '../../utils/useResize';
import { useEffect, useRef, useState } from 'react';

function SlideWorkspace() {
    const ref = useRef(null);
    const [dimensions, setDimensions] = useState(useResize(ref));
    const unsubscribe = store.subscribe(() => {
        setDimensions(useResize(ref));
    });
    useEffect(() => {
        return () => {
            unsubscribe();
        };
    }, [dimensions]);

    return (
        <div ref={ref} className={styles['workspace-wrapper']}>
            <SlideComponentNew
                slide={getCurrentSlide(store.getState().model)}
                width={dimensions[0]}
                height={dimensions[1]}
            />
        </div>
    );
}

export { SlideWorkspace };

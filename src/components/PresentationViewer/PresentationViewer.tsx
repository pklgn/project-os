import CSS from 'csstype';
import styles from './PresentationViewer.module.css';

import { bindActionCreators } from 'redux';
import { useDispatch } from 'react-redux';
import { setEditorMode } from '../../redux/action-creators/editorActionCreators';
import { store } from '../../redux/store';

import {
    getCurrentSlide,
    getFirstSlide,
    getNextToSlide,
} from '../../model/slidesActions';
import { Slide } from '../../model/types';

import { useEffect, useRef, useState } from 'react';
import { SlideComponent } from '../AppContent/Slide/SlideComponent';

export function PresentationViewer() {
    const ref = useRef<HTMLDivElement>(null);
    const [slideInShow, setSlideInShow] = useState(
        undefined as Slide | undefined,
    );

    const [visibilityStyle, setVisibilityStyle] = useState({
        display: 'none',
    } as CSS.Properties);

    const dispatch = useDispatch();
    const dispatchSetEditorModeAction = bindActionCreators(
        setEditorMode,
        dispatch,
    );

    useEffect(() => {
        const onKeyDownHandler = (event: KeyboardEvent) => {
            if (event.code === 'Escape') {
                dispatchSetEditorModeAction('edit');
                setSlideInShow(undefined);
                setVisibilityStyle({
                    display: 'none',
                });
                ref.current?.requestFullscreen();
            }
            if (event.code === 'ArrowRight' || event.code === 'ArrowLeft') {
                if (slideInShow !== undefined) {
                    const nextSlide =
                        event.code === 'ArrowLeft'
                            ? getPrevSlideTo(slideInShow)
                            : getNextSlideTo(slideInShow);
                    if (nextSlide !== undefined) {
                        setSlideInShow(nextSlide);
                    }
                }
            }
            if (event.code === 'Space') {
                if (slideInShow !== undefined) {
                    const nextSlide = getNextSlideTo(slideInShow);
                    if (nextSlide !== undefined) {
                        setSlideInShow(nextSlide);
                    }
                }
            }
        };

        const handleChange = () => {
            const editor = store.getState().model;
            if (editor.mode !== 'edit') {
                if (slideInShow === undefined) {
                    const slideToShow =
                        store.getState().model.mode === 'show-from-first-slide'
                            ? getFirstSlide(editor)
                            : getCurrentSlide(editor);
                    if (slideToShow !== undefined) {
                        setSlideInShow(slideToShow);
                        setVisibilityStyle({
                            display: 'inherit',
                        });
                        ref.current?.requestFullscreen();
                    }
                }
            } else {
                setSlideInShow(undefined);
                setVisibilityStyle({
                    display: 'none',
                });
            }
        };
        const unsubscribe = store.subscribe(handleChange);

        document.addEventListener('keydown', onKeyDownHandler);

        return () => {
            document.removeEventListener('keydown', onKeyDownHandler);
            unsubscribe();
        };
    }, [slideInShow, dispatchSetEditorModeAction]);

    const onClickNextSlideSelectorHandler = (
        event: React.MouseEvent<HTMLDivElement>,
    ) => {
        const target = event.target;
        if (slideInShow !== undefined && target instanceof Element) {
            const nextSlide =
                target.className === styles['to-previous-slide-area-selector']
                    ? getPrevSlideTo(slideInShow)
                    : getNextSlideTo(slideInShow);
            if (nextSlide !== undefined) {
                setSlideInShow(nextSlide);
            }
        }
    };

    return (
        <div className={styles.viewer} style={visibilityStyle} ref={ref}>
            <div
                className={styles['to-previous-slide-area-selector']}
                onClick={onClickNextSlideSelectorHandler}
            ></div>
            <SlideComponent
                slide={slideInShow}
                id={slideInShow !== undefined ? slideInShow.id : undefined}
            />
            <svg className={styles['prevent-pointer-events']}></svg>
            <div
                className={styles['to-next-slide-area-selector']}
                onClick={onClickNextSlideSelectorHandler}
            ></div>
        </div>
    );
}

function getNextSlideTo(slide: Slide): Slide | undefined {
    return getNextToSlide(store.getState().model, slide, 'next');
}

function getPrevSlideTo(slide: Slide): Slide | undefined {
    return getNextToSlide(store.getState().model, slide, 'prev');
}

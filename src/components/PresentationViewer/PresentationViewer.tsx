import CSS from 'csstype';
import styles from './PresentationViewer.module.css';

import { bindActionCreators } from 'redux';
import { useDispatch } from 'react-redux';
import { setEditorMode } from '../../redux/action-creators/editorActionCreators';
import { store } from '../../redux/store';

import { getCurrentSlide, getFirstSlide, getNextToSlide } from '../../model/slidesActions';
import { Slide } from '../../model/types';

import { SlideComponent } from '../AppContent/Slide/SlideComponentOld';

import React, { useContext, useEffect, useRef, useState } from 'react';

import { LocaleContext } from '../../App';

export function PresentationViewer() {
    const localeContext = useContext(LocaleContext);

    const ref = useRef<HTMLDivElement>(null);
    const [slideInShow, setSlideInShow] = useState(undefined as Slide | undefined);

    const [visibilityStyle, setVisibilityStyle] = useState({
        display: 'none',
    } as CSS.Properties);

    const dispatch = useDispatch();
    const dispatchSetEditorModeAction = bindActionCreators(setEditorMode, dispatch);

    useEffect(() => {
        const onKeyDownHandler = (event: KeyboardEvent) => {
            if (event.code === 'ArrowRight' || event.code === 'ArrowLeft') {
                if (slideInShow !== undefined) {
                    const nextSlide =
                        event.code === 'ArrowLeft' ? getPrevSlideTo(slideInShow) : getNextSlideTo(slideInShow);
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

        const onFullScreenHandler = () => {
            if (document.fullscreenElement) {
                setVisibilityStyle({
                    display: 'inherit',
                });
            } else {
                dispatchSetEditorModeAction('edit');
                setSlideInShow(undefined);
                setVisibilityStyle({
                    display: 'none',
                });
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
                    }
                    ref.current?.requestFullscreen();
                }
            }
        };

        const unsubscribe = store.subscribe(handleChange);

        document.addEventListener('keydown', onKeyDownHandler);
        document.addEventListener('fullscreenchange', onFullScreenHandler);

        return () => {
            document.removeEventListener('keydown', onKeyDownHandler);
            document.removeEventListener('fullscreenchange', onFullScreenHandler);
            unsubscribe();
        };
    }, [slideInShow, dispatchSetEditorModeAction]);

    const onClickNextSlideSelectorHandler = (event: React.MouseEvent<HTMLDivElement>) => {
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
            {slideInShow !== undefined ? (
                <>
                    <div
                        className={styles['to-previous-slide-area-selector']}
                        onClick={onClickNextSlideSelectorHandler}
                    />
                    <SlideComponent slide={slideInShow} />
                    <svg className={styles['prevent-pointer-events']} />
                    <div className={styles['to-next-slide-area-selector']} onClick={onClickNextSlideSelectorHandler} />
                </>
            ) : (
                <div className={styles['empty-slide-in-show']}>
                    {localeContext.locale.localization['no-slides-to-show-info']}
                </div>
            )}
        </div>
    );
}

function getNextSlideTo(slide: Slide): Slide | undefined {
    return getNextToSlide(store.getState().model, slide, 'next');
}

function getPrevSlideTo(slide: Slide): Slide | undefined {
    return getNextToSlide(store.getState().model, slide, 'prev');
}

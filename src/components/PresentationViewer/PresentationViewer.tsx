import CSS from 'csstype';
import styles from './PresentationViewer.module.css';

import { dispatchSetEditorModeAction } from '../../app_model/redux_model/dispatchers';
import { useDispatch } from 'react-redux';
import { store } from '../../app_model/redux_model/store';

import { getCurrentSlide, getFirstSlide, getNextSlideTo, getPrevSlideTo } from '../../app_model/model/slides_actions';
import { getSlideContainerDimension, getWindowRatio } from '../../app_model/view_model/slide_render_actions';
import { Slide } from '../../app_model/model/types';

import React, { useContext, useEffect, useLayoutEffect, useRef, useState } from 'react';

import { LocaleContext } from '../../App';
import { SlideDefaultComponent } from '../AppContent/Slide/SlideDefaultComponent';

export function PresentationViewer() {
    const localeContext = useContext(LocaleContext);

    const ref = useRef<HTMLDivElement>(null);
    const [slideInShow, setSlideInShow] = useState(undefined as Slide | undefined);

    const [visibilityStyle, setVisibilityStyle] = useState({
        display: 'none',
    } as CSS.Properties);

    const dispatch = useDispatch();

    const handleChange = () => {
        const viewModel = store.getState().viewModel;
        const editor = store.getState().model;
        if (viewModel.appMode !== 'EDIT') {
            if (slideInShow === undefined) {
                const slideToShow =
                    store.getState().viewModel.appMode === 'SHOW_FROM_FIRST_SLIDE'
                        ? getFirstSlide(editor)
                        : getCurrentSlide(editor);
                if (slideToShow !== undefined) {
                    setSlideInShow(slideToShow);
                }
                ref.current?.requestFullscreen();
            }
        }
    };

    store.subscribe(handleChange);

    useEffect(() => {
        const onKeyDownHandler = (event: KeyboardEvent) => {
            const editorModel = store.getState().model;
            if (event.code === 'ArrowRight' || event.code === 'ArrowLeft') {
                if (slideInShow !== undefined) {
                    const nextSlide =
                        event.code === 'ArrowLeft'
                            ? getPrevSlideTo(editorModel, slideInShow)
                            : getNextSlideTo(editorModel, slideInShow);
                    if (nextSlide !== undefined) {
                        setSlideInShow(nextSlide);
                    }
                }
            }
            if (event.code === 'Space') {
                if (slideInShow !== undefined) {
                    const nextSlide = getNextSlideTo(editorModel, slideInShow);
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
                dispatchSetEditorModeAction(dispatch)('EDIT');
                setSlideInShow(undefined);
                setVisibilityStyle({
                    display: 'none',
                });
            }
        };

        document.addEventListener('keydown', onKeyDownHandler);
        document.addEventListener('fullscreenchange', onFullScreenHandler);

        return () => {
            document.removeEventListener('keydown', onKeyDownHandler);
            document.removeEventListener('fullscreenchange', onFullScreenHandler);
        };
    }, [dispatch, slideInShow]);

    const onClickNextSlideSelectorHandler = (event: React.MouseEvent<HTMLDivElement>) => {
        const target = event.target;
        if (slideInShow !== undefined && target instanceof Element) {
            const nextSlide =
                target.className === styles['to-previous-slide-area-selector']
                    ? getPrevSlideTo(store.getState().model, slideInShow)
                    : getNextSlideTo(store.getState().model, slideInShow);
            if (nextSlide !== undefined) {
                setSlideInShow(nextSlide);
            }
        }
    };

    const [windowWidth, setListWidth] = useState(0);
    const [windowRatio, setWindowRatio] = useState(getWindowRatio(store.getState().viewModel));
    const mainContainerDimensions = getSlideContainerDimension(store.getState().viewModel);

    useLayoutEffect(() => {
        const handleWindowRatioChange = () => {
            const prevValue = windowRatio;
            const currValue = getWindowRatio(store.getState().viewModel);
            if (prevValue !== currValue) {
                setWindowRatio(currValue);
            }
        };

        if (ref.current && windowWidth === 0) {
            setListWidth(window.screen.width);
        }

        const unsubscribe = store.subscribe(handleWindowRatioChange);
        return () => {
            unsubscribe();
        };
    }, [windowWidth, windowRatio]);

    return (
        <div className={styles.viewer} style={visibilityStyle} ref={ref}>
            {slideInShow !== undefined ? (
                <>
                    <div
                        className={styles['to-previous-slide-area-selector']}
                        onClick={onClickNextSlideSelectorHandler}
                    />
                    <SlideDefaultComponent
                        slideWidth={windowWidth}
                        slideHeight={windowWidth / windowRatio}
                        containerWidth={mainContainerDimensions.width}
                        containerHeight={mainContainerDimensions.height}
                        viewBox={{
                            x: 0,
                            y: 0,
                            width: mainContainerDimensions.width,
                            height: mainContainerDimensions.height,
                        }}
                        slide={slideInShow}
                    />
                    <svg className={styles['prevent-pointer-events']} />
                    <div className={styles['to-next-slide-area-selector']} onClick={onClickNextSlideSelectorHandler} />
                </>
            ) : (
                <div className={styles['empty-slide-in-show']}>
                    {localeContext.locale.localization.presentationViewer.noSlidesToShow}
                </div>
            )}
        </div>
    );
}

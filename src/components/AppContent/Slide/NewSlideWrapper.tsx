import styles from './SlideComponent.module.css';
import wrapperStyles from './SlideWrapper.module.css';

import { LegacyRef, useState } from 'react';
import { SlideComponent } from './SlideComponent';

import { store } from '../../../redux/store';
import { getCurrentSlide } from '../../../model/slidesActions';
import { Slide } from '../../../model/types';
import { TextareaEditor } from '../../PresentationEditor/TextareaEditor';

export type editingStatus = {
    slideRef: LegacyRef<HTMLDivElement> | null;
    textEditing: boolean;
    setTextEditing: (status: boolean) => void;
};

export function NewSlideWrapper(props: editingStatus) {
    const [currSlide, changeCurrSlide] = useState(getCurrentSlide(store.getState().model) as Slide | undefined);
    const [currSlideId, changeCurrSlideId] = useState(
        getCurrentSlide(store.getState().model)?.id as string | undefined,
    );

    const handleChange = () => {
        const previousValue = currSlideId;
        const currSlide = getCurrentSlide(store.getState().model);
        if (currSlide !== undefined) {
            const currValue = currSlide.id;

            if (previousValue !== currValue) {
                changeCurrSlide(currSlide);
                changeCurrSlideId(currValue);
            }
        } else {
            changeCurrSlide(undefined);
            changeCurrSlideId(undefined);
        }
    };
    store.subscribe(handleChange);

    return (
        <div className={wrapperStyles.wrapper}>
            <div className={styles.slide} ref={props.slideRef}>
                <SlideComponent renderType="mainSlide" slide={currSlide} />
                <TextareaEditor
                    slideRef={props.slideRef}
                    textEditing={props.textEditing}
                    setTextEditing={props.setTextEditing}
                />
            </div>
        </div>
    );
}

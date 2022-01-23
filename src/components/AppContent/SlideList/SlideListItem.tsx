import styles from './SlideListItem.module.css';

import { Slide } from '../../../app_model/model/types';
import { SlideDefaultComponent } from '../Slide/SlideDefaultComponent';
import { SlideComponent } from '../Slide/SlideComponent';
import {
    getSlideContainerDimension,
    getSlideToContainerRatio,
    getSlideViewBox,
    getWindowRatio,
} from '../../../app_model/view_model/slide_render_actions';
import { store } from '../../../app_model/redux_model/store';

type SlideListItemProps = {
    item: Slide;
    status: boolean;
    itemIndex: number;
    width?: number;
    height?: number;
    viewBox?: {
        x: number;
        y: number;
        width: number;
        height: number;
    };
    shouldRenderHrs?: boolean;
};

export function SlideListItem(props: SlideListItemProps) {
    const itemWrapperStyle = props.status ? styles['item-active'] : '';
    const itemNumberStyle = props.status ? styles['number-active'] : styles['number-disabled'];

    const viewBox = getSlideViewBox(store.getState().viewModel);
    const mainSlideContainerDimensions = getSlideContainerDimension(store.getState().viewModel);

    const slideContainerRatio = getSlideToContainerRatio(store.getState().viewModel);
    const windowRatio = getWindowRatio(store.getState().viewModel);

    const emptySlideWidth = mainSlideContainerDimensions.width! * slideContainerRatio;
    const emptySlideHeight = emptySlideWidth / windowRatio;

    return (
        <>
            <div className={`${styles['list-item']} ${itemWrapperStyle}`}>
                <SlideDefaultComponent
                    slide={props.item}
                    viewBox={props.viewBox}
                    slideWidth={props.width}
                    slideHeight={props.height}
                    containerWidth={props.viewBox?.width}
                    containerHeight={props.viewBox?.height}
                />
                <div className={styles['hidden-slide']}>
                    <SlideComponent
                        slide={props.item}
                        viewBox={{
                            x: -emptySlideWidth / 2,
                            y: -emptySlideHeight / 2,
                            width: emptySlideWidth,
                            height: emptySlideHeight,
                        }}
                        containerWidth={emptySlideWidth}
                        containerHeight={emptySlideHeight}
                        slideWidth={emptySlideWidth}
                        slideHeight={emptySlideHeight}
                        id={'hidden-slide'}
                    />
                </div>
                {props.shouldRenderHrs ? (
                    <>
                        <span className={styles['prevent-pointer-events-top']} id={`${props.itemIndex}`} />
                        <span className={styles['prevent-pointer-events-bottom']} id={`${props.itemIndex + 1}`} />
                    </>
                ) : (
                    <span className={styles['prevent-pointer-events']} id={`${props.itemIndex + 1}`} />
                )}
            </div>
            <div className={`${styles['item-number']} ${itemNumberStyle}`}>{props.itemIndex + 1}</div>
        </>
    );
}

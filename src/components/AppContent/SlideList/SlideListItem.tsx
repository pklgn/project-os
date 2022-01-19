import styles from './SlideListItem.module.css';

import { Slide } from '../../../app_model/model/types';
import { SlideComponent } from '../Slide/SlideComponent';

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
};

export function SlideListItem(props: SlideListItemProps) {
    const itemWrapperStyle = props.status ? styles['item-active'] : '';
    const itemNumberStyle = props.status ? styles['number-active'] : styles['number-disabled'];

    return (
        <>
            <div className={`${styles['list-item']} ${itemWrapperStyle}`}>
                <SlideComponent
                    renderType="default"
                    slide={props.item}
                    viewBox={props.viewBox}
                    slideWidth={props.width}
                    slideHeight={props.height}
                    containerWidth={props.viewBox?.width}
                    containerHeight={props.viewBox?.height}
                />
                <svg className={styles['prevent-pointer-events-top']} id={`${props.itemIndex}`} />
                <svg className={styles['prevent-pointer-events-bottom']} id={`${props.itemIndex + 1}`} />
            </div>
            <div className={`${styles['item-number']} ${itemNumberStyle}`}>{props.itemIndex + 1}</div>
        </>
    );
}

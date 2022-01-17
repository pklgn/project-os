import styles from './SlideList.module.css';

import { Slide } from '../../../app_model/model/types';
import { SlideComponent } from '../Slide/SlideComponent';

type SlideListItemProps = {
    item: Slide;
    status: boolean;
    itemIndex: number;
};

export function SlideListItem(props: SlideListItemProps) {
    const itemWrapperStyle = props.status ? styles['list-item-active'] : styles['list-item-disabled'];
    const itemNumberStyle = props.status ? styles['item-number-active'] : styles['item-number-disabled'];

    return (
        <>
            <div className={itemWrapperStyle}>
                <SlideComponent renderType="default" slide={props.item} />
                <svg className={styles['prevent-pointer-events']} id={`${props.itemIndex + 1}`} />
            </div>
            <div className={itemNumberStyle}>{props.itemIndex + 1}</div>
        </>
    );
}

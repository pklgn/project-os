import styles from "./SlideList.module.css";

import { Slide } from "../../../model/types"
import { SlideComponent } from "../Slide/SlideComponent";

type SlideListItemProps = {
    item: Slide,
    status: boolean,
    itemIndex: number
}

export function SlideListItem(props: SlideListItemProps) {
    const itemWrapperStyle = (props.status)
        ? styles['list-item-wrapper-active']
        : styles['list-item-wrapper-disabled'];
    const itemNumberStyle = (props.status)
        ? styles['item-number-active']
        : styles['item-number-disabled'];

    return <li className={itemWrapperStyle}>
        <div
            className={styles['list-item']}
        >
            <div className={itemNumberStyle}>
                {props.itemIndex + 1}
            </div>
            <SlideComponent slide={props.item} />
            <div className={styles["prevent-pointer-events"]} id={`${props.itemIndex}`} key={props.itemIndex} />
        </div>
    </li>
}
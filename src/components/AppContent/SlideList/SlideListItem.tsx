import styles from "./SlideList.module.css";

import { Slide } from "../../../model/types"
import { SlideComponent } from "../Slide/SlideComponent";
import { BaseSyntheticEvent } from "react";

type SlideListItemProps = {
    item: Slide,
    status: boolean,
    itemIndex: number,
    onMouseEnter: (event: BaseSyntheticEvent) => void,
    onMouseLeave: (event: BaseSyntheticEvent) => void
}

export function SlideListItem(props: SlideListItemProps) {
    const itemWrapperStyle = (props.status)
        ? styles['list-item-active']
        : styles['list-item-disabled'];
    const itemNumberStyle = (props.status)
        ? styles['item-number-active']
        : styles['item-number-disabled'];

    return <div
        className={itemWrapperStyle}
        onMouseEnter={props.onMouseEnter}
        onMouseLeave={props.onMouseLeave}
    >
        <div className={itemNumberStyle}>
            {props.itemIndex + 1}
        </div>
        <SlideComponent slide={props.item} />
        <div className={styles["prevent-pointer-events"]} id={`${props.itemIndex + 1}`} key={props.itemIndex} />
    </div>;
}
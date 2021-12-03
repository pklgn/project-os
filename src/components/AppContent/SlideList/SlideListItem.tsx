import styles from "./SlideList.module.css";
import {Slide} from "../../../model/types"
import {SlideComponent} from "../Slide/SlideComponent";


type SlideListItemProps = {
    item: Slide,
}

function SlideListItem(props: SlideListItemProps) {
    return <li className={styles['list-item-wrapper']}>
        <div
            className={styles['list-item']}
        >
            <SlideComponent slide={props.item}/>
            <div className={styles["prevent-pointer-events"]}/>
        </div>
    </li>
}

export {
    SlideListItem,
}
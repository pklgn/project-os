import styles from "./SlideList.module.css";
import {useRef} from "react";
import {Slide} from "../../../model/types";
import {SlideListItem} from "./SlideListItem";

type SlideListProps = {
    slidesList: Slide[],
}

export function SlideList(props: SlideListProps) {
    const ref = useRef<HTMLUListElement>(null)

    return <ul
        className={`${styles.list} ${styles['list-wrapper']}`}
        ref={ref}
    >
        {
            props.slidesList.map((slide) => {
                return <SlideListItem item={slide}/>
            })
        }
    </ul>
}
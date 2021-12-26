import styles from "./SlideList.module.css";

import { useRef } from "react";

import { SlideListItem } from "./SlideListItem";

import { Editor, Slide } from "../../../model/types";
import { connect } from "react-redux";

type SlideListProps = {
    slidesList: Slide[],
}

export function SlideList(props: SlideListProps) {
    const ref = useRef<HTMLUListElement>(null);

    return <ul
        className={`${styles.list} ${styles['list-wrapper']}`}
        ref={ref}
    >
        {
            props.slidesList.map((slide, index) => {
                return <SlideListItem item={slide} itemNumber={index + 1} key={slide.id} />
            })
        }
    </ul>;
}

const mapStateToProps = (state: Editor) => {
    console.log('CALLED');
    return {
        slidesList: state.presentation.slidesList
    }
}

export default connect(mapStateToProps)(SlideList);
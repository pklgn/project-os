import styles from "./SlideList.module.css";
import { useRef } from "react";
import { Editor, Slide } from "../../../model/types";
import { SlideListItem } from "./SlideListItem";
import { generateUUId } from '../../../model/utils/uuid';
import { connect } from "react-redux";

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
                return <SlideListItem item={slide} key={slide.id}/>
            })
        }
    </ul>
}

function mapStateToProps(state: Editor) {
    console.log('CALLED');
    return {
        slidesList: state.presentation.slidesList
    }
}

export default connect(mapStateToProps)(SlideList);
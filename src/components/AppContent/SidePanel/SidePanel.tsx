import {SlideList} from "../SlideList/SlideList";
import styles from "./SidePanel.module.css"
import {mockSlide} from "../../../model/mock/mockSlide";

function SidePanel() {
    //TODO получать здесь список слайдов
    return <div className={styles['slide-list']}>
        <SlideList slidesList={[
            mockSlide,
            mockSlide,
            mockSlide,
            mockSlide,
            mockSlide,
            mockSlide,
            mockSlide,
        ]}/>
    </div>
}

export {
    SidePanel,
}
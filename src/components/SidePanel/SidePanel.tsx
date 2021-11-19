import {SlideList} from "../AppContent/SlideList/SlideList";
import styles from "./SidePanel.module.css"

function SidePanel() {
    return <div className={styles['slide-list']}>
        <SlideList/>
    </div>
}
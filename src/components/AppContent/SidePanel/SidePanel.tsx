import { SlideList } from "../SlideList/SlideList";
import styles from "./SidePanel.module.css"

import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/reducers/rootReducer';

function SidePanel() {
    const state = useSelector((state: RootState) => state.presentation);

    //TODO получать здесь список слайдов
    return <div className={styles['slide-list']}>
        <SlideList slidesList={state.presentation.slidesList}/>
    </div>
}

export {
    SidePanel,
}
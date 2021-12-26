import { SlideList } from "../SlideList/SlideList";
import styles from "./SidePanel.module.css"

import { RootState } from '../../../redux/reducers/rootReducer';
import { connect, useSelector } from 'react-redux';

import { Editor } from "../../../model/types";

export function SidePanel() {
    const state = useSelector((state: RootState) => state.allReducers);

    return <div className={styles['slide-list']}>
        <SlideList slidesList={state.presentation.slidesList}/>
    </div>
}
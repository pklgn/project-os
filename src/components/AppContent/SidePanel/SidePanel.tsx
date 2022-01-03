import { SlideList } from '../SlideList/SlideList';
import styles from './SidePanel.module.css';

import { RootState } from '../../../redux/reducers/rootReducer';
import { useSelector } from 'react-redux';

export function SidePanel() {
    const state = useSelector((state: RootState) => state.model);

    return (
        <div className={styles['slide-list']}>
            <SlideList slidesList={state.presentation.slidesList} />
        </div>
    );
}

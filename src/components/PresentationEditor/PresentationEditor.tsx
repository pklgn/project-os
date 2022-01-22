import styles from './PresentationEditor.module.css';

import { AppTop } from '../AppTop/AppTop';
import { SlideListTool } from '../AppFooter/SlideListTool/SlideListTool';
import { SidePanel } from '../AppContent/SidePanel/SidePanel';
import { SlideWrapper } from '../AppContent/Slide/SlideWrapper';
import { FooterToolsList } from '../AppFooter/FooterToolsList/FooterToolsList';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setChosenElementsType } from '../../app_model/redux_model/actions_view_model/action_creators/chosen_elements_action_creator';
import { useEffect } from 'react';
import { store } from '../../app_model/redux_model/store';
import { getSlideElementType } from '../../app_model/model/utils/tools';

export function PresentationEditor(): JSX.Element {
    return (
        <div className={styles.editor}>
            <AppTop />
            <SidePanel />
            <SlideListTool />
            <SlideWrapper />
            <FooterToolsList />
        </div>
    );
}

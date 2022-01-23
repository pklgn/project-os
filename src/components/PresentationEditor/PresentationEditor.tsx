import styles from './PresentationEditor.module.css';

import { AppTop } from '../AppTop/AppTop';
import { SlideListTool } from '../AppFooter/SlideListTool/SlideListTool';
import { SidePanel } from '../AppContent/SidePanel/SidePanel';
import { SlideWrapper } from '../AppContent/Slide/SlideWrapper';
import { FooterToolsList } from '../AppFooter/FooterToolsList/FooterToolsList';

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

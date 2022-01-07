import { AppTop } from '../AppTop/AppTop';
import { useState } from 'react';
import styles from './PresentationEditor.module.css';
import { ElementListTool } from '../AppFooter/ElementListTool/ElementListTool';
import { ReorderListTool } from '../AppFooter/ReorderList Tool/ReorderListTool';
import { SlideListTool } from '../AppFooter/SlideListTool/SlideListTool';
import { SlideWrapper } from '../AppContent/Slide/SlideWrapper';
import { SidePanel } from '../AppContent/SidePanel/SidePanel';
import { SlideWorkspace } from '../AppContent/Slide/SlideWorkspace';

export function PresentationEditor(): JSX.Element {
    const [menuSwitcher, setMenuSwitcher] = useState(true);
    const handleToggleView = () => setMenuSwitcher(!menuSwitcher);
    return (
        <div className={styles.editor}>
            <AppTop />
            <SidePanel />
            <SlideWorkspace />
            <SlideListTool foo={() => undefined} />
            {menuSwitcher ? <ElementListTool foo={handleToggleView} /> : <ReorderListTool foo={handleToggleView} />}
        </div>
    );
}

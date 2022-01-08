import { AppTop } from '../AppTop/AppTop';
import { useState } from 'react';
import styles from './PresentationEditor.module.css';
import { ElementListTool } from '../AppFooter/ElementListTool/ElementListTool';
import { ReorderListTool } from '../AppFooter/ReorderList Tool/ReorderListTool';
import { SlideListTool } from '../AppFooter/SlideListTool/SlideListTool';
import { SidePanel } from '../AppContent/SidePanel/SidePanel';
import { WorkSpaceComponent } from '../AppContent/Slide/WorkSpaceComponent';

export function PresentationEditor(): JSX.Element {
    const [menuSwitcher, setMenuSwitcher] = useState(true);
    const handleToggleView = () => setMenuSwitcher(!menuSwitcher);
    return (
        <div className={styles.editor}>
            <AppTop />
            <SidePanel />
            <WorkSpaceComponent />
            <SlideListTool foo={() => undefined} />
            {menuSwitcher ? <ElementListTool foo={handleToggleView} /> : <ReorderListTool foo={handleToggleView} />}
        </div>
    );
}

import styles from './PresentationEditor.module.css';

import { AppTop } from '../AppTop/AppTop';
import { SlideEditor } from './SlideEditor';
import { SlideListTool } from '../AppFooter/SlideListTool/SlideListTool';
import { SidePanel } from '../AppContent/SidePanel/SidePanel';

export enum listName {
    ELEMENT_LIST = 'ELEMENT_LIST',
    REORDER_LIST = 'REORDER_LIST',
    TEXT_TOOLS_LIST_BUTTON = 'TEXT_TOOLS_LIST_BUTTON',
    FIGURE_TOOLS_LIST_BUTTON = 'FIGURE_TOOLS_LIST_BUTTON',
}

export function PresentationEditor(): JSX.Element {
    return (
        <div className={styles.editor}>
            <AppTop />
            <SidePanel />
            <SlideListTool foo={() => undefined} />
            <SlideEditor />
        </div>
    );
}

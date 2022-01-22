import styles from './PresentationEditor.module.css';

import { AppTop } from '../AppTop/AppTop';
import { SlideListTool } from '../AppFooter/SlideListTool/SlideListTool';
import { SidePanel } from '../AppContent/SidePanel/SidePanel';
import { SlideWrapper } from '../AppContent/Slide/SlideWrapper';
import { ElementListTool } from '../AppFooter/ElementListTool/ElementListTool';

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
            <SlideListTool />
            <SlideWrapper />
            <ElementListTool />
        </div>
    );
}

import { AppTop } from '../AppTop/AppTop';
import { useState } from 'react';
import styles from './PresentationEditor.module.css';
import { ElementListTool } from '../AppFooter/ElementListTool/ElementListTool';
import { ReorderListTool } from '../AppFooter/ReorderList Tool/ReorderListTool';
import { SlideListTool } from '../AppFooter/SlideListTool/SlideListTool';
import { SlideWrapper } from '../AppContent/Slide/SlideWrapper';
import { SidePanel } from '../AppContent/SidePanel/SidePanel';
import { TextToolsList } from '../AppFooter/TextToolsList/TextToolsList';
import { FigureToolsList } from '../AppFooter/FigureToolsList/FigureToolsList';

export enum listName {
    ELEMENT_LIST = 'ELEMENT_LIST',
    REORDER_LIST = 'REORDER_LIST',
    TEXT_TOOLS_LIST_BUTTON = 'TEXT_TOOLS_LIST_BUTTON',
    FIGURE_TOOLS_LIST_BUTTON = 'FIGURE_TOOLS_LIST_BUTTON',
}

export function PresentationEditor(): JSX.Element {
    const [menuSwitcher, setMenuSwitcher] = useState(listName.ELEMENT_LIST);

    return (
        <div className={styles.editor}>
            <AppTop />
            <SidePanel />
            <SlideWrapper />
            <SlideListTool foo={() => undefined} />
            {(() => {
                switch (menuSwitcher) {
                    case listName.ELEMENT_LIST:
                        return <ElementListTool foo={setMenuSwitcher} />;
                    case listName.REORDER_LIST:
                        return <ReorderListTool foo={setMenuSwitcher} />;
                    case listName.TEXT_TOOLS_LIST_BUTTON:
                        return <TextToolsList foo={setMenuSwitcher} />;
                    case listName.FIGURE_TOOLS_LIST_BUTTON:
                        return <FigureToolsList foo={setMenuSwitcher} />;
                }
            })()}
        </div>
    );
}

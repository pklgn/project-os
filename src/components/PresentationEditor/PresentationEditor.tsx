import { AppTop } from "../AppTop/AppTop";
import { useState } from "react";
import styles from "./PresentationEditor.module.css";
import { ElementListTool } from "../AppFooter/ElementListTool/ElementListTool";
import { ReorderListTool } from "../AppFooter/ReorderList Tool/ReorderListTool";
import { SlideListTool } from "../AppFooter/SlideListTool/SlideListTool";
import { SlideList } from "../AppContent/SlideList/SlideList";
import { SlideWrapper } from "../AppContent/Slide/SlideWrapper";

export function PresentationEditor(): JSX.Element {
    const [menuSwitcher, setMenuSwitcher] = useState(true);
    const handleToggleView = () => setMenuSwitcher(!menuSwitcher);
    return (
        <div className={styles.editor}>
            <AppTop />
            <SlideList />
            <SlideWrapper />
            <SlideListTool />
            {
                menuSwitcher
                ? <ElementListTool foo={handleToggleView}/>
                : <ReorderListTool foo={handleToggleView}/>
            }
        </div>
    );
}

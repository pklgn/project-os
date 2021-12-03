import { AppTop } from "../AppTop/AppTop";
import styles from "./PresentationEditor.module.css";
import { ElementListTool } from "../AppFooter/ElementListTool/ElementListTool";
import { SlideListTool } from "../AppFooter/SlideListTool/SlideListTool";
import { SlideWrapper } from "../AppContent/Slide/SlideWrapper";
import {SidePanel} from "../AppContent/SidePanel/SidePanel";

export function PresentationEditor(): JSX.Element {
    return (
        <div className={styles.editor}>
            <AppTop />
            <SidePanel />
            <SlideWrapper />
            <SlideListTool />
            <ElementListTool />
        </div>
    );
}

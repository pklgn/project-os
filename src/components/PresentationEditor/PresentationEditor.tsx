import { TopBar } from "../AppTop/TopBar";
import styles from "./PresentationEditor.module.css";
import { ElementListTool } from "../AppFooter/ElementListTool/ElementListTool";
import { SlideListTool } from "../AppFooter/SlideListTool/SlideListTool";
import { SlideList } from "../AppContent/SlideList/SlideList";
import { Slide } from "../AppContent/Slide/Slide";

export function PresentationEditor(): JSX.Element {
    return (
        <div className={styles.editor}>
            <TopBar />
            <SlideList />
            <Slide />
            <SlideListTool />
            <ElementListTool />
        </div>
    );
}

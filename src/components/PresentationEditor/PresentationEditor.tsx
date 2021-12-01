import { AppTop } from "../AppTop/AppTop";
import styles from "./PresentationEditor.module.css";
import { ElementListTool } from "../AppFooter/ElementListTool/ElementListTool";
import { SlideListTool } from "../AppFooter/SlideListTool/SlideListTool";
import { SlideList } from "../AppContent/SlideList/SlideList";
import { Slide } from "../AppContent/Slide/Slide";

export function PresentationEditor(): JSX.Element {
    return (
        <div className={styles.editor}>
            <AppTop />
            <SlideList />
            <Slide />
            <SlideListTool />
            <ElementListTool />
        </div>
    );
}

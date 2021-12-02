<<<<<<< HEAD
import { AppTop } from "../AppTop/AppTop";
=======
import { TopBar } from "../AppTop/TopBar";
>>>>>>> os/dev-5-ermakov
import styles from "./PresentationEditor.module.css";
import { ElementListTool } from "../AppFooter/ElementListTool/ElementListTool";
import { SlideListTool } from "../AppFooter/SlideListTool/SlideListTool";
import { SlideList } from "../AppContent/SlideList/SlideList";
import { SlideWrapper } from "../AppContent/Slide/SlideWrapper";

export function PresentationEditor(): JSX.Element {
    return (
        <div className={styles.editor}>
            <AppTop />
            <SlideList />
            <SlideWrapper />
            <SlideListTool />
            <ElementListTool />
        </div>
    );
}

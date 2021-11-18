import { Bottom } from "../AppFooter/Bottom";
import { Content } from "../AppContent/Content";
import { TopBar } from "../TopBar/TopBar";
import styles from "./PresentationEditor.module.css";
import {SlideList} from "../AppContent/SlideList/SlideList";
import {Slide} from "../AppContent/Slide/Slide";

export function PresentationEditor(): JSX.Element {
    return (
        <div className={styles.editor}>
            <TopBar />
            <SlideList />
            <Slide />
            <Bottom />
        </div>
    );
}
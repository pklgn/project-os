import { Bottom } from "../AppBottom/Bottom";
import { Center } from "../AppCenter/Center";
import { TopBar } from "../TopBar/TopBar";
import styles from "./PresentationEditor.module.css";

export function PresentationEditor(): JSX.Element {
    return (
        <div className={styles.editor}>
            <TopBar />
            <Center />
            <Bottom />
        </div>
    );
}
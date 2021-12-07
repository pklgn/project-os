<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
import { useState } from "react";
>>>>>>> dev-5-ivaykov
import { AppTop } from "../AppTop/AppTop";
=======
import { useState } from "react";
import { TopBar } from "../AppTop/TopBar";
>>>>>>> 9f19cd7 (Простая анимация готова. Никаких TransitionGroup, никаких библиотек. Сойдёт)
=======
import { useState } from "react";
import { AppTop } from "../AppTop/AppTop";
>>>>>>> 459a2cd (toolbar.  Для элементов)
import styles from "./PresentationEditor.module.css";
import { ElementListTool } from "../AppFooter/ElementListTool/ElementListTool";
import { ReorderListTool } from "../AppFooter/ReorderList Tool/ReorderListTool";
import { SlideListTool } from "../AppFooter/SlideListTool/SlideListTool";
import { SlideWrapper } from "../AppContent/Slide/SlideWrapper";
import {SidePanel} from "../AppContent/SidePanel/SidePanel";

export function PresentationEditor(): JSX.Element {
    const [menuSwitcher, setMenuSwitcher] = useState(true);
    const handleToggleView = () => setMenuSwitcher(!menuSwitcher);
    return (
        <div className={styles.editor}>
            <AppTop />
            <SidePanel />
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

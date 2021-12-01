import { AdaptiveInputField } from '../common/AdaptiveInputField/AdaptiveInputField';
import { AppLogoSVG } from '../common/icons/AppLogo';
import { ToolBar } from '../common/ToolBar/ToolBar';
import styles from './AppTop.module.css';

export function AppTop(): JSX.Element {
    return (
        <div
            className={styles['top-bar']}
        >
            <div className={styles["logo-container"]}>
                <AppLogoSVG width={55} height={55} type={'default'} />
            </div>
            <AdaptiveInputField />
            <ToolBar />
        </div>
    );
}
import { AdaptiveInputField } from '../common/AdaptiveInputField/AdaptiveInputField';
import { AppLogoSVG } from '../common/icons/AppLogo/AppLogo';
import { ToolBar } from '../common/ToolBar/ToolBar';
import styles from './AppTop.module.css';

export function AppTop(): JSX.Element {
    return (
        <div
          className={styles['top-bar']}
        >
            <AppLogoSVG width={40} height={40} type={'default'} />
            <AdaptiveInputField />
            <ToolBar />
        </div>
    );
}
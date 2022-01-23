import styles from './OpacityToolsList.module.css';

import { useContext } from 'react';
import { LocaleContext, LocaleContextType } from '../../../App';

import { Button, ButtonProps } from '../../common/Button/Button';
import { LayerBackward } from '../../common/icons/LayerBackward/LayerBackward';
import { LayerBackground } from '../../common/icons/LayerBackground/LayerBackground';
import { LayerForward } from '../../common/icons/LayerForward/LayerForward';
import { LayerForeground } from '../../common/icons/LayerForeground/LayerForeground';
import ToolTip from '../../common/ToolTip/ToolTip';
import { useDispatch } from 'react-redux';
import { dispatchKeepModelAction } from '../../../app_model/redux_model/dispatchers';

type OpacityToolsListProps = {
    setListSwitcher: () => void;
};

export function OpacityToolsList(): JSX.Element {
    const localeContext: LocaleContextType = useContext(LocaleContext);

    const dispatch = useDispatch();
    const moveForegroundHandler = () => {
        // dispatchMoveElementsToBackgroundOrForeground(dispatch)(false);
        dispatchKeepModelAction(dispatch)();
    };

    const moveBackgroundHandler = () => {
        // dispatchMoveElementsToBackgroundOrForeground(dispatch)(true);
        dispatchKeepModelAction(dispatch)();
    };

    return (
        <>
            <div className={styles['opacity-wrapper']}>
                <div color="white" className={styles['opacity-text']}>
                    Opacity
                </div>
                <div className={styles['opacity-picker']}>
                    <div className={styles['range-picker']}>
                        <div className={styles['range-toddler-wrapper']}>
                            <div className={styles['range-toddler-content']}></div>
                            <input
                                type="range"
                                className={styles['range-toddler']}
                                min="0.1"
                                max="1"
                                step="0.05"
                                value="0.5"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

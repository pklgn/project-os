import styles from './ReorderListTool.module.css';

import { useContext } from 'react';
import { LocaleContext, LocaleContextType } from '../../../App';

import { Button } from '../../common/Button/Button';
import { VerticalLine } from '../../common/VerticalLine/VerticalLine';
import { LayerBackward } from '../../common/icons/LayerBackward/LayerBackward';
import { LayerBackground } from '../../common/icons/LayerBackground/LayerBackground';
import { LayerForward } from '../../common/icons/LayerForward/LayerForward';
import { LayerForeground } from '../../common/icons/LayerForeground/LayerForeground';

export function ReorderListTool(): JSX.Element {
    const localeContext: LocaleContextType = useContext(LocaleContext);

    return (
        <div className={styles['reorder-tools']}>
            {/* <Button
                text={localeContext.locale.localization.backward_word}
                state="disabled"
                shouldStopPropagation={false}
                contentType="icon"
                content={{ hotkeyInfo: '', icon: <LayerBackward /> }}
                foo={elementListButton}
            />
            <VerticalLine />
            <Button
                text={localeContext.locale.localization.back_word}
                state="disabled"
                shouldStopPropagation={false}
                contentType="icon"
                content={{ hotkeyInfo: '', icon: <LayerBackground /> }}
                foo={elementListButton}
            />
            <VerticalLine />
            <Button
                text={localeContext.locale.localization.forward_word}
                state="disabled"
                shouldStopPropagation={false}
                contentType="icon"
                content={{ hotkeyInfo: '', icon: <LayerForward /> }}
                foo={elementListButton}
            />
            <VerticalLine />
            <Button
                text={localeContext.locale.localization.front_word}
                state="disabled"
                shouldStopPropagation={false}
                contentType="icon"
                content={{ hotkeyInfo: '', icon: <LayerForeground /> }}
                foo={elementListButton}
            /> */}
        </div>
    );
}

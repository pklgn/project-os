import styles from './DefaultToolsList.module.css';

import { useContext } from 'react';
import { LocaleContext, LocaleContextType } from '../../../App';

import { Button, ButtonProps } from '../../common/Button/Button';
import { Reorder } from '../../common/icons/Reorder/Reorder';
import { Opacity } from '../../common/icons/Opacity/Opacity';
import { DeleteElement } from '../../common/icons/DeleteElement/DeleteElement';
import ToolTip from '../../common/ToolTip/ToolTip';
import { generateUUId } from '../../../app_model/model/utils/uuid';

export function DefaultToolsList(): JSX.Element {
    const localeContext: LocaleContextType = useContext(LocaleContext);

    const defaultToolsButtonInfo: ButtonProps[] = [
        {
            text: localeContext.locale.localization.elementsListTool.cursorTool,
            id: 'select-tool-button',
            iconLeft: <Reorder />,
        },
        {
            text: localeContext.locale.localization.elementsListTool.textTool,
            id: 'text-tool-button',
            iconLeft: <Opacity />,
        },
        {
            text: localeContext.locale.localization.elementsListTool.geometryTool,
            id: 'geometry-tool-button',
            iconLeft: <DeleteElement />,
        },
    ];

    return (
        <div className={styles['default-tools']}>
            <div className={styles['tools-buttons-container']} id="tools-buttons-container">
                {defaultToolsButtonInfo.map((buttonInfo) => {
                    return (
                        <ToolTip
                            key={generateUUId()}
                            title={buttonInfo.text ? buttonInfo.text : 'None'}
                            position="above"
                            child={
                                <Button
                                    key={generateUUId()}
                                    type={buttonInfo.type}
                                    state={buttonInfo.state}
                                    id={buttonInfo.id}
                                    iconLeft={buttonInfo.iconLeft}
                                    onClick={buttonInfo.onClick}
                                />
                            }
                        />
                    );
                })}
            </div>
        </div>
    );
}

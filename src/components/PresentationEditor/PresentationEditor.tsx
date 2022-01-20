import styles from './PresentationEditor.module.css';

import { AppTop } from '../AppTop/AppTop';
import { SlideListTool } from '../AppFooter/SlideListTool/SlideListTool';
import { SidePanel } from '../AppContent/SidePanel/SidePanel';
import { SlideWrapper } from '../AppContent/Slide/SlideWrapper';
import { ElementListTool } from '../AppFooter/ElementListTool/ElementListTool';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setChosenElementsType } from '../../app_model/redux_model/actions_view_model/action_creators/chosen_elements_action_creator';
import { useEffect } from 'react';
import { store } from '../../app_model/redux_model/store';
import { getSlideElementType } from '../../app_model/model/utils/tools';

export function PresentationEditor(): JSX.Element {
    const dispatch = useDispatch();
    const dispatchChosenElementsTypeAction = bindActionCreators(setChosenElementsType, dispatch);
    const selectedSlideElementsIds = store.getState().model.selectedSlideElementsIds;
    useEffect(() => {
        const activeSLide = store.getState().model.presentation.slidesList.slice(-1)[0];

        if (activeSLide === undefined) {
            dispatchChosenElementsTypeAction('NONE');
        } else {
            if (activeSLide.elementsList.length) {
                const selectedElementsList = activeSLide.elementsList.filter((item) =>
                    selectedSlideElementsIds.includes(item.id),
                );

                if (selectedElementsList.length) {
                    const chosenType = getSlideElementType(selectedElementsList[0].content);

                    selectedElementsList.every((item) => getSlideElementType(item.content) === chosenType)
                        ? dispatchChosenElementsTypeAction(chosenType)
                        : dispatchChosenElementsTypeAction('MIXED');
                }
                if (!selectedElementsList.length) dispatchChosenElementsTypeAction('NONE');
            }
            if (!activeSLide.elementsList.length) dispatchChosenElementsTypeAction('NONE');
        }
    }, [selectedSlideElementsIds]);

    return (
        <div className={styles.editor}>
            <AppTop />
            <SidePanel />
            <SlideListTool />
            <SlideWrapper />
            <ElementListTool />
        </div>
    );
}

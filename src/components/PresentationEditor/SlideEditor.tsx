import { SlideWrapper } from '../AppContent/Slide/SlideWrapper';
import { ElementListTool } from '../AppFooter/ElementListTool/ElementListTool';
import { ReorderListTool } from '../AppFooter/ReorderList Tool/ReorderListTool';
import { TextToolsList } from '../AppFooter/TextToolsList/TextToolsList';
import { FigureToolsList } from '../AppFooter/FigureToolsList/FigureToolsList';
import { listName } from './PresentationEditor';
import { SetStateAction, useRef, useState } from 'react';

function SlideEditor() {
    const slideRef = useRef(null);
    const [textEditing, setTextEditing] = useState(false);
    const [menuSwitcher, setMenuSwitcher] = useState(listName.ELEMENT_LIST);

    return (
        <>
            <SlideWrapper textEditing={textEditing} setTextEditing={setTextEditing} slideRef={slideRef} />
            {(() => {
                switch (menuSwitcher) {
                    case listName.ELEMENT_LIST:
                        return (
                            <ElementListTool
                                foo={setMenuSwitcher}
                                active={false}
                                setActive={function (value: SetStateAction<boolean>): void {
                                    throw new Error('Function not implemented.');
                                }}
                            />
                        );
                    case listName.REORDER_LIST:
                        return (
                            <ReorderListTool
                                foo={setMenuSwitcher}
                                active={false}
                                setActive={function (value: SetStateAction<boolean>): void {
                                    throw new Error('Function not implemented.');
                                }}
                            />
                        );
                    case listName.TEXT_TOOLS_LIST_BUTTON:
                        return (
                            <TextToolsList
                                foo={setMenuSwitcher}
                                textEditing={textEditing}
                                setTextEditing={setTextEditing}
                                active={false}
                                setActive={function (value: SetStateAction<boolean>): void {
                                    throw new Error('Function not implemented.');
                                }}
                            />
                        );
                    case listName.FIGURE_TOOLS_LIST_BUTTON:
                        return (
                            <FigureToolsList
                                foo={setMenuSwitcher}
                                active={false}
                                setActive={function (value: SetStateAction<boolean>): void {
                                    throw new Error('Function not implemented.');
                                }}
                            />
                        );
                }
            })()}
        </>
    );
}

export { SlideEditor };

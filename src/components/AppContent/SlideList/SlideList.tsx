import styles from "./SlideList.module.css";

import { BaseSyntheticEvent, useEffect, useRef, useState } from "react";

import { SlideListItem } from "./SlideListItem";

import { Slide } from "../../../model/types";

import { bindActionCreators } from "redux";
import { useDispatch } from "react-redux";
import { setSelectedIdInEditor } from "../../../redux/action-creators/editorActionCreators";
import { store, StoreType } from "../../../redux/store";

type SlideListProps = {
    slidesList: Slide[],
}

export function SlideList(props: SlideListProps) {
    const ref = useRef<HTMLUListElement>(null);

    const dispatch = useDispatch();
    const dispatchAddSlideAction = bindActionCreators(setSelectedIdInEditor, dispatch);

    const [itemStatusList, changeStatusList] = useState([false]);
    useEffect(() => {
        changeStatusList(
            props.slidesList.map((_) => {
                return false
            })
        );
    }, [props.slidesList]);

    const [lastActiveItemIndex, changeLastActiveItemIndex] = useState(getActiveSlideIndex(store));

    function getVariantOfItemListClickHandlers(key: 'default' | 'ctrlPressed' | 'shiftPressed'): (event: BaseSyntheticEvent) => void {
        switch (key) {
            case 'default':
                return (event: BaseSyntheticEvent) => {
                    const itemIndex: number = event.target.getAttribute("id");
                    const newItemStatusList: boolean[] = itemStatusList.map((_, index) => {
                        if (index == itemIndex) {
                            return true;
                        } else {
                            return false;
                        }
                    });

                    changeLastActiveItemIndex(itemIndex);

                    changeStatusList(newItemStatusList);
                    dispatchAddSlideAction({
                        selectedSlidesIds: getSelectedItemsId(newItemStatusList, props),
                        selectedSlideElementsIds: []
                    });
                }
            case 'ctrlPressed':
                return (event: BaseSyntheticEvent) => {
                    const itemIndex: number = event.target.getAttribute("id");
                    const newItemStatusList: boolean[] = itemStatusList.map((itemStatus, index) => {
                        if (index == itemIndex) {
                            return !itemStatus;
                        } else {
                            return itemStatus;
                        }
                    });

                    changeLastActiveItemIndex(itemIndex);

                    changeStatusList(newItemStatusList);
                    dispatchAddSlideAction({
                        selectedSlidesIds: getSelectedItemsId(newItemStatusList, props),
                        selectedSlideElementsIds: []
                    });
                }

            case 'shiftPressed':
                return (event: BaseSyntheticEvent) => {
                    const itemIndex: number = event.target.getAttribute("id");
                    const newItemStatusList: boolean[] = itemStatusList.map((_, index) => {
                            if (index >= lastActiveItemIndex && index <= itemIndex ||
                                index >= itemIndex && index <= lastActiveItemIndex) {
                                return true;
                            } else {
                                return false;
                            }
                        });

                    changeStatusList(newItemStatusList);
                    dispatchAddSlideAction({
                        selectedSlidesIds: getSelectedItemsId(newItemStatusList, props),
                        selectedSlideElementsIds: []
                    });
                }

            default:
                return (event: BaseSyntheticEvent) => {
                    const itemIndex: number = event.target.getAttribute("id");
                    const newItemStatusList: boolean[] = itemStatusList.map((itemStatus, index) => {
                        if (index == itemIndex) {
                            return !itemStatus;
                        } else {
                            return false;
                        }
                    });

                    changeStatusList(newItemStatusList);
                }
        }
    }

    const [handlerKey, changeClickHandlerKey] = useState('default' as 'default' | 'ctrlPressed' | 'shiftPressed');
    const onClickListHandler = getVariantOfItemListClickHandlers(handlerKey);

    useEffect(() => {

        const handlerMouseClick = (event: MouseEvent) => {
            const node = event.target as Node;
            changeClickHandlerKey('default');
            if (ref.current?.contains(node)) {
                if (event.ctrlKey) {
                    changeClickHandlerKey('ctrlPressed');
                } else if (event.shiftKey) {
                    changeClickHandlerKey('shiftPressed');
                }
            } else {
                changeStatusList(itemStatusList.map(_ => false));
                dispatchAddSlideAction({
                    selectedSlidesIds: [getIdOfSlideIndex(store, lastActiveItemIndex)],
                    selectedSlideElementsIds: []
                });
            }
        }

        document.addEventListener('mousedown', handlerMouseClick);

        return () => {
            document.removeEventListener('mousedown', handlerMouseClick);
        }
    });

    return <ul
        className={`${styles.list} ${styles['list-wrapper']}`}
        ref={ref}
        onClick={onClickListHandler}
    >
        {
            props.slidesList.map((slide, index) => {
                return <SlideListItem item={slide} itemIndex={index} status={itemStatusList[index]} key={slide.id} />
            })
        }
    </ul>;
}

function getSelectedItemsId(itemsState: boolean[], props: SlideListProps): string[] {
    const res: string[] = [];
    itemsState.forEach((state, index) => {
        if (state) {
            res.push(props.slidesList[index].id);
        }
    });
    return res;
}

function getActiveSlideIndex(store: StoreType): number {
    const slideId: string = store.getState().model.selectedSlidesIds.slice(-1)[0];
    return store.getState().model.presentation.slidesList.findIndex(slide => slide.id === slideId);
}

function getIdOfSlideIndex(store: StoreType, index: number): string {
    return store.getState().model.presentation.slidesList[index].id;
}
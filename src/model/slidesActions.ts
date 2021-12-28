import { generateUUId } from "./utils/uuid";
import { Editor, Slide, Background, Presentation } from "./types";

export function addSlide(editor: Editor): Editor {
    const slideList: Slide[] = [...editor.presentation.slidesList];
    
    /*TODO Feature with adding slide after active slide isn't working for wome reasone
    console.log(slideList);
    const activeSlideId: string = editor.selectedSlidesIds.slice(-1)[0];
    console.log(activeSlideId);

    const insertIndex = slideList.findIndex((item) => item.id === activeSlideId) + 1;

    console.log(insertIndex);
    console.log(slideList.findIndex(item => item.id === activeSlideId));
    */

    const background: Background = {
        color: '#ffffff',
        src: ''
    }

    const newSlide: Slide = {
        id: generateUUId(),
        background,
        elementsList: []
    }

    const newSlideList: Slide[] = [
        newSlide,
        ...slideList
    ];
    
    const updatedPresentation: Presentation = {
        ...editor.presentation,
        slidesList: newSlideList
    }
    
    return {
        ...editor,
        presentation: updatedPresentation,
        selectedSlidesIds: [newSlide.id],
        selectedSlideElementsIds: []
    }
}

export function deleteSelectedSlides(editor: Editor): Editor {
    const slideList: Slide[] = editor.presentation.slidesList;
    if (!slideList.length) {
        return editor;
    }

    const selectedSlidesIds: string[] = editor.selectedSlidesIds;

    const lastSelectedSlideId: string = selectedSlidesIds[selectedSlidesIds.length - 1];
    const nextSelectedSlideId: string = getNextUnselectedSlideId(slideList, selectedSlidesIds, lastSelectedSlideId);

    function getNextUnselectedSlideId(slideList: Slide[],
                                      selectedSlidesIds: string[],
                                      lastSelectedSlideId: string
    ): string {
        let result = "";
        if (slideList.length === 1) {
            return "";
        }

        const lastSelectedSlideIndex: number = slideList.findIndex((slide) => slide.id === lastSelectedSlideId);

        let slideId = '';
        for (let index = lastSelectedSlideIndex; index < slideList.length; index++) {
            slideId = slideList[index].id;
            if (!selectedSlidesIds.includes(slideId)) {
                result = slideId;
                break;
            }
        }

        for (let index = lastSelectedSlideIndex; index >= 0; index--) {
            slideId = slideList[index].id;
            if (!selectedSlidesIds.includes(slideId)) {
                result = slideId;
                break;
            }
        }

        return result;
    }


    const newSlideList: Slide[] = slideList.filter((slide) => !selectedSlidesIds.includes(slide.id));

    const updatedPresentation: Presentation = {
        ...editor.presentation,
        slidesList: newSlideList,
    };

    return {
        ...editor,
        presentation: updatedPresentation,
        selectedSlidesIds: [nextSelectedSlideId],
        selectedSlideElementsIds: [],
    };
}

export function changeSelectedSlidesBackground(editor: Editor, src = '', color = '#ffffff'): Editor {
    const selectedSlidesIds: string[] = editor.selectedSlidesIds;
    if (!selectedSlidesIds) {
        return editor;
    }

    const slidesList: Slide[] = editor.presentation.slidesList.map(slide => {
        if (selectedSlidesIds.includes(slide.id)) {
            return {
                ...slide,
                background: {
                    src,
                    color,
                }
            }
        } else {
            return slide
        }
    });


    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slidesList,
        }
    };
}

export function applySlideChanges(editor: Editor, updatedSlide: Slide, updatedSlideIndex: number): Editor {
    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slidesList:
                [...editor.presentation.slidesList.slice(0, updatedSlideIndex),
                    updatedSlide,
                ...editor.presentation.slidesList.slice(updatedSlideIndex + 1)
                ],
        },
    };
}

export function getCurrentSlide(editor: Editor): Slide|undefined {
    const selectedSlidesIds = editor.selectedSlidesIds;
    const slideList: Slide[] = editor.presentation.slidesList;
    const selectedSlideId: string|undefined = selectedSlidesIds[selectedSlidesIds.length - 1];

    if(!selectedSlideId) {
        return undefined;
    }

    const slideIndex: number = slideList.findIndex((slide) => {
        return slide.id === selectedSlideId;
    });

    return slideList[slideIndex];
}

export function insertSelectedSlides(editor: Editor, insertIndex: number): Editor {
    const slidesList: Slide[] = editor.presentation.slidesList;
    const selectedSlides: Slide[] = slidesList.filter((slide) => {
        return editor.selectedSlidesIds.includes(slide.id);
    });
    const selectedSlidesIds: string[] = editor.selectedSlidesIds;

    if (!(slidesList.length && selectedSlides.length)) {
        return editor;
    }

    const slidesBeforeInsertPosition: Slide[] = slidesList.slice(0, insertIndex);
    const slidesAfterInsertPosition: Slide[] = slidesList.slice(insertIndex);

    const updatedSlideList: Slide[] = [
        ...slidesBeforeInsertPosition.filter((slide) => {
            return !selectedSlidesIds.includes(slide.id)
        }),
        ...selectedSlides,
        ...slidesAfterInsertPosition.filter((slide) => {
            return !selectedSlidesIds.includes(slide.id)
        })
    ];

    const updatedPresentation: Presentation = {
        ...editor.presentation,
        slidesList: updatedSlideList,
    };

    return {
        ...editor,
        presentation: updatedPresentation,
        selectedSlideElementsIds: []
    };
}
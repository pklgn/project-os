import { generateUUId } from "./utils/uuid";
import { Editor, Slide, Background, Presentation } from "./types";

export function addSlide(editor: Editor): Editor {
    const slideList: Slide[] = editor.presentation.slidesList;

    const activeSlideId: string = editor.selectedSlidesIds.slice(-1)[0];

    let insertIndex = 0;
    for (let index = 0; index < slideList.length; index++) {
        if (slideList[index].id === activeSlideId) {
            insertIndex = index + 1;
            break;
        }
    }

    console.log(insertIndex);

    const background: Background = {
        color: '#ffffff',
        src: ''
    };

    const newSlide: Slide = {
        id: generateUUId(),
        background,
        elementsList: []
    };

    const slidesList: Slide[] = (insertIndex === slideList.length - 1)
    ? [...editor.presentation.slidesList, newSlide]
    : [
        ...editor.presentation.slidesList.slice(0, insertIndex),
        newSlide,
        ...editor.presentation.slidesList.slice(insertIndex)
    ];

    const updatedPresentation: Presentation = {
        ...editor.presentation,
        slidesList: slidesList
    };

    return {
        ...editor,
        presentation: updatedPresentation,
        selectedSlidesIds: [newSlide.id],
        selectedSlideElementsIds: []
    };
}

export function deleteSelectedSlides(editor: Editor): Editor {
    const slideList: Slide[] = editor.presentation.slidesList
    if (!slideList.length) {
        return editor;
    }

    const selectedSlidesIds: string[] = editor.selectedSlidesIds;

    const lastSelectedSlideId: string = selectedSlidesIds[selectedSlidesIds.length - 1];
    const nextSelectedSlideId: string = getNextUnselectedSlideId(slideList, selectedSlidesIds, lastSelectedSlideId);

    const newSelectedSlidesId: string[] = [];

    if (nextSelectedSlideId !== "") {
        newSelectedSlidesId.push(nextSelectedSlideId);
    }


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
        selectedSlidesIds: newSelectedSlidesId,
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
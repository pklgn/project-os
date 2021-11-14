import { generateUUId } from "../utils/uuid";
import { Editor, Slide, Background, Presentation } from "./types";

export function addSlide(editor: Editor): Editor {
    const slideList: Slide[] = editor.presentation.slidesList;

    const activeSlideId: string = editor.selectedSlidesIds.slice(-1)[0];

    let insertIndex: number = 0;
    slideList.forEach((slide) => {
        insertIndex++;
        if (slide.id === activeSlideId) {
            return;
        }
    });

    const background: Background = {
        color: '#ffffff',
        src: ''
    }

    const newSlide: Slide = {
        id: generateUUId(),
        background,
        elementsList: []
    }

    const slidesList: Slide[] = [
        ...editor.presentation.slidesList.slice(0, insertIndex),
        newSlide,
        ...editor.presentation.slidesList.slice(insertIndex)
    ];

    const updatedPresentation: Presentation = {
        ...editor.presentation,
        slidesList: slidesList
    }

    return {
        ...editor,
        presentation: updatedPresentation,
        selectedSlidesIds: [newSlide.id],
        selectedSlideElementsIds: []
    }
}

export function deleteSelectedSlides(editor: Editor): Editor {
    const slideList: Slide[] = editor.presentation.slidesList
    if (!(Array.isArray(slideList) && slideList.length)) {
        return editor;
    }

    const selectedSlidesIds: string[] = editor.selectedSlidesIds;

    const lastSelectedSlideId: string = selectedSlidesIds[selectedSlidesIds.length - 1];
    const nextSelectedSlideId: string = getNextUnselectedSlideId(slideList, selectedSlidesIds, lastSelectedSlideId);

    const newSelectedSlidesId: string[] = [];

    if (nextSelectedSlideId !== "") {
        newSelectedSlidesId.push(nextSelectedSlideId);
    }


    function getNextUnselectedSlideId(slideList: Slide[], selectedSlidesIds: string[], lastSelectedSlideId: string): string {
        //TODO оптимизировать? i want to sleep
        let result: string = "";
        if (slideList.length === 1) {
            return "";
        }

        const lastSelectedSlideIndex: number = slideList.findIndex((slide) => slide.id === lastSelectedSlideId);

        let slideId: string = '';
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
    }

    return {
        ...editor,
        presentation: updatedPresentation,
        selectedSlidesIds: newSelectedSlidesId,
        selectedSlideElementsIds: [],
    }
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
    }
}

export function applySlideChanges(editor: Editor, newSlide: Slide, newSlideIndex: number): Editor {
    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slidesList:
                [...editor.presentation.slidesList.slice(0, newSlideIndex),
                    newSlide,
                ...editor.presentation.slidesList.slice(newSlideIndex + 1)
                ],
        },
    }
}

export function getCurrSlide(editor: Editor): Slide {
    const selectedSlidesIds = editor.selectedSlidesIds;
    const slideList: Slide[] = editor.presentation.slidesList;

    const selectedSlideId: string = selectedSlidesIds[selectedSlidesIds.length - 1];
    const slideIndex: number = slideList.findIndex((slide) => {
        return slide.id === selectedSlideId
    });

    return slideList[slideIndex];
}

/*export function insertSelectedSlides(editor: Editor, insertIndex: number): Editor {
    //TODO Лёня
    const slidesList: Slide[] = editor.presentation.slidesList

    if (!(Array.isArray(slidesList) && slidesList.length)) {
        return editor
    }

    const selectedSlides: Slide[] = slidesList.map((slide, index) => {
        if (selectedSlidesIds.includes(index)) {
            return slide
        }
    })

    if (!(Array.isArray(selectedSlides) && selectedSlides.length)) {
        return editor
    }

    const slidesBeforeInsertPosition: Slide[] = slidesList.slice(0, insertIndex)
    const slidesAfterInsertPosition: Slide[] = slidesList.slice(insertIndex)

    const newSlideList: Slide[] = [
        ...slidesBeforeInsertPosition.filter((slide, index) => {
            return selectedSlidesIds.includes(index)
        }),
        ...selectedSlides,
        ...slidesAfterInsertPosition.filter((slide, index) => {
            return !selectedSlidesIds.includes(index + insertIndex)
        })
    ]

    const updatedPresentation: Presentation = {
        ...editor.presentation,
        slidesList: newSlideList,
    }

    const newselectedSlidesIds: string[] = selectedSlidesIds.map((element, elementIndex) => {
        return insertIndex + elementIndex
    })

    return {
        ...editor,
        presentation: updatedPresentation,
        selectedSlidesIds: newselectedSlidesIds,
        selectedSlideElementsIds: []
    }
}*/
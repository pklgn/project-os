import { generateUUId } from "../utils/uuid";
import { Editor, Background, Slide, Presentation } from "./types";

export function addSlide(editor: Editor): Editor {
    const slideList: Slide[] = editor.presentation.slidesList;

    const activeSlideId: string = editor.selectedSlidesIds.slice(-1)[0];

    var insertIndex: number = 0;
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
    const nextSelectedSlideId: string = getNextUnselectedSlideId(slideList, selectedSlidesIds, lastSelectedSlideId)


    function getNextUnselectedSlideId(slideList: Slide[], selectedSlidesIds: string[], lastSelectedSlideId: string): string {
        //TODO оптимизировать? i want to sleep
        var result: string = "";
        if (slideList.length === 1) {
            return "-1";
        }

        const lastSelectedSlideIndex: number = slideList.findIndex((slide) => slide.id === lastSelectedSlideId);

        var slideId: string = '';
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
        selectedSlidesIds: [nextSelectedSlideId],
        selectedSlideElementsIds: [],
    }
}
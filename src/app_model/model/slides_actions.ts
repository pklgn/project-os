import { generateUUId } from './utils/uuid';
import { Editor, Slide, Background, Presentation } from './types';

export function addSlide(editor: Editor): Editor {
    const slideList: Slide[] = [...editor.presentation.slidesList];

    const activeSlideId: string = editor.selectedSlidesIds.slice(-1)[0];

    const insertIndex = slideList.findIndex((item) => item.id === activeSlideId) + 1;

    const background: Background = {
        color: '#ffffff',
        src: '',
    };

    const newSlide: Slide = {
        id: generateUUId(),
        background,
        elementsList: [],
    };

    const newSlideList: Slide[] = [...slideList.slice(0, insertIndex), newSlide, ...slideList.slice(insertIndex)];

    const updatedPresentation: Presentation = {
        ...editor.presentation,
        slidesList: newSlideList,
    };

    return {
        ...editor,
        presentation: updatedPresentation,
        selectedSlidesIds: [newSlide.id],
        selectedSlideElementsIds: [],
    };
}

export function deleteSelectedSlides(editor: Editor): Editor {
    const slideList: Slide[] = editor.presentation.slidesList;
    if (!slideList.length) {
        return editor;
    }

    const selectedSlidesIds: string[] = editor.selectedSlidesIds;

    const lastSelectedSlideId: string = selectedSlidesIds[selectedSlidesIds.length - 1];
    const nextSelectedSlideId: string[] = getNextUnselectedSlideId(slideList, selectedSlidesIds, lastSelectedSlideId);

    function getNextUnselectedSlideId(
        slideList: Slide[],
        selectedSlidesIds: string[],
        lastSelectedSlideId: string,
    ): string[] {
        let result = '';
        if (slideList.length === 1) {
            return [];
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

        return [result];
    }

    const newSlideList: Slide[] = slideList.filter((slide) => !selectedSlidesIds.includes(slide.id));

    const updatedPresentation: Presentation = {
        ...editor.presentation,
        slidesList: newSlideList,
    };

    return {
        ...editor,
        presentation: updatedPresentation,
        selectedSlidesIds: nextSelectedSlideId,
        selectedSlideElementsIds: [],
    };
}

export function changeSelectedSlidesBackground(editor: Editor, src = '', color = '#ffffff'): Editor {
    const selectedSlidesIds: string[] = editor.selectedSlidesIds;
    if (!selectedSlidesIds) {
        return editor;
    }

    const slidesList: Slide[] = editor.presentation.slidesList.map((slide) => {
        if (selectedSlidesIds.includes(slide.id)) {
            return {
                ...slide,
                background: {
                    src,
                    color,
                },
            };
        } else {
            return slide;
        }
    });

    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slidesList,
        },
    };
}

export function applySlideChanges(editor: Editor, updatedSlide: Slide, updatedSlideIndex: number): Editor {
    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slidesList: [
                ...editor.presentation.slidesList.slice(0, updatedSlideIndex),
                updatedSlide,
                ...editor.presentation.slidesList.slice(updatedSlideIndex + 1),
            ],
        },
    };
}

export function getActiveSlidesIds(editor: Editor): string[] {
    return editor.selectedSlidesIds;
}

export function getActiveSlideIndex(editor: Editor): number {
    const slideId: string = editor.selectedSlidesIds.slice(-1)[0];

    return editor.presentation.slidesList.findIndex((slide) => slide.id === slideId);
}

export function getAllSlidesIds(editor: Editor): string[] {
    return editor.presentation.slidesList.map((slide) => {
        return slide.id;
    });
}

export function getCurrentSlide(editor: Editor): Slide | undefined {
    const selectedSlidesIds = editor.selectedSlidesIds;
    const slideList: Slide[] = editor.presentation.slidesList;
    const selectedSlideId: string | undefined = selectedSlidesIds[selectedSlidesIds.length - 1];

    if (!selectedSlideId) {
        return undefined;
    }

    const slideIndex: number = slideList.findIndex((slide) => {
        return slide.id === selectedSlideId;
    });

    return slideList[slideIndex];
}

export function getChosenSlidesIndexes(editor: Editor): number[] {
    const slidesIds: string[] = editor.selectedSlidesIds;

    return editor.presentation.slidesList
        .map((slide, index) => {
            if (slidesIds.includes(slide.id)) {
                return index;
            }
            return -1;
        })
        .filter((index) => index !== -1);
}

export function getFirstSlide(editor: Editor): Slide | undefined {
    if (editor.presentation.slidesList.length === 0) {
        return undefined;
    } else {
        return editor.presentation.slidesList[0];
    }
}

export function getNextSlideTo(editor: Editor, slide: Slide): Slide | undefined {
    return getNextToSlide(editor, slide, 'next');
}

export function getPrevSlideTo(editor: Editor, slide: Slide): Slide | undefined {
    return getNextToSlide(editor, slide, 'prev');
}

export function getSlideAmount(editor: Editor): number {
    return editor.presentation.slidesList.length;
}

export function getSlideIndex(editor: Editor, searchSlide: Slide): number {
    return editor.presentation.slidesList.findIndex((slide) => {
        return slide.id === searchSlide.id;
    });
}

export function getNextToSlide(editor: Editor, startSlide: Slide, key: 'next' | 'prev'): Slide | undefined {
    if (editor.presentation.slidesList.length === 0) {
        return undefined;
    }

    const startSlideIndex = getSlideIndex(editor, startSlide);
    const nextSlideIndex =
        key === 'next'
            ? startSlideIndex !== editor.presentation.slidesList.length - 1
                ? startSlideIndex + 1
                : startSlideIndex
            : startSlideIndex > 0
            ? startSlideIndex - 1
            : startSlideIndex;
    const res = editor.presentation.slidesList.at(nextSlideIndex) as Slide;
    return res;
}

export function insertSelectedSlides(editor: Editor, insertIndex: number): Editor {
    const slidesList = editor.presentation.slidesList;
    const selectedSlides = slidesList.filter((slide) => {
        return editor.selectedSlidesIds.includes(slide.id);
    });
    const selectedSlidesIds = editor.selectedSlidesIds;

    if (!(slidesList.length && selectedSlides.length)) {
        return editor;
    }

    const slidesBeforeInsertPosition = slidesList.slice(0, insertIndex);
    const slidesAfterInsertPosition = slidesList.slice(insertIndex);

    const updatedSlideList = [
        ...slidesBeforeInsertPosition.filter((slide) => {
            return !selectedSlidesIds.includes(slide.id);
        }),
        ...selectedSlides,
        ...slidesAfterInsertPosition.filter((slide) => {
            return !selectedSlidesIds.includes(slide.id);
        }),
    ];

    const updatedPresentation = {
        ...editor.presentation,
        slidesList: updatedSlideList,
    };

    return {
        ...editor,
        presentation: updatedPresentation,
        selectedSlideElementsIds: [],
    };
}

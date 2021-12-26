import { generateUUId } from "./utils/uuid";
import { Editor, Slide, Background, Presentation } from "./types";

export function addSlide(editor: Editor): Editor {
<<<<<<< HEAD
    console.log(`editor before add`);
    console.log(editor);
    const slideList: Slide[] = [...editor.presentation.slidesList];

    const activeSlideId: string = [...editor.selectedSlidesIds.slice(-1)][0];
    console.log(`active id before add: ${activeSlideId}`);

    const insertIndex = slideList.findIndex(item => item.id === activeSlideId);
    
    console.log(`insert index: ${insertIndex} ids in editor: ${editor.selectedSlidesIds}`);
=======
    if( editor.presentation.slidesList[0]){
        console.log("editor: ")
        console.log(editor.presentation.slidesList[0].id)
        console.log(editor.presentation.slidesList)
    }
    let oldId: string = "0"
    const slideList: Slide[] = editor.presentation.slidesList;
    if (slideList[0]) {
        oldId = slideList[0].id
    }
    
    const activeSlideId: string = editor.selectedSlidesIds.slice(-1)[0];

    const insertIndex = slideList.findIndex(item => item.id === activeSlideId) + 1
>>>>>>> dev-10-ivaykov

    const background: Background = {
        color: '#ffffff',
        src: ''
    };

    const newSlide: Slide = {
        id: generateUUId(),
        background,
        elementsList: []
    };
<<<<<<< HEAD
    console.log(`generated for newSlide: ${newSlide.id}`);

    const slidesBefore: Slide[] = [...editor.presentation.slidesList.slice(0, insertIndex + 1)];
    const slidesAfter: Slide[] = [...editor.presentation.slidesList.slice(insertIndex + 1)];

    const slidesList: Slide[] = [...slidesBefore, ...[newSlide], ...slidesAfter]
=======
    console.log("newSlide: ")
    console.log(newSlide.id)
    // slidesList ошибка
    const newSlideList: Slide[] = [
        ...slideList.slice(0, insertIndex),
        newSlide,
        ...slideList.slice(insertIndex)
    ];
    
    console.log("slidesList: ")
    console.log(newSlideList[0].id)
    console.log(newSlideList)

    if (slideList[0]) {
        newSlideList[0].id = oldId
        console.log("oldId:")
        console.log(oldId)
    }
>>>>>>> dev-10-ivaykov

    console.log("slidesList: ")
    console.log(newSlideList[0].id)
    console.log(newSlideList)
    
    const updatedPresentation: Presentation = {
        ...editor.presentation,
        slidesList: newSlideList
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
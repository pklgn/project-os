import { Editor, FigureElement, FigureShape, PictureElement, Size, SlideElement, TextElement } from './types'
import { Presentation } from './types'
import { PresentationMode } from './types'
import { History } from './types'
import { Slide } from './types'
import { Background } from './types'
import { generateUUId } from '../utils/uuid'

/*export function insertSelectedSlides(editor: Editor, insertIndex: number): Editor {
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

/*export function deleteSelectedSlides(editor: Editor): Editor {
    const slideList: Slide[] = editor.presentation.slidesList
    if (!(Array.isArray(slideList) && slideList.length)) {
        return editor
    }

    const selectedSlidesIds = editor.selectedSlidesIds
    const activeSlideId: string = selectedSlidesIds[selectedSlidesIds.length - 1]

    // const maxIndex: number = editor.presentation.slidesList.length
    // const selectedSlideIndex: number = getNextUnselectedSlideIndex(lastSelectedSlideId, selectedSlidesIds, maxIndex)

    // const newSlideList: Slide[] = slideList.map((slide, index) => {
    //     if (!selectedSlidesIds.includes(index)) {
    //         return slide
    //     }
    // })

    const newActiveSlideIndex = -1
    const newSlideList: Slide[] = slideList.map(item => {
        if (item.id === activeSlideId) { // TODO}
            if (!selectedSlidesIds.includes(item.id)) return item
        });

    const updatedPresentation: Presentation = {
        ...editor.presentation,
        slidesList: newSlideList,
    }

    return {
        ...editor,
        presentation: updatedPresentation,
        selectedSlidesIds: newSelectedSlideId,
        selectedSlideElementsIds: [],
    }
}*/

// function getNextUnselectedSlideIndex(lastSelectedSlideId: number, selectedSlideIndexes: number[], maxIndex: number, ascending: boolean = true): number {
//     if (lastSelectedSlideId === 0 && !ascending) {
//         return -1
//     }
//     if (lastSelectedSlideId < maxIndex && ascending) {
//         return selectedSlideIndexes.includes(lastSelectedSlideId + 1)
//             ? getNextUnselectedSlideIndex(lastSelectedSlideId + 1, selectedSlideIndexes, maxIndex)
//             : lastSelectedSlideId + 1
//     } else {
//         return selectedSlideIndexes.includes(lastSelectedSlideId - 1)
//             ? getNextUnselectedSlideIndex(lastSelectedSlideId + 1, selectedSlideIndexes, maxIndex, false)
//             : lastSelectedSlideId - 1
//     }
// }

export function addTextElement(editor: Editor): Editor {
    const selectedSlidesIds = editor.selectedSlidesIds;
    const slideList = editor.presentation.slidesList;

    const slideIndex = slideList.findIndex(element => {
        element.id === selectedSlidesIds[selectedSlidesIds.length - 1]
    });

    if (!(Array.isArray(slideList) && slideList.length)) {
        return editor;
    }

    const slide: Slide = slideList[slideIndex];

    const textElement: TextElement = {
        content: 'Введите текст',
        fontSize: 10,
        fontColor: '#ffffff',
        fontStyle: 'italic'
    }

    const element: SlideElement = {
        id: generateUUId(),
        size: {
            width: 30,
            height: 25,
        },
        opacity: 1,
        content: textElement,
        startPoint: {
            x: 1,
            y: 1,
        }
    }

    const newSlide: Slide = {
        ...slide,
        elementsList: [
            ...slide.elementsList,
            element,
        ]
    }

    const newSlideList: Slide[] = editor.presentation.slidesList.map((slide, index) => {
        if (index === slideIndex) {
            return newSlide;
        }
        return slide;
    })

    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slidesList: newSlideList,
        },
        selectedSlidesIds: selectedSlidesIds,
        selectedSlideElementsIds: [element.id],
    }
}

export function addPictureElement(editor: Editor): Editor {
    const slideList: Slide[] = editor.presentation.slidesList;
    const selectedSlidesIds = editor.selectedSlidesIds;

    const slideIndex = slideList.findIndex(element => {
        element.id === selectedSlidesIds[selectedSlidesIds.length - 1]
    });

    if (!(Array.isArray(slideList) && slideList.length)) {
        return editor;
    }

    const slide: Slide = slideList[slideIndex];

    const pictureElement: PictureElement = {
        src: ''
    }

    const element: SlideElement = {
        id: generateUUId(),
        size: {
            width: 1,
            height: 1,
        },
        opacity: 1,
        content: pictureElement,
        startPoint: {
            x: 1,
            y: 1,
        }
    }

    const newSlide: Slide = {
        ...slide,
        elementsList: [
            ...slide.elementsList,
            element,
        ]
    }

    const newSlideList: Slide[] = editor.presentation.slidesList.map((slide, index) => {
        if (index === slideIndex) {
            return newSlide;
        }
        return slide;
    })

    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slidesList: newSlideList,
        },
        selectedSlidesIds: selectedSlidesIds,
        selectedSlideElementsIds: [element.id],
    }
}

export function addFigureElement(editor: Editor, figureType: FigureShape): Editor {
    const slideList: Slide[] = editor.presentation.slidesList;
    const selectedSlidesIds = editor.selectedSlidesIds;

    const slideIndex = slideList.findIndex(element => {
        element.id === selectedSlidesIds[selectedSlidesIds.length - 1]
    });

    if (!(Array.isArray(slideList) && slideList.length)) {
        return editor;
    }

    const slide: Slide = slideList[slideIndex];

    const figureElement: FigureElement = {
        figureType,
        figureColor: '#ffffff',
        borderWidth: 1,
        borderColor: '#000000',
    }

    const element: SlideElement = {
        id: generateUUId(),
        size: {
            width: 1,
            height: 1,
        },
        opacity: 1,
        content: figureElement,
        startPoint: {
            x: 1,
            y: 1,
        }
    }

    const newSlide: Slide = {
        ...slide,
        elementsList: [
            ...slide.elementsList,
            element,
        ]
    }

    const newSlideList: Slide[] = editor.presentation.slidesList.map((slide, index) => {
        if (index === slideIndex) {
            return newSlide;
        }
        return slide;
    })

    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slidesList: newSlideList,
        },
        selectedSlidesIds: selectedSlidesIds,
        selectedSlideElementsIds: [element.id],
    }
}

export function initEditor(): Editor {
    return {
        mode: "edit",
        presentation: initPresentation(),
        history: initHistory(),
        selectedSlidesIds: [],
        selectedSlideElementsIds: [],
    }
}

function initPresentation(): Presentation {
    return {
        name: "Оладушек",
        slidesList: [],
    }
}

function initHistory(): History {
    return {
        presentationStates: [],
        currState: -1,
        selectedSlidesIdsStates: [[]],
        selectedSlideElementsIdsStates: [[]],
    }
}

export function changeSlideBackground(editor: Editor, background: Background): Editor {
    const selectedSlidesIds = editor.selectedSlidesIds;
    if (!selectedSlidesIds) {
        return editor;
    }

    const activeSlideId = selectedSlidesIds[selectedSlidesIds.length - 1];
    const slideIndex = editor.presentation.slidesList.findIndex(item => {
        item.id === activeSlideId
    })
    const slide: Slide = editor.presentation.slidesList[slideIndex];

    const newSlide: Slide = {
        ...slide,
        background,
    }

    return applySlideChanges(editor, newSlide, slideIndex);
}

export function changePresentationName(editor: Editor, name: string): Editor {
    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            name,
        }
    }
}

export function moveElementsToBackground(editor: Editor): Editor {
    const selectedSlidesIds = editor.selectedSlidesIds;
    if (!selectedSlidesIds) {
        return editor;
    }

    const activeSlideId = selectedSlidesIds[selectedSlidesIds.length - 1];
    const slideIndex = editor.presentation.slidesList.findIndex(item => {
        item.id === activeSlideId
    })
    const slidesList: Slide[] = editor.presentation.slidesList;
    if (!(Array.isArray(slidesList) && slidesList.length)) {
        return editor;
    }

    const slide: Slide = slidesList[slideIndex];
    const elementsList: SlideElement[] = slide.elementsList;
    if (!(Array.isArray(elementsList) && elementsList.length)) {
        return editor;
    }

    const newElementsList = [
        ...elementsList.map(element => {
            if (editor.selectedSlideElementsIds.includes(element.id)) {
                return element;
            }
        }),
        ...elementsList.map(element => {
            if (!editor.selectedSlideElementsIds.includes(element.id)) {
                return element;
            }
        })
    ] as SlideElement[];

    const newSlide: Slide = {
        ...slide,
        elementsList: newElementsList
    }

    return applySlideChanges(editor, newSlide, slideIndex);
}

export function moveElementsToForeground(editor: Editor): Editor {
    const selectedSlidesIds = editor.selectedSlidesIds;
    if (!selectedSlidesIds) {
        return editor;
    }

    const activeSlideId = selectedSlidesIds[selectedSlidesIds.length - 1];
    const slideIndex = editor.presentation.slidesList.findIndex(item => {
        item.id === activeSlideId
    })

    const slidesList: Slide[] = editor.presentation.slidesList;
    if (!(Array.isArray(slidesList) && slidesList.length)) {
        return editor;
    }

    const slide = slidesList[slideIndex];
    const elementsList: SlideElement[] = slide.elementsList;
    if (!(Array.isArray(elementsList) && elementsList.length)) {
        return editor;
    }

    const newElementsList = [
        ...elementsList.map((element, index) => {
            if (!editor.selectedSlideElementsIds.includes(element.id)) {
                return element;
            }
        }),
        ...elementsList.map((element, index) => {
            if (editor.selectedSlideElementsIds.includes(element.id)) {
                return element;
            }
        })
    ] as SlideElement[];

    const newSlide: Slide = {
        ...slide,
        elementsList: newElementsList
    }

    return applySlideChanges(editor, newSlide, slideIndex);
}

// Я, как пользователь, не понял, для чего она ??
// export function moveElementsToPosition(editor: Editor, elementsLayoutPosition: number) {
//     const slideIndex: number = editor.selectedSlidesIds.slice(-1)[0]
//     if (slideIndex === -1) {
//         return
//     }

//     const slidesList: Slide[] = editor.presentation.slidesList
//     if (!(Array.isArray(slidesList) && slidesList.length)) {
//         return
//     }

//     const slide = slidesList[slideIndex]
//     const elementsList: SlideElement[] = slide.elementsList
//     if (!(Array.isArray(elementsList) && elementsList.length)) {
//         return
//     }

//     const selectedSlideElementsIds: number[] = editor.selectedSlideElementsIds
//     if (!(Array.isArray(selectedSlideElementsIds) && selectedSlideElementsIds.length)) {
//         return
//     }

//     const elementsBeforeInsertPosition: SlideElement[] = elementsList.slice(0, elementsLayoutPosition)
//     const elementsAfterInsertPosition: SlideElement[] = elementsList.slice(elementsLayoutPosition)
//     const elementsNeedToBeMoved: SlideElement[] = elementsList.map((element, index) => {
//         if (selectedSlideElementsIds.includes(index)) {
//             return element
//         }
//     })

//     const newElementsList: SlideElement[] = [
//         ...elementsBeforeInsertPosition.filter((_, index) => !selectedSlideElementsIds.includes(index)),
//         ...elementsNeedToBeMoved,
//         ...elementsAfterInsertPosition.filter((_, index) => !selectedSlideElementsIds.includes(index + elementsLayoutPosition))
//     ]

//     const newSlide: Slide = {
//         ...slide,
//         elementsList: newElementsList
//     }

//     return applySlideChanges(editor, newSlide, slideIndex)
// }

export function changeElementsSize(editor: Editor, scale: Size): Editor {
    const selectedSlidesIds = editor.selectedSlidesIds;
    if (!selectedSlidesIds) {
        return editor;
    }

    const activeSlideId = selectedSlidesIds[selectedSlidesIds.length - 1];
    const slideIndex = editor.presentation.slidesList.findIndex(item => {
        item.id === activeSlideId
    })
    const slidesList: Slide[] = editor.presentation.slidesList;
    if (!(Array.isArray(slidesList) && slidesList.length)) {
        return editor;
    }

    const slide: Slide = slidesList[slideIndex];
    const elementsList: SlideElement[] = slide.elementsList;
    if (!(Array.isArray(elementsList) && elementsList.length)) {
        return editor;
    }

    const newElementsList: SlideElement[] = elementsList.filter(item => {
        if (editor.selectedSlideElementsIds.includes(item.id)) {
            const size: Size = {
                width: item.size.width * scale.width,
                height: item.size.height * scale.height,
            }

            return {
                ...item,
                size,
            }
        }
        return item;
    })

    const newSlide: Slide = {
        ...slide,
        elementsList: newElementsList,
    }

    return applySlideChanges(editor, newSlide, slideIndex);
}

export function changeElementsOpacity(editor: Editor, opacity: number): Editor {
    const selectedSlidesIds = editor.selectedSlidesIds;
    if (!selectedSlidesIds) {
        return editor;
    }

    const activeSlideId = selectedSlidesIds[selectedSlidesIds.length - 1];
    const slideIndex = editor.presentation.slidesList.findIndex(item => {
        item.id === activeSlideId
    })
    const slidesList: Slide[] = editor.presentation.slidesList;
    if (!(Array.isArray(slidesList) && slidesList.length)) {
        return editor;
    }

    const slide: Slide = slidesList[slideIndex];
    const elementsList: SlideElement[] = slide.elementsList;
    if (!(Array.isArray(elementsList) && elementsList.length)) {
        return editor;
    }

    const newElementsList: SlideElement[] = elementsList.filter(item => {
        if (editor.selectedSlideElementsIds.includes(item.id)) {
            return {
                ...item,
                opacity,
            }
        }
        return item;
    })

    const newSlide: Slide = {
        ...slide,
        elementsList: newElementsList,
    }

    return applySlideChanges(editor, newSlide, slideIndex);
}

export function changeFiguresColor(editor: Editor, figureColor: string): Editor {
    const selectedSlidesIds = editor.selectedSlidesIds;
    if (!selectedSlidesIds) {
        return editor;
    }

    const activeSlideId = selectedSlidesIds[selectedSlidesIds.length - 1];
    const slideIndex = editor.presentation.slidesList.findIndex(item => {
        item.id === activeSlideId
    })
    const slidesList: Slide[] = editor.presentation.slidesList;
    if (!(Array.isArray(slidesList) && slidesList.length)) {
        return editor
    }

    const slide: Slide = slidesList[slideIndex];
    const elementsList: SlideElement[] = slide.elementsList;
    if (!(Array.isArray(elementsList) && elementsList.length)) {
        return editor;
    }

    const newElementsList: SlideElement[] = elementsList.filter(item => {
        if (editor.selectedSlideElementsIds.includes(item.id) && isFigure(item.content)) {
            return {
                ...item,
                content: {
                    ...item.content,
                    figureColor
                }
            }
        }
        return item;
    })

    const newSlide: Slide = {
        ...slide,
        elementsList: newElementsList,
    }

    return applySlideChanges(editor, newSlide, slideIndex);
}

export function changeTextsSize(editor: Editor, fontSize: number): Editor {
    const selectedSlidesIds = editor.selectedSlidesIds;
    if (!selectedSlidesIds) {
        return editor;
    }

    const activeSlideId = selectedSlidesIds[selectedSlidesIds.length - 1];
    const slideIndex = editor.presentation.slidesList.findIndex(item => {
        item.id === activeSlideId
    })
    const slidesList: Slide[] = editor.presentation.slidesList;
    if (!(Array.isArray(slidesList) && slidesList.length)) {
        return editor;
    }

    const slide: Slide = slidesList[slideIndex];
    const elementsList: SlideElement[] = slide.elementsList;
    if (!(Array.isArray(elementsList) && elementsList.length)) {
        return editor;
    }

    const newElementsList: SlideElement[] = elementsList.filter(item => {
        if (editor.selectedSlideElementsIds.includes(item.id) && isText(item.content)) {
            return {
                ...item,
                content: {
                    ...item.content,
                    fontSize,
                }
            }
        }
        return item;
    })

    const newSlide: Slide = {
        ...slide,
        elementsList: newElementsList,
    }

    return applySlideChanges(editor, newSlide, slideIndex);
}

export function changeTextsColor(editor: Editor, fontColor: string): Editor {
    const selectedSlidesIds = editor.selectedSlidesIds;
    if (!selectedSlidesIds) {
        return editor;
    }

    const activeSlideId = selectedSlidesIds[selectedSlidesIds.length - 1];
    const slideIndex = editor.presentation.slidesList.findIndex(item => {
        item.id === activeSlideId;
    })
    const slidesList: Slide[] = editor.presentation.slidesList;
    if (!(Array.isArray(slidesList) && slidesList.length)) {
        return editor;
    }

    const slide: Slide = slidesList[slideIndex];
    const elementsList: SlideElement[] = slide.elementsList;
    if (!(Array.isArray(elementsList) && elementsList.length)) {
        return editor;
    }

    const newElementsList: SlideElement[] = elementsList.filter(item => {
        if (editor.selectedSlideElementsIds.includes(item.id) && isText(item.content)) {
            return {
                ...item,
                content: {
                    ...item.content,
                    fontColor
                }
            }
        }
        return item;
    })

    const newSlide: Slide = {
        ...slide,
        elementsList: newElementsList,
    }

    return applySlideChanges(editor, newSlide, slideIndex);
}

export function removeSelectedElements(editor: Editor): Editor {
    const selectedSlidesIds = editor.selectedSlidesIds;
    if (!selectedSlidesIds) {
        return editor;
    }

    const activeSlideId = selectedSlidesIds[selectedSlidesIds.length - 1];
    const slideIndex = editor.presentation.slidesList.findIndex(slide => {
        slide.id === activeSlideId
    })
    const slidesList: Slide[] = editor.presentation.slidesList;
    if (!(Array.isArray(slidesList) && slidesList.length)) {
        return editor;
    }

    const slide: Slide = slidesList[slideIndex];
    const elementsList: SlideElement[] = slide.elementsList;
    if (!(Array.isArray(elementsList) && elementsList.length)) {
        return editor;
    }

    const newElementsList: SlideElement[] = elementsList.filter(item => {
        if (!editor.selectedSlideElementsIds.includes(item.id)) {
            return item;
        }
    })

    const newSlide: Slide = {
        ...slide,
        elementsList: newElementsList,
    }

    return applySlideChanges(editor, newSlide, slideIndex);
}

export function changePicture(editor: Editor, src: string): Editor {
    const selectedSlidesIds = editor.selectedSlidesIds;
    if (!selectedSlidesIds) {
        return editor;
    }

    const activeSlideId = selectedSlidesIds[selectedSlidesIds.length - 1];
    const slideIndex = editor.presentation.slidesList.findIndex(item => {
        item.id === activeSlideId;
    })
    const slidesList: Slide[] = editor.presentation.slidesList
    if (!(Array.isArray(slidesList) && slidesList.length)) {
        return editor;
    }

    const slide: Slide = slidesList[slideIndex];
    const elementsList: SlideElement[] = slide.elementsList;
    if (!(Array.isArray(elementsList) && elementsList.length)) {
        return editor;
    }

    const newElementsList: SlideElement[] = elementsList.filter(item => {
        if (editor.selectedSlideElementsIds.includes(item.id) && isPicture(item.content)) {
            return {
                ...item,
                content: {
                    ...item.content,
                    src,
                }
            }
        }
        return item;
    })

    const newSlide: Slide = {
        ...slide,
        elementsList: newElementsList
    }

    return applySlideChanges(editor, newSlide, slideIndex);
}

function applySlideChanges(editor: Editor, newSlide: Slide, newSlideIndex: number): Editor {
    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slidesList:
                [...editor.presentation.slidesList.slice(0, newSlideIndex),
                    newSlide,
                ...editor.presentation.slidesList.slice(newSlideIndex + 1)
                ]
        }
    }
}

function isText(element: TextElement | FigureElement | PictureElement): element is TextElement {
    return (element as TextElement).fontSize !== undefined;
}

function isFigure(element: TextElement | FigureElement | PictureElement): element is FigureElement {
    return (element as FigureElement).figureType !== undefined;
}

function isPicture(element: TextElement | FigureElement | PictureElement): element is PictureElement {
    return (element as PictureElement).src !== undefined;
}
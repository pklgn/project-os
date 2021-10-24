import { Editor, FigureElement, FigureShape, PictureElement, Size, SlideElement, TextElement, Coordinates } from './types'
import { Presentation } from './types'
import { PresentationMode } from './types'
import { History } from './types'
import { Slide } from './types'
import { Background } from './types'
import { generateUUId } from '../utils/uuid'
import { Text, Figure, Picture } from '../constatns/elementConstants'
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

export function addTextElement(editor: Editor): Editor {
    //TODO Паша
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
        //TODO получать параметры centerPoint size
        centerPoint: {
            x: 1,
            y: 1,
        },
        angle: 0,
        size: {
            width: 30,
            height: 25,
        },
        opacity: 1,
        content: textElement,
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
    //TODO Паша
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
        //TODO получать параметры centerPoint size src
        centerPoint: {
            x: 1,
            y: 1,
        },
        size: {
            width: 1,
            height: 1,
        },
        angle: 0,
        opacity: 1,
        content: pictureElement,
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
    //TODO Паша
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
        //TODO получать параметры centerPoint size
        centerPoint: {
            x: 1,
            y: 1,
        },
        size: {
            width: 1,
            height: 1,
        },
        angle: 0,
        opacity: 1,
        content: figureElement,

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

export function moveElementsToBackground(editor: Editor): Editor {
    //TODO Раф
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
        ...elementsList.filter(element => editor.selectedSlideElementsIds.includes(element.id)),
        ...elementsList.filter(element => !editor.selectedSlideElementsIds.includes(element.id))
    ];

    const newSlide: Slide = {
        ...slide,
        elementsList: newElementsList
    }

    return applySlideChanges(editor, newSlide, slideIndex);
}

export function moveElementsToForeground(editor: Editor): Editor {
    //TODO Раф
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
    //TODO Раф
    //индекс смещения
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
    //TODO Лёня
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
    //TODO Лёня
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
    //TODO Паша
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
    //TODO Паша
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
    //TODO Раф
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
    //TODO Паша
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
    //TODO Раф
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

//TODO Раф
// rotateElement(editor: Editor, angle: number)

//TODO Паша
// changeElementPosition(editor: Editor, t: Coordinates)


export function saveCenterPoint(editor: Editor, x1: number, y1: number, x2?: number, y2?: number): Coordinates {
    const centerPoint = (x2 !== undefined && y2 !== undefined)
    ? {
        x: (x1 + x2) / 2,
        y: (y1 + y2) / 2
    }
    : {
        x: (x1 + Text.DEFAULT_WIDTH) / 2,
        y: (y1 + Text.DEFAULT_HEIGHT) / 2
    }
    
    return centerPoint
}
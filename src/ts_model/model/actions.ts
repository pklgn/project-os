import {
    Editor,
    FigureElement,
    FigureShape,
    PictureElement,
    Size,
    SlideElement,
    TextElement,
} from './types'
import { Slide } from './types'
import { generateUUId } from '../utils/uuid'

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

export function addTextElement(editor: Editor, x: number = 1, y: number = 1): Editor {
    const selectedSlidesIds = editor.selectedSlidesIds;
    const slideList: Slide[] = editor.presentation.slidesList;

    if (!(slideList.length && selectedSlidesIds.length)) {
        return editor;
    }

    const selectedSlideId: string = selectedSlidesIds[selectedSlidesIds.length - 1];
    const slideIndex: number = slideList.findIndex((slide) => {
        return slide.id === selectedSlideId
    });

    const slide: Slide = slideList[slideIndex];
    const textElement: TextElement = {
        content: 'Введите текст',
        fontSize: 10,
        fontColor: '#ffffff',
        fontStyle: 'italic'
    }
    const element: SlideElement = {
        id: generateUUId(),
        centerPoint: {
            x,
            y,
        },
        angle: 0,
        size: {
            width: 30,
            height: 25,
        },
        opacity: 1,
        content: textElement,
    }

    const updatedSlide: Slide = {
        ...slide,
        elementsList: [
            ...slide.elementsList,
            element,
        ]
    }

    const updatedSlideList: Slide[] = editor.presentation.slidesList.map((slide, index) => {
        if (index === slideIndex) {
            return updatedSlide;
        }
        return slide;
    })

    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slidesList: updatedSlideList,
        },
        selectedSlidesIds: [selectedSlideId],
        selectedSlideElementsIds: [element.id],
    }
}

export function addPictureElement(
    editor: Editor,
    src: string,
    x: number = 1,
    y: number = 1,
    width: number = 1,
    height: number = 1,
): Editor {
    const selectedSlidesIds = editor.selectedSlidesIds;
    const slideList: Slide[] = editor.presentation.slidesList;

    if (!(slideList.length && selectedSlidesIds.length)) {
        return editor;
    }

    const selectedSlideId: string = selectedSlidesIds[selectedSlidesIds.length - 1];
    const slideIndex: number = slideList.findIndex(slide => {
        return slide.id === selectedSlideId
    });

    const slide: Slide = slideList[slideIndex];
    const pictureElement: PictureElement = {
        src
    }

    const element: SlideElement = {
        id: generateUUId(),
        centerPoint: {
            x,
            y,
        },
        size: {
            width,
            height,
        },
        angle: 0,
        opacity: 1,
        content: pictureElement,
    }

    const updatedSlide: Slide = {
        ...slide,
        elementsList: [
            ...slide.elementsList,
            element,
        ]
    }
    const updatedSlideList: Slide[] = editor.presentation.slidesList.map((slide, index) => {
        if (index === slideIndex) {
            return updatedSlide;
        }
        return slide;
    })

    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slidesList: updatedSlideList,
        },
        selectedSlidesIds: [selectedSlideId],
        selectedSlideElementsIds: [element.id],
    }
}

export function addFigureElement(
    editor: Editor,
    figureType: FigureShape,
    x: number = 1,
    y: number = 1,
): Editor {
    const slideList: Slide[] = editor.presentation.slidesList;
    const selectedSlideIds: string[] = editor.selectedSlidesIds;

    if (!(slideList.length && selectedSlideIds.length)) {
        return editor;
    }

    const selectedSlideId: string = selectedSlideIds[selectedSlideIds.length - 1];
    const slideIndex: number = slideList.findIndex(slide => {
        return slide.id === selectedSlideId
    });

    const slide: Slide = slideList[slideIndex];

    const figureElement: FigureElement = {
        figureType,
        figureColor: '#ffffff',
        borderWidth: 1,
        borderColor: '#000000',
    }

    const element: SlideElement = {
        id: generateUUId(),
        centerPoint: {
            x,
            y,
        },
        size: {
            width: 1,
            height: 1,
        },
        angle: 0,
        opacity: 1,
        content: figureElement,

    }

    const updatedSlide: Slide = {
        ...slide,
        elementsList: [
            ...slide.elementsList,
            element,
        ]
    }

    const updatedSlideList: Slide[] = editor.presentation.slidesList.map((slide, index) => {
        if (index === slideIndex) {
            return updatedSlide;
        }
        return slide;
    })

    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slidesList: updatedSlideList,
        },
        selectedSlidesIds: [selectedSlideId],
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
        return item.id === activeSlideId
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
        return item.id === activeSlideId
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

export function changeElementsSize(editor: Editor, scaleX: number, scaleY: number): Editor {
    const scale: Size = {
        width: scaleX,
        height: scaleY,
    };
    const selectedSlidesIds: string[] = editor.selectedSlidesIds
    const slidesList: Slide[] = editor.presentation.slidesList;

    if ((slidesList.length === 0) || !selectedSlidesIds.length) {
        return editor;
    }

    const selectedSlideId: string = selectedSlidesIds[selectedSlidesIds.length - 1];
    const slideIndex = editor.presentation.slidesList.findIndex(item =>
        item.id === selectedSlideId
    )
    const slide: Slide = slidesList[slideIndex];
    const elementsList: SlideElement[] = slide.elementsList;

    if (elementsList.length === 0) {
        return editor;
    }

    const updatedElementList: SlideElement[] = elementsList.map(item => {
        if (editor.selectedSlideElementsIds.includes(item.id)) {
            const size: Size = {
                width: item.size.width * scale.width,
                height: item.size.height * scale.height,
            };

            return {
                ...item,
                size,
            };
        }

        return item;
    })

    const updatedSlide: Slide = {
        ...slide,
        elementsList: updatedElementList,
    }
    const updatedEditor = applySlideChanges(editor, updatedSlide, slideIndex);

    return {
        ...updatedEditor,
        selectedSlidesIds: [selectedSlideId],
    }
}

export function changeElementsOpacity(editor: Editor, opacity: number): Editor {
    //TODO Лёня
    const selectedSlidesIds = editor.selectedSlidesIds;
    if (!selectedSlidesIds) {
        return editor;
    }

    const activeSlideId = selectedSlidesIds[selectedSlidesIds.length - 1];
    const slideIndex = editor.presentation.slidesList.findIndex(item => {
        return item.id === activeSlideId
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
    const selectedSlideIds: string[] = editor.selectedSlidesIds;
    const slidesList: Slide[] = editor.presentation.slidesList;

    if (!selectedSlideIds.length || !slidesList.length) {
        return editor;
    }

    const selectedSlideId: string = selectedSlideIds[selectedSlideIds.length - 1];
    const slideIndex: number = slidesList.findIndex(slide => {
        return slide.id === selectedSlideId
    })
    const slide: Slide = slidesList[slideIndex];
    const elementsList: SlideElement[] = slide.elementsList;

    if (!elementsList.length) {
        return editor;
    }

    const updatedElementsList: SlideElement[] = elementsList.map(item => {
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

    const updatedSlide: Slide = {
        ...slide,
        elementsList: updatedElementsList,
    }
    const updatedEditor = applySlideChanges(editor, updatedSlide, slideIndex);

    return {
        ...updatedEditor,
        selectedSlidesIds: [selectedSlideId]
    }
}

export function changeTextsSize(editor: Editor, fontSize: number): Editor {
    const selectedSlideIds: string[] = editor.selectedSlidesIds;
    const slidesList: Slide[] = editor.presentation.slidesList;

    if (!selectedSlideIds.length || !slidesList.length) {
        return editor;
    }

    const selectedSlideId: string = selectedSlideIds[selectedSlideIds.length - 1];
    const slideIndex: number = slidesList.findIndex(slide => {
        return slide.id === selectedSlideId
    })
    const slide: Slide = slidesList[slideIndex];
    const elementsList: SlideElement[] = slide.elementsList;

    if (!elementsList.length) {
        return editor;
    }

    const newElementsList: SlideElement[] = elementsList.map(element => {
        if (editor.selectedSlideElementsIds.includes(element.id) && isText(element.content)) {
            return {
                ...element,
                content: {
                    ...element.content,
                    fontSize,
                }
            }
        }
        return element;
    })

    const updatedSlide: Slide = {
        ...slide,
        elementsList: newElementsList,
    }

    const updatedEditor = applySlideChanges(editor, updatedSlide, slideIndex);

    return {
        ...updatedEditor,
        selectedSlidesIds: [selectedSlideId]
    }
}

export function changeTextsColor(editor: Editor, fontColor: string): Editor {
    //TODO Раф
    const selectedSlidesIds = editor.selectedSlidesIds;
    if (!selectedSlidesIds) {
        return editor;
    }

    const activeSlideId = selectedSlidesIds[selectedSlidesIds.length - 1];
    const slideIndex = editor.presentation.slidesList.findIndex(item => {
        return item.id === activeSlideId;
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
    const selectedSlideIds: string[] = editor.selectedSlidesIds;
    const slidesList: Slide[] = editor.presentation.slidesList;

    if (!selectedSlideIds.length || !slidesList.length) {
        return editor;
    }

    const selectedSlideId: string = selectedSlideIds[selectedSlideIds.length - 1];
    const slideIndex: number = slidesList.findIndex(slide => {
        return slide.id === selectedSlideId
    })
    const slide: Slide = slidesList[slideIndex];
    const elementsList: SlideElement[] = slide.elementsList;

    if (!elementsList.length) {
        return editor;
    }

    const updatedElementsList: SlideElement[] = elementsList.filter(item => {
        return !editor.selectedSlideElementsIds.includes(item.id)
    })

    const updatedSlide: Slide = {
        ...slide,
        elementsList: updatedElementsList,
    }

    const updatedEditor = applySlideChanges(editor, updatedSlide, slideIndex);

    return {
        ...updatedEditor,
        selectedSlidesIds: [selectedSlideId],
        selectedSlideElementsIds: [],
    }
}

export function changePicture(editor: Editor, src: string): Editor {
    //TODO Раф
    const selectedSlidesIds = editor.selectedSlidesIds;
    if (!selectedSlidesIds) {
        return editor;
    }

    const activeSlideId = selectedSlidesIds[selectedSlidesIds.length - 1];
    const slideIndex: number = editor.presentation.slidesList.findIndex(item => {
        return item.id === activeSlideId;
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
                ],
        },
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

//TODO Лёня
// save centerPoint func(t: Coordinates)

export function changeElementsPosition(editor: Editor, dx: number, dy: number): Editor {
    const selectedSlideIds: string[] = editor.selectedSlidesIds;
    const slidesList: Slide[] = editor.presentation.slidesList;

    if (!selectedSlideIds.length || !slidesList.length) {
        return editor;
    }

    const selectedSlideId: string = selectedSlideIds[selectedSlideIds.length - 1];
    const slideIndex: number = slidesList.findIndex(slide => {
        return slide.id === selectedSlideId
    })
    const slide: Slide = slidesList[slideIndex];
    const elementsList: SlideElement[] = slide.elementsList;

    if (!elementsList.length) {
        return editor;
    }

    const updatedElementsList: SlideElement[] = elementsList.map(element => {
        if (editor.selectedSlideElementsIds.includes(element.id)) {
            return {
                ...element,
                centerPoint: {
                    x: element.centerPoint.x + dx,
                    y: element.centerPoint.y + dy,
                }
            }
        }

        return element;
    })

    const updatedSlide: Slide = {
        ...slide,
        elementsList: updatedElementsList,
    }

    const updatedEditor = applySlideChanges(editor, updatedSlide, slideIndex);

    return {
        ...updatedEditor,
        selectedSlidesIds: [selectedSlideId],
    }
}
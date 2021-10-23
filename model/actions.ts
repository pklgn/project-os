import {Editor, FigureElement, FigureShape, PictureElement, Size, SlideElement, TextElement} from './types'
import {Presentation} from './types'
import {PresentationMode} from './types'
import {History} from './types'
import {Slide} from './types'
import {Background} from './types'
import { generateUUId } from '../utils/UUIDutils'

export function changePresentationMode(editor: Editor, mode: PresentationMode): Editor {
    return {
        ...editor,
        mode
    }
}

export function setSelectedIndexesInEditor(editor: Editor, selectedSlidesIds: string[], selectedSlideElementsIds: string[]): Editor {
    return {
        ...editor,
        selectedSlidesIds,
        selectedSlideElementsIds,
    }
    //TODO убрать все параметры-индексы в функциях, брать их из полей editor
    //порядок использования функций
    //1. setIndexes
    //2. initELement (optional)
    //3. changeElement
    //4. keep
}

export function undo(editor: Editor): void {
    if (editor.history.currState >= 0) {
        editor.history.currState -= 1
        if (editor.history.currState === -1) {
            return
        }

        const currState: number = editor.history.currState
        editor.presentation =
            editor.history.presentationStates[currState]
        editor.selectedSlidesIds =
            editor.history.selectedSlidesIdsStates[currState]
        editor.selectedSlideElementsIds =
            editor.history.selectedSlideElementsIdsStates[currState]
    }
}

export function redo(editor: Editor): void {
    if (0 <= editor.history.currState) {
        editor.history.currState += 1
        if (editor.history.currState === editor.history.presentationStates.length) {
            return
        }

        const currState: number = editor.history.currState
        editor.presentation =
            editor.history.presentationStates[currState]
        editor.selectedSlidesIds =
            editor.history.selectedSlidesIdsStates[currState]
        editor.selectedSlideElementsIds =
            editor.history.selectedSlideElementsIdsStates[currState]
    }
}

export function keep(editor: Editor): void {
    const spliceStart: number = editor.history.currState + 1

    const selectedSlidesIds = editor.selectedSlidesIds
    const selectedSlideElementsIds = editor.selectedSlideElementsIds
    
    editor.history.presentationStates.splice(spliceStart)
    editor.history.presentationStates.push(editor.presentation)

    editor.history.selectedSlidesIdsStates.splice(spliceStart)
    editor.history.selectedSlidesIdsStates.push(selectedSlidesIds)

    editor.history.selectedSlideElementsIdsStates.splice(spliceStart)
    editor.history.selectedSlideElementsIdsStates.push(selectedSlideElementsIds)

    editor.history.currState = editor.history.presentationStates.length - 1
}

export function addSlide(editor: Editor): Editor {
    const activeSlideId = editor.selectedSlideElementsIds.slice(-1)[0]
    const insertIndex = editor.presentation.slidesList.findIndex(item => {
            if (item.id === activeSlideId) return 1
            return 0
        }
    )
    
    const background: Background = {
        color: '#ffffff',
        src: '',
    }

    const newSlide: Slide = {
        id: generateUUId(),
        background,
        elementsList: []
    }

    const slidesList: Slide[] = (insertIndex === -1)    // ID не найден => не выбран элемент
        ? [
            ...editor.presentation.slidesList,
            newSlide
        ]
        : [
            ...editor.presentation.slidesList.slice(0, insertIndex),
            newSlide,
            ...editor.presentation.slidesList.slice(insertIndex)
        ]

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

export function insertSelectedSlides(editor: Editor, insertIndex: number): Editor {
    const slidesList: Slide[] = editor.presentation.slidesList
    const selectedSlidesIds = editor.selectedSlidesIds
    if (!(Array.isArray(slidesList) && slidesList.length)) {
        return
    }

    const selectedSlides: Slide[] = slidesList.filter(item => {
        if (selectedSlidesIds.includes(item.id)) {
            return 1
        }
        return 0
    })

    if (!(Array.isArray(selectedSlides) && selectedSlides.length)) {
        return
    }

    const slidesBeforeInsertPosition: Slide[] = slidesList.slice(0, insertIndex)
    const slidesAfterInsertPosition: Slide[] = slidesList.slice(insertIndex)

    const newSlideList: Slide[] = [
        ...slidesBeforeInsertPosition.filter(item => {
            if (selectedSlidesIds.includes(item.id)) {
                return 1
            }
            return 0
        }),
        ...selectedSlides,
        ...slidesAfterInsertPosition.filter(item => {
            if (selectedSlidesIds.includes(item.id)) {
                return 1
            }
            return 0
        })
    ]

    const updatedPresentation: Presentation = {
        ...editor.presentation,
        slidesList: newSlideList,
    }

    return {
        ...editor,
        presentation: updatedPresentation,
        selectedSlideElementsIds: []
    }
}

export function deleteSelectedSlides(editor: Editor): Editor {
    const slideList: Slide[] = editor.presentation.slidesList
    if (!(Array.isArray(slideList) && slideList.length)) {
        return
    }

    const selectedSlidesIds = editor.selectedSlidesIds
    const activeSlideId: string = selectedSlidesIds[selectedSlidesIds.length - 1]

    const newSlideList: Slide[] = slideList.filter(item => {
        if (item.id === activeSlideId) { 
            const newActiveSlideIndex = 0
        }
        if (selectedSlidesIds.includes(item.id)) {
            return 0
        }
        return 1
    })
    
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
}

export function addTextElement(editor: Editor): Editor {
    const selectedSlidesIds = editor.selectedSlidesIds
    const slideList = editor.presentation.slidesList

    const slideIndex = slideList.findIndex(element => {
        element.id === selectedSlidesIds[selectedSlidesIds.length - 1]
    })

    if (!(Array.isArray(slideList) && slideList.length)) {
        return
    }

    const slide: Slide = slideList[slideIndex]

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
            return newSlide
        }
        return slide
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
    const slideList: Slide[] = editor.presentation.slidesList
    const selectedSlidesIds = editor.selectedSlidesIds

    const slideIndex = slideList.findIndex(element => {
        element.id === selectedSlidesIds[selectedSlidesIds.length - 1]
    })

    if (!(Array.isArray(slideList) && slideList.length)) {
        return
    }

    const slide: Slide = slideList[slideIndex]

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
            return newSlide
        }
        return slide
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
    const slideList: Slide[] = editor.presentation.slidesList
    const selectedSlidesIds = editor.selectedSlidesIds

    const slideIndex = slideList.findIndex(element => {
        element.id === selectedSlidesIds[selectedSlidesIds.length - 1]
    })

    if (!(Array.isArray(slideList) && slideList.length)) {
        return
    }

    const slide: Slide = slideList[slideIndex]

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
            return newSlide
        }
        return slide
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
    const selectedSlidesIds = editor.selectedSlidesIds
    if (!selectedSlidesIds) return

    const activeSlideId = selectedSlidesIds[selectedSlidesIds.length - 1]
    const slideIndex = editor.presentation.slidesList.findIndex(item => {
        item.id === activeSlideId
    })
    const slide: Slide = editor.presentation.slidesList[slideIndex]

    const newSlide: Slide = {
        ...slide,
        background,
    }

    return applySlideChanges(editor, newSlide, slideIndex)
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
    const selectedSlidesIds = editor.selectedSlidesIds
    if (!selectedSlidesIds) return  // на array не проверяю

    const activeSlideId = selectedSlidesIds[selectedSlidesIds.length - 1]
    const slideIndex = editor.presentation.slidesList.findIndex(item => {
        item.id === activeSlideId
    })
    const slidesList: Slide[] = editor.presentation.slidesList
    if (!(Array.isArray(slidesList) && slidesList.length)) {
        return
    }

    const slide: Slide = slidesList[slideIndex]
    const elementsList: SlideElement[] = slide.elementsList
    if (!(Array.isArray(elementsList) && elementsList.length)) {
        return
    }

    const newElementsList: SlideElement[] = [
        ...elementsList.map(element => {
            if (editor.selectedSlideElementsIds.includes(element.id)) {
                return element
            }
        }),
        ...elementsList.map(element => {
            if (!editor.selectedSlideElementsIds.includes(element.id)) {
                return element
            }
        })
    ]

    const newSlide: Slide = {
        ...slide,
        elementsList: newElementsList
    }

    return applySlideChanges(editor, newSlide, slideIndex)
}

export function moveElementsToForeground(editor: Editor): Editor {
    const selectedSlidesIds = editor.selectedSlidesIds
    if (!selectedSlidesIds) return  // на array не проверяю

    const activeSlideId = selectedSlidesIds[selectedSlidesIds.length - 1]
    const slideIndex = editor.presentation.slidesList.findIndex(item => {
        item.id === activeSlideId
    })

    const slidesList: Slide[] = editor.presentation.slidesList
    if (!(Array.isArray(slidesList) && slidesList.length)) {
        return
    }

    const slide = slidesList[slideIndex]
    const elementsList: SlideElement[] = slide.elementsList
    if (!(Array.isArray(elementsList) && elementsList.length)) {
        return
    }

    const newElementsList = [
        ...elementsList.map((element, index) => {
            if (!editor.selectedSlideElementsIds.includes(element.id)) {
                return element
            }
        }),
        ...elementsList.map((element, index) => {
            if (editor.selectedSlideElementsIds.includes(element.id)) {
                return element
            }
        })
    ]

    const newSlide: Slide = {
        ...slide,
        elementsList: newElementsList
    }

    return applySlideChanges(editor, newSlide, slideIndex)
}

export function changeElementsSize(editor: Editor, scale: Size): Editor {
    const selectedSlidesIds = editor.selectedSlidesIds
    if (!selectedSlidesIds) return  // на array не проверяю

    const activeSlideId = selectedSlidesIds[selectedSlidesIds.length - 1]
    const slideIndex = editor.presentation.slidesList.findIndex(item => {
        item.id === activeSlideId
    })
    const slidesList: Slide[] = editor.presentation.slidesList
    if (!(Array.isArray(slidesList) && slidesList.length)) {
        return
    }

    const slide: Slide = slidesList[slideIndex]
    const elementsList: SlideElement[] = slide.elementsList
    if (!(Array.isArray(elementsList) && elementsList.length)) {
        return
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
        return item
    })

    const newSlide: Slide = {
        ...slide,
        elementsList: newElementsList,
    }

    return applySlideChanges(editor, newSlide, slideIndex)
}

export function changeElementsOpacity(editor: Editor, opacity: number): Editor {
    const selectedSlidesIds = editor.selectedSlidesIds
    if (!selectedSlidesIds) return  // на array не проверяю

    const activeSlideId = selectedSlidesIds[selectedSlidesIds.length - 1]
    const slideIndex = editor.presentation.slidesList.findIndex(item => {
        item.id === activeSlideId
    })
    const slidesList: Slide[] = editor.presentation.slidesList
    if (!(Array.isArray(slidesList) && slidesList.length)) {
        return
    }

    const slide: Slide = slidesList[slideIndex]
    const elementsList: SlideElement[] = slide.elementsList
    if (!(Array.isArray(elementsList) && elementsList.length)) {
        return
    }

    const newElementsList: SlideElement[] = elementsList.filter(item => {
        if (editor.selectedSlideElementsIds.includes(item.id)) {
            return {
                ...item,
                opacity,
            }
        }
        return item
    })

    const newSlide: Slide = {
        ...slide,
        elementsList: newElementsList,
    }

    return applySlideChanges(editor, newSlide, slideIndex)
}

export function changeFiguresColor(editor: Editor, figureColor: string): Editor {
    const selectedSlidesIds = editor.selectedSlidesIds
    if (!selectedSlidesIds) return  // на array не проверяю

    const activeSlideId = selectedSlidesIds[selectedSlidesIds.length - 1]
    const slideIndex = editor.presentation.slidesList.findIndex(item => {
        item.id === activeSlideId
    })
    const slidesList: Slide[] = editor.presentation.slidesList
    if (!(Array.isArray(slidesList) && slidesList.length)) {
        return
    }

    const slide: Slide = slidesList[slideIndex]
    const elementsList: SlideElement[] = slide.elementsList
    if (!(Array.isArray(elementsList) && elementsList.length)) {
        return
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
        return item
    })

    const newSlide: Slide = {
        ...slide,
        elementsList: newElementsList,
    }

    return applySlideChanges(editor, newSlide, slideIndex)
}

export function changeTextsSize(editor: Editor, fontSize: number) {
    const selectedSlidesIds = editor.selectedSlidesIds
    if (!selectedSlidesIds) return  // на array не проверяю

    const activeSlideId = selectedSlidesIds[selectedSlidesIds.length - 1]
    const slideIndex = editor.presentation.slidesList.findIndex(item => {
        item.id === activeSlideId
    })
    const slidesList: Slide[] = editor.presentation.slidesList
    if (!(Array.isArray(slidesList) && slidesList.length)) {
        return
    }

    const slide: Slide = slidesList[slideIndex]
    const elementsList: SlideElement[] = slide.elementsList
    if (!(Array.isArray(elementsList) && elementsList.length)) {
        return
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
        return item
    })

    const newSlide: Slide = {
        ...slide,
        elementsList: newElementsList,
    }

    return applySlideChanges(editor, newSlide, slideIndex)
}

export function changeTextsColor(editor: Editor, fontColor: string): Editor {
    const selectedSlidesIds = editor.selectedSlidesIds
    if (!selectedSlidesIds) return  // на array не проверяю

    const activeSlideId = selectedSlidesIds[selectedSlidesIds.length - 1]
    const slideIndex = editor.presentation.slidesList.findIndex(item => {
        item.id === activeSlideId
    })
    const slidesList: Slide[] = editor.presentation.slidesList
    if (!(Array.isArray(slidesList) && slidesList.length)) {
        return
    }

    const slide: Slide = slidesList[slideIndex]
    const elementsList: SlideElement[] = slide.elementsList
    if (!(Array.isArray(elementsList) && elementsList.length)) {
        return
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
        return item
    })

    const newSlide: Slide = {
        ...slide,
        elementsList: newElementsList,
    }

    return applySlideChanges(editor, newSlide, slideIndex)
}

export function removeSelectedElements(editor: Editor): Editor {
    const selectedSlidesIds = editor.selectedSlidesIds
    if (!selectedSlidesIds) return  // на array не проверяю

    const activeSlideId = selectedSlidesIds[selectedSlidesIds.length - 1]
    const slideIndex = editor.presentation.slidesList.findIndex(item => {
        item.id === activeSlideId
    })
    const slidesList: Slide[] = editor.presentation.slidesList
    if (!(Array.isArray(slidesList) && slidesList.length)) {
        return
    }

    const slide: Slide = slidesList[slideIndex]
    const elementsList: SlideElement[] = slide.elementsList
    if (!(Array.isArray(elementsList) && elementsList.length)) {
        return
    }

    const newElementsList: SlideElement[] = elementsList.filter(item => {
        if (!editor.selectedSlideElementsIds.includes(item.id)) {
            return item
        }
    })

    const newSlide: Slide = {
        ...slide,
        elementsList: newElementsList,
    }

    return applySlideChanges(editor, newSlide, slideIndex)
}

export function changePicture(editor: Editor, src: string): Editor {
    const selectedSlidesIds = editor.selectedSlidesIds
    if (!selectedSlidesIds) return  // на array не проверяю

    const activeSlideId = selectedSlidesIds[selectedSlidesIds.length - 1]
    const slideIndex = editor.presentation.slidesList.findIndex(item => {
        item.id === activeSlideId
    })
    const slidesList: Slide[] = editor.presentation.slidesList
    if (!(Array.isArray(slidesList) && slidesList.length)) {
        return
    }

    const slide: Slide = slidesList[slideIndex]
    const elementsList: SlideElement[] = slide.elementsList
    if (!(Array.isArray(elementsList) && elementsList.length)) {
        return
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
        return item
    })

    const newSlide: Slide = {
        ...slide,
        elementsList: newElementsList
    }

    return applySlideChanges(editor, newSlide, slideIndex)
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

function isText(element): element is TextElement {
    return element.fontSize !== undefined
}

function isFigure(element): element is FigureElement {
    return element.figureType !== undefined
}

function isPicture(element): element is PictureElement {
    return element.src !== undefined
}

import { Editor, FigureElement, FigureShape, PictureElement, Size, SlideElement, TextElement } from './types'
import { Presentation } from './types'
import { PresentationMode } from './types'
import { History } from './types'
import { Slide } from './types'
import { Background } from './types'

export function changePresentationMode(editor: Editor, mode: PresentationMode): Editor {
    return {
        ...editor,
        mode
    }
}

export function undo(editor: Editor): void {
    if (editor.history.currPresentationState > 0) {
        editor.history.currPresentationState -= 1
        const presentationStateIndex: number = editor.history.currPresentationState
        editor.presentation = editor.history.presentationStates[presentationStateIndex] 
    }
    if (editor.history.currSelectedSlidesState > 0) {
        editor.history.currSelectedSlidesState -= 1
        const selectedSlidesState: number = editor.history.currSelectedSlidesState
        editor.selectedSlidesId = editor.history.selectedSlidesIdStates[selectedSlidesState]
    }
    if (editor.history.currSelectedSlideElementsState > 0) {
        editor.history.currSelectedSlideElementsState -= 1
        const selectedSlideElementsState: number = editor.history.currSelectedSlideElementsState
        editor.selectedSlidesId = editor.history.selectedSlideElementsIdStates[selectedSlideElementsState]
    }
}

export function redo(editor: Editor): void {
    if (0 <= editor.history.currPresentationState && 
             editor.history.currPresentationState < editor.history.presentationStates.length - 1) {

        editor.history.currPresentationState += 1
        const presentationStateIndex: number = editor.history.currPresentationState
        editor.presentation = editor.history.presentationStates[presentationStateIndex]
    }
    if (0 <= editor.history.currSelectedSlidesState && 
             editor.history.currSelectedSlidesState < editor.history.selectedSlidesIdStates.length - 1) {

        editor.history.currSelectedSlidesState -= 1
        const selectedSlidesStateIndex: number = editor.history.currSelectedSlidesState
        editor.selectedSlidesId = editor.history.selectedSlidesIdStates[selectedSlidesStateIndex]
    }
    if (0 <= editor.history.currSelectedSlideElementsState && 
             editor.history.currSelectedSlideElementsState < editor.history.selectedSlideElementsIdStates.length - 1) {

        editor.history.currSelectedSlideElementsState += 1
        const selectedSlideElementsIdStateIndex: number = editor.history.currSelectedSlideElementsState
        editor.selectedSlideElementsId = editor.history.selectedSlideElementsIdStates[selectedSlideElementsIdStateIndex]
    }
}

export function keep(editor: Editor, selectedSlidesId: number[], selectedSlideElementsId: number[]): void {
    editor.history.presentationStates.splice(0, editor.history.currPresentationState + 1)
    editor.history.presentationStates.push(editor.presentation)
    editor.history.currPresentationState = editor.history.presentationStates.length - 1

    editor.history.selectedSlidesIdStates.splice(0, editor.history.currSelectedSlidesState + 1)
    editor.history.selectedSlidesIdStates.push(selectedSlidesId)
    editor.history.currSelectedSlidesState = editor.history.selectedSlidesIdStates.length - 1

    editor.history.selectedSlideElementsIdStates.splice(0, editor.history.currSelectedSlideElementsState + 1)
    editor.history.selectedSlideElementsIdStates.push(selectedSlideElementsId)
    editor.history.currSelectedSlideElementsState = editor.history.selectedSlideElementsIdStates.length - 1
}

export function addSlide(editor: Editor, insertIndex: number): Editor {
    const background: Background = {
        color: '#ffffff',
        src: '',
    }

    const newSlide: Slide = {
        id: editor.presentation.slidesList.length,
        background,
        elementsList: []
    }

    const slidesList: Slide[] = (insertIndex === 0)
        ? [newSlide]
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
        selectedSlidesId: [insertIndex],
        selectedSlideElementsId: []
    }
}

export function insertSelectedSlides(editor: Editor, selectedSlidesId: number[], insertIndex: number): Editor {
    const slidesList: Slide[] = editor.presentation.slidesList

    if (!(Array.isArray(slidesList) && slidesList.length)) {
        return
    }

    const selectedSlides: Slide[] = slidesList.map((slide) => {
        if (selectedSlidesId.includes(slide.id)) {
            return slide
        }
    })

    if (!(Array.isArray(selectedSlides) && selectedSlides.length)) {
        return
    }

    const slidesBeforeInsertPosition: Slide[] = slidesList.slice(0, insertIndex)
    const slidesAfterInsertPosition: Slide[] = slidesList.slice(insertIndex)

    const newSlideList: Slide[] = [
        ...slidesBeforeInsertPosition.filter((slide) => {
            return selectedSlidesId.includes(slide.id)
        }),
        ...selectedSlides,
        ...slidesAfterInsertPosition.filter((slide) => !selectedSlidesId.includes(slide.id + insertIndex))
    ]

    const updatedPresentation: Presentation = {
        ...editor.presentation,
        slidesList: newSlideList,
    }

    return {
        ...editor,
        presentation: updatedPresentation,
        selectedSlidesId: selectedSlidesId,
        selectedSlideElementsId: []
    }
}

function getNextUnselectedSlideIndex(lastSelectedSlideIndex: number, selectedSlideIndexes: number[], maxIndex: number, ascending: boolean = true): number {
    if (lastSelectedSlideIndex === 0 && !ascending) {
        return -1
    }
    if (lastSelectedSlideIndex < maxIndex && ascending) {
        return selectedSlideIndexes.includes(lastSelectedSlideIndex + 1)
            ? getNextUnselectedSlideIndex(lastSelectedSlideIndex + 1, selectedSlideIndexes, maxIndex)
            : lastSelectedSlideIndex + 1
    } else {
        return selectedSlideIndexes.includes(lastSelectedSlideIndex - 1)
            ? getNextUnselectedSlideIndex(lastSelectedSlideIndex + 1, selectedSlideIndexes, maxIndex, false)
            : lastSelectedSlideIndex - 1
    }
}

export function deleteSelectedSlides(editor: Editor, selectedSlidesId: number[]): Editor {
    const slideList: Slide[] = editor.presentation.slidesList
    if (!(Array.isArray(slideList) && slideList.length)) {
        return
    }

    const lastSelectedSlideIndex: number = selectedSlidesId[selectedSlidesId.length - 1]
    const maxIndex: number = editor.presentation.slidesList.length
    const selectedSlideIndex: number = getNextUnselectedSlideIndex(lastSelectedSlideIndex, selectedSlidesId, maxIndex)

    const newSlideList: Slide[] = slideList.map((slide, index) => {
        if (!selectedSlidesId.includes(index)) {
            return slide
        }
    })

    const updatedPresentation: Presentation = {
        ...editor.presentation,
        slidesList: newSlideList,
    }

    return {
        ...editor,
        presentation: updatedPresentation,
        selectedSlidesId: selectedSlidesId,
        selectedSlideElementsId: [],
    }
}

export function initTextElement(editor: Editor, slideId: number): Editor {
    const slideList = editor.presentation.slidesList
    slideList.forEach((slide) => {
        if (slide.id === slideId) {
            
        }
    })
    const slide: Slide = (editor.presentation.slidesList.((slide) => slide.id === slideId))

    const textElement: TextElement = {
        content: 'Введите текст',
        fontSize: 1,
        fontColor: '#ffffff',
        fontStyle: 'italic'
    }

    var maxId = 0
    slide.elementsList.forEach((element) => {
        if (element.id > maxId) {
            maxId = element.id
        }
    })
    const element: SlideElement = {
        id: maxId,
        size: {
            width: 1,
            height: 1,
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

    const newSlideList: Slide[] = editor.presentation.slidesList.map((slide) => {
        if (slide.id === slideId) {
            return newSlide
        }
        return slide
    })

    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slidesList: newSlideList,
        }
    }
}

export function initPictureElement(editor: Editor, slideId: number): Editor {
    const slideIndex: number = editor.selectedSlidesIndexes.slice(-1)[0]
    if (slideIndex === -1) {
        return
    }

    const slide: Slide = editor.presentation.slidesList[slideId]
    const pictureElement: PictureElement = {
        src: ''
    }

    var maxId = 0
    slide.elementsList.forEach((element) => {
        if (element.id > maxId) {
            maxId = element.id
        }
    })
    const element: SlideElement = {
        id: maxId,
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

    const newSlideList: Slide[] = editor.presentation.slidesList.map((slide) => {
        if (slide.id === slideId) {
            return newSlide
        }
        return slide
    })

    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slidesList: newSlideList,
        }
    }
}

export function initFigureElement(editor: Editor, slideId: number, figureType: FigureShape): Editor {
    const slideIndex: number = editor.selectedSlidesIndexes.slice(-1)[0]
    if (slideIndex === -1) {
        return
    }

    const slide: Slide = editor.presentation.slidesList[slideIndex]
    const figureElement: FigureElement = {
        figureType,
        figureColor: '#ffffff',
        borderWidth: 1,
        borderColor: '#000000',
    }
    const element: SlideElement = {
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
        }
    }
}

export function initEditor(): Editor {
    return {
        mode: "edit",
        presentation: initPresentation(),
        history: initHistory(),
        selectedSlidesId: [0],
        selectedSlideElementsId: []
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
        currPresentationState: -1,
        selectedSlidesIdStates: [],
        currSelectedSlidesState: -1,
        selectedSlideElementsIdStates: [],
        currSelectedSlideElementsState: -1,
    }
}

export function changeSlideBackground(editor: Editor, background: Background): Editor {
    const slideIndex: number = editor.selectedSlidesIndexes.slice(-1)[0]
    if (slideIndex === -1) {
        return
    }

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
    const slideIndex: number = editor.selectedSlidesIndexes.slice(-1)[0]
    if (slideIndex === -1) {
        return
    }

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
        ...elementsList.map((element, index) => {
            if (editor.selectedSlideElementsIndexes.includes(index)) {
                return element
            }
        }),
        ...elementsList.map((element, index) => {
            if (!editor.selectedSlideElementsIndexes.includes(index)) {
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
    const slideIndex: number = editor.selectedSlidesIndexes.slice(-1)[0]
    if (slideIndex === -1) {
        return
    }

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
            if (!editor.selectedSlideElementsIndexes.includes(index)) {
                return element
            }
        }),
        ...elementsList.map((element, index) => {
            if (editor.selectedSlideElementsIndexes.includes(index)) {
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

export function moveElementsToPosition(editor: Editor, elementsLayoutPosition: number) {
    const slideIndex: number = editor.selectedSlidesIndexes.slice(-1)[0]
    if (slideIndex === -1) {
        return
    }

    const slidesList: Slide[] = editor.presentation.slidesList
    if (!(Array.isArray(slidesList) && slidesList.length)) {
        return
    }

    const slide = slidesList[slideIndex]
    const elementsList: SlideElement[] = slide.elementsList
    if (!(Array.isArray(elementsList) && elementsList.length)) {
        return
    }

    const selectedSlideElementsIndexes: number[] = editor.selectedSlideElementsIndexes
    if (!(Array.isArray(selectedSlideElementsIndexes) && selectedSlideElementsIndexes.length)) {
        return
    }

    const elementsBeforeInsertPosition: SlideElement[] = elementsList.slice(0, elementsLayoutPosition)
    const elementsAfterInsertPosition: SlideElement[] = elementsList.slice(elementsLayoutPosition)
    const elementsNeedToBeMoved: SlideElement[] = elementsList.map((element, index) => {
        if (selectedSlideElementsIndexes.includes(index)) {
            return element
        }
    })

    const newElementsList: SlideElement[] = [
        ...elementsBeforeInsertPosition.filter((_, index) => !selectedSlideElementsIndexes.includes(index)),
        ...elementsNeedToBeMoved,
        ...elementsAfterInsertPosition.filter((_, index) => !selectedSlideElementsIndexes.includes(index + elementsLayoutPosition))
    ]

    const newSlide: Slide = {
        ...slide,
        elementsList: newElementsList
    }

    return applySlideChanges(editor, newSlide, slideIndex)
}

export function changeElementsSize(editor: Editor, scale: Size): Editor {
    const slideIndex: number = editor.selectedSlidesIndexes.slice(-1)[0]
    if (slideIndex === -1) {
        return
    }

    const slidesList: Slide[] = editor.presentation.slidesList
    if (!(Array.isArray(slidesList) && slidesList.length)) {
        return
    }

    const slide: Slide = slidesList[slideIndex]
    const elementsList: SlideElement[] = slide.elementsList
    if (!(Array.isArray(elementsList) && elementsList.length)) {
        return
    }

    const newElementsList: SlideElement[] = elementsList.map((element, index) => {
        if (editor.selectedSlideElementsIndexes.includes(index)) {
            const size: Size = {
                width: element.size.width * scale.width,
                height: element.size.height * scale.height,
            }

            return {
                ...element,
                size,
            }
        }
        return element
    })

    const newSlide: Slide = {
        ...slide,
        elementsList: newElementsList,
    }

    return applySlideChanges(editor, newSlide, slideIndex)
}

export function changeElementsOpacity(editor: Editor, opacity: number): Editor {
    const slideIndex: number = editor.selectedSlideElementsIndexes.slice(-1)[0]
    if (slideIndex === -1) {
        return
    }

    const slidesList: Slide[] = editor.presentation.slidesList
    if (!(Array.isArray(slidesList) && slidesList.length)) {
        return
    }

    const slide: Slide = slidesList[slideIndex]
    const elementsList: SlideElement[] = slide.elementsList
    if (!(Array.isArray(elementsList) && elementsList.length)) {
        return
    }

    const newElementsList: SlideElement[] = elementsList.map((element, index) => {
        if (editor.selectedSlideElementsIndexes.includes(index)) {
            return {
                ...element,
                opacity,
            }
        }
        return element
    })

    const newSlide: Slide = {
        ...slide,
        elementsList: newElementsList
    }

    return applySlideChanges(editor, newSlide, slideIndex)
}

export function changeFiguresColor(editor: Editor, color: string): Editor {
    const slideIndex: number = editor.selectedSlidesIndexes.slice(-1)[0]
    if (slideIndex === -1) {
        return
    }

    const slidesList: Slide[] = editor.presentation.slidesList
    if (!(Array.isArray(slidesList) && slidesList.length)) {
        return
    }

    const slide: Slide = slidesList[slideIndex]
    const elementsList: SlideElement[] = slide.elementsList
    if (!(Array.isArray(elementsList) && elementsList.length)) {
        return
    }

    const newElementsList: SlideElement[] = elementsList.map((element, index) => {
        if (editor.selectedSlideElementsIndexes.includes(index) && isFigure(element.content)) {
            return {
                ...element,
                content: {
                    ...element.content,
                    color,
                }
            }
        }
        return element
    })

    const newSlide: Slide = {
        ...slide,
        elementsList: newElementsList
    }

    return applySlideChanges(editor, newSlide, slideIndex)
}

export function changeTextsSize(editor: Editor, fontSize: number) {
    const slideIndex: number = editor.selectedSlidesIndexes.slice(-1)[0]
    if (slideIndex === -1) {
        return
    }

    const slidesList: Slide[] = editor.presentation.slidesList
    if (!(Array.isArray(slidesList) && slidesList.length)) {
        return
    }

    const slide: Slide = slidesList[slideIndex]
    const elementsList: SlideElement[] = slide.elementsList
    if (!(Array.isArray(elementsList) && elementsList.length)) {
        return
    }

    const newElementsList: SlideElement[] = elementsList.map((element, index) => {
        if (editor.selectedSlideElementsIndexes.includes(index) && isText(element.content)) {
            return {
                ...element,
                content: {
                    ...element.content,
                    fontSize
                }
            }
        }
        return element
    })

    const newSlide: Slide = {
        ...slide,
        elementsList: newElementsList
    }

    return applySlideChanges(editor, newSlide, slideIndex)
}

export function changeTextsColor(editor: Editor, fontColor: string): Editor {
    const slideIndex: number = editor.selectedSlidesIndexes.slice(-1)[0]
    if (slideIndex === -1) {
        return
    }

    const slidesList: Slide[] = editor.presentation.slidesList
    if (!(Array.isArray(slidesList) && slidesList.length)) {
        return
    }

    const slide: Slide = slidesList[slideIndex]
    const elementsList: SlideElement[] = slide.elementsList
    if (!(Array.isArray(elementsList) && elementsList.length)) {
        return
    }

    const newElementsList: SlideElement[] = elementsList.map((element, index) => {
        if (editor.selectedSlidesIndexes.includes(index) && isText(element.content)) {
            return {
                ...element,
                content: {
                    ...element.content,
                    fontColor,
                }
            }
        }
        return element
    })

    const newSlide: Slide = {
        ...slide,
        elementsList: newElementsList
    }

    return applySlideChanges(editor, newSlide, slideIndex)
}

export function removeSelectedElements(editor: Editor): Editor {
    const slideIndex: number = editor.selectedSlidesIndexes.slice(-1)[0]
    if (slideIndex === -1) {
        return
    }

    const slidesList: Slide[] = editor.presentation.slidesList
    if (!(Array.isArray(slidesList) && slidesList.length)) {
        return
    }

    const slide: Slide = slidesList[slideIndex]
    const elementsList: SlideElement[] = slide.elementsList
    if (!(Array.isArray(elementsList) && elementsList.length)) {
        return
    }

    const newElementsList: SlideElement[] = elementsList.map((element, index) => {
        if (!editor.selectedSlideElementsIndexes.includes(index)) {
            return element
        }
    })

    const newSlide: Slide = {
        ...slide,
        elementsList: newElementsList,
    }

    return applySlideChanges(editor, newSlide, slideIndex)
}

export function changePicture(editor: Editor, src: string): Editor {
    const slideIndex: number = editor.selectedSlidesIndexes.slice(-1)[0]
    if (slideIndex === -1) {
        return
    }

    const slidesList: Slide[] = editor.presentation.slidesList
    if (!(Array.isArray(slidesList) && slidesList.length)) {
        return
    }

    const slide: Slide = slidesList[slideIndex]
    const elementsList: SlideElement[] = slide.elementsList
    if (!(Array.isArray(elementsList) && elementsList.length)) {
        return
    }

    const newElementsList: SlideElement[] = elementsList.map((element, index) => {
        if (editor.selectedSlideElementsIndexes.includes(index) && isPicture(element.content)) {
            return {
                ...element,
                content: {
                    ...element.content,
                    src,
                }
            }
        }
        return element
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
                ...editor.presentation.slidesList.slice(newSlideIndex + 1)]
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

import {Editor, FigureElement, FigureShape, PictureElement, Size, SlideElement, TextElement} from './types'
import {Presentation} from './types'
import {PresentationMode} from './types'
import {History} from './types'
import {Slide} from './types'
import {Background} from './types'

function undo(editor: Editor): void{
    if (editor.history.currState > 0) {
        editor.history.currState -= 1
    }
}

function redo(editor: Editor): void{
    if (0 <= editor.history.currState && editor.history.currState < editor.history.states.length - 1) {
        editor.history.currState += 1
    }
}

function keep(editor: Editor): void{
    editor.history.states.splice(0, editor.history.currState + 1)
    editor.history.states.push(editor.presentation)
    editor.history.currState = editor.history.states.length - 1
}

function initHistory(): History {
    return {
        states: [],
        currState: -1,
    }
}

export function addSlide(editor: Editor, slideIndex: number): Editor {
    const background: Background = {
        color: 'white',
        src: '',
    }

    const newSlide: Slide = {
        background,
        elementsList: []
    }

    const slidesList: Slide[] = [
        ...editor.presentation.slidesList.slice(0, slideIndex),
        newSlide,
        ...editor.presentation.slidesList.slice(slideIndex)
    ]

    const updatedPresentation: Presentation = {
        ...editor.presentation,
        slidesList: slidesList
    }

    return {
        ...editor,
        presentation: updatedPresentation,
        selectedSlidesIndexes: [slideIndex],
        selectedSlideElementsIndexes: []
    }
}

export function insertSelectedSlides(editor: Editor, insertPosition: number): Editor {
    const selectedSlidesIndexes: number[] = editor.selectedSlidesIndexes
    const slidesList: Slide[] = editor.presentation.slidesList

    const selectedSlides: Slide[] = slidesList.map((slide, index) => {
        if (selectedSlidesIndexes.includes(index)) {
            return slide
        }
    })

    const slidesBeforeInsertPosition: Slide[] = slidesList.slice(0, insertPosition)
    const slidesAfterInsertPosition: Slide[] = slidesList.slice(insertPosition)

    const newSlideList = [
        ...slidesBeforeInsertPosition.filter((slide, index) => !selectedSlidesIndexes.includes(index)),
        ...selectedSlides,
        ...slidesAfterInsertPosition.filter((slide, index) => !selectedSlidesIndexes.includes(index + insertPosition))
    ]

    const updatedPresentation: Presentation = {
        ...editor.presentation,
        slidesList: newSlideList,
    }

    return {
        ...editor,
        presentation: updatedPresentation,
        selectedSlidesIndexes: [insertPosition],
        selectedSlideElementsIndexes: []
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

export function deleteSelectedSlides(editor: Editor): Editor {
    const selectedSlidesIndexes: number[] = editor.selectedSlidesIndexes
    const lastSelectedSlideIndex: number = selectedSlidesIndexes[selectedSlidesIndexes.length - 1]
    const maxIndex = editor.presentation.slidesList.length
    const selectedSlideIndex = getNextUnselectedSlideIndex(lastSelectedSlideIndex, selectedSlidesIndexes, maxIndex)

    const newSlideList: Slide[] = editor.presentation.slidesList.map((slide, index) => {
        if (!selectedSlidesIndexes.includes(index)) {
            return slide
        }
    })

    const updatedPresentation = {
        ...editor.presentation,
        slidesList: newSlideList,
    }

    return {
        ...editor,
        presentation: updatedPresentation,
        selectedSlidesIndexes: [selectedSlideIndex],
        selectedSlideElementsIndexes: [],
    }
}

export function addTextElement(editor: Editor): Editor {
    const slideIndex: number = editor.selectedSlidesIndexes.slice(-1)[0]
    const slide: Slide = editor.presentation.slidesList[slideIndex]
    const textElement: TextElement = {
        content: 'Введите текст',
        fontSize: 1,
        fontColor: '#ffffff',
        fontStyle: 'italic'
    }
    const element: SlideElement = {
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

export function addPictureElement(editor: Editor): Editor {
    const slideIndex: number = editor.selectedSlidesIndexes.slice(-1)[0]
    const slide: Slide = editor.presentation.slidesList[slideIndex]
    const pictureElement: PictureElement = {
        src: ''
    }
    const element: SlideElement = {
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
        }
    }
}

export function addFigureElement(editor: Editor, figureType: FigureShape): Editor {
    const slideIndex: number = editor.selectedSlidesIndexes.slice(-1)[0]
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
        selectedSlidesIndexes: [-1],
        selectedSlideElementsIndexes: []
    }
}

export function changePresentationMode(editor: Editor, mode: PresentationMode): Editor {
    return {
        ...editor,
        mode
    }
}

function initPresentation(): Presentation {
    return {
        name: "Оладушек",
        slidesList: [],
    }
}

export function changeSlideBackground(editor: Editor, background: Background): Editor {
    const slideIndex = editor.selectedSlidesIndexes.slice(-1)[0]
    const slide = editor.presentation.slidesList[slideIndex]

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

function moveElementsToBackground(editor: Editor): Editor {
    const slideIndex = editor.selectedSlidesIndexes.slice(-1)[0]
    const slide = editor.presentation.slidesList[slideIndex]

    const newElementsList = [
        ...slide.elementsList.map((element, index) => {
            if (editor.selectedSlidesIndexes.includes(index)) {
                return element
            }
        }),
        ...slide.elementsList.map((element, index) => {
            if (!editor.selectedSlidesIndexes.includes(index)) {
                return element
            }
        })
    ]

    const newSlide = {
        ...slide,
        elementsList: newElementsList
    }

    return applySlideChanges(editor, newSlide, slideIndex)
}

function moveElementsToForeground(editor: Editor): Editor {
    const slideIndex = editor.selectedSlidesIndexes.slice(-1)[0]
    const slide = editor.presentation.slidesList[slideIndex]

    const newElementsList = [
        ...slide.elementsList.map((element, index) => {
            if (!editor.selectedSlidesIndexes.includes(index)) {
                return element
            }
        }),
        ...slide.elementsList.map((element, index) => {
            if (editor.selectedSlidesIndexes.includes(index)) {
                return element
            }
        })
    ]

    const newSlide = {
        ...slide,
        elementsList: newElementsList
    }

    return applySlideChanges(editor, newSlide, slideIndex)
}

function moveElementsForward(editor: Editor) {
    // TODO
}

function moveElementsBackward(editor: Editor) {
    // TODO
}

function changeElementsSize(editor: Editor, scale: Size): Editor {
    const slideIndex = editor.selectedSlidesIndexes.slice(-1)[0]
    const slide = editor.presentation.slidesList[slideIndex]

    const newElementsList = [
        ...slide.elementsList.map((element, index) => {
            if (editor.selectedSlideElementsIndexes.includes(index)) {
                const size = {
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
    ]

    const newSlide = {
        ...slide,
        elementsList: newElementsList,
    }

    return applySlideChanges(editor, newSlide, slideIndex)
}

function changeElementsOpacity(editor: Editor, opacity: number): Editor {
    const slideIndex = editor.selectedSlideElementsIndexes.slice(-1)[0]
    const slide = editor.presentation.slidesList[slideIndex]

    const newElementsList = [
        ...slide.elementsList.map((element, index) => {
            if (editor.selectedSlideElementsIndexes.includes(index)) {
                return {
                    ...element,
                    opacity,
                }
            }
            return element
        })
    ]

    const newSlide = {
        ...slide,
        elementsList: newElementsList
    }

    return applySlideChanges(editor, newSlide, slideIndex)
}

function changeFiguresColor(editor: Editor, color: string): Editor {
    const slideIndex = editor.selectedSlidesIndexes.slice(-1)[0]
    const slide = editor.presentation.slidesList[slideIndex]

    const newElementsList: SlideElement[] = slide.elementsList.map((element, index) => {
        if (editor.selectedSlideElementsIndexes.includes(index) && isFigure(element.content)) {
            return {
                ...element,
                content: {
                    ...(element.content),
                    color,
                }
            }
        }
        return element
    })

    const newSlide: Slide = {
        ...slide,
        elementsList: []
    }

    return applySlideChanges(editor, newSlide, slideIndex)
}

function changeTextsSize(editor: Editor, fontSize: number) {
    const slideIndex = editor.selectedSlidesIndexes.slice(-1)[0]
    const slide = editor.presentation.slidesList[slideIndex]

    const newElementsList = [
        ...slide.elementsList.map((element, index) => {
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
    ]

    const newSlide = {
        ...slide,
        elementsList: newElementsList
    }

    return applySlideChanges(editor, newSlide, slideIndex)
}

function changeTextsColor(editor: Editor, fontColor: string): Editor {
    const slideIndex: number = editor.selectedSlidesIndexes.slice(-1)[0]
    const slide: Slide = editor.presentation.slidesList[slideIndex]

    const newElementsList: SlideElement[] = [
        ...slide.elementsList.map((element, index) => {
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
    ]

    const newSlide: Slide = {
        ...slide,
        elementsList: newElementsList
    }

    return applySlideChanges(editor, newSlide, slideIndex)
}

export function removeSelectedElements(editor: Editor): Editor {
    const slideIndex: number = editor.selectedSlidesIndexes.slice(-1)[0]
    const slide: Slide = editor.presentation.slidesList[slideIndex]

    const newElementsList: SlideElement[] = slide.elementsList.map((element, index) => {
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
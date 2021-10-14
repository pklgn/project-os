import { Editor, SlideElement } from './types'
import { Presentation } from './types'
import { PresentationMode } from './types'
import { History } from './types'
import { Slide } from './types'
import { Background } from './types'
import { Size } from './types'
import { FigureElement } from './types'
import { TextElement } from './types'
import { PictureElement } from './types'

export function initEditor(): Editor {
    return {
        mode: "edit",
        presentation: {
            name: 'СладушкиОладушки',
            slidesList: [],
        },
        history: {
            currState: -1,
            states: [],
        },
        selectedSlideIndexes: [-1],
        selectedElementIndexes: []
    }
}

function changeMode(editor: Editor, mode: PresentationMode): Editor {
    return {
        ...editor,
        mode
    }
}

function insertEmptySlide(editor: Editor, slideIndex: number): Editor {
    const background: Background = {
        color: '#ffffff',
        src: '',
    }

    const emptySlide: Slide = {
        background,
        elementsList: [],
    }

    const slideList: Slide[] = [
        ...editor.presentation.slidesList.slice(0, slideIndex),
        emptySlide,
        ...editor.presentation.slidesList.slice(slideIndex),
    ]

    const updatedPresentation: Presentation = {
        ...editor.presentation,
        slidesList: slideList,
    }

    const updatedEditor: Editor = {
        ...editor,
        presentation: updatedPresentation,
        selectedSlideIndexes: [slideIndex],
        selectedElementIndexes: [],
    }

    return {
        ...editor,
        presentation: updatedPresentation,
        history: {
            states: [
                ...editor.history.states.slice(0, editor.history.currState + 1),
                updatedEditor,
            ],
            currState: editor.history.currState + 1,
        },
        selectedSlideIndexes: [slideIndex],
        selectedElementIndexes: [],
    }
}

function copySlides(editor: Editor, slideIndexes: number[], insertIndex: number): Editor {
    const newSlides: Slide[] =
        editor.presentation.slidesList.map((slide: Slide, slideIndex: number) => {
            if (slideIndexes.includes(slideIndex)) {
                return slide
            }
        })

    const slideList: Slide[] = [
        ...editor.presentation.slidesList.slice(0, insertIndex),
        ...newSlides,
        ...editor.presentation.slidesList.slice(insertIndex),
    ]

    const updatedPresentation: Presentation = {
        ...editor.presentation,
        slidesList: slideList,
    }

    const selectedSlideIndexes = []
    var index = insertIndex
    newSlides.forEach((slide) => {
        selectedSlideIndexes.push(index)
        index++
    })

    const updatedEditor: Editor = {
        ...editor,
        presentation: updatedPresentation,
        selectedSlideIndexes: selectedSlideIndexes,
        selectedElementIndexes: [],
    }

    return {
        ...editor,
        presentation: updatedPresentation,
        history: {
            states: [
                ...editor.history.states.slice(0, editor.history.currState + 1),
                updatedEditor,
            ],
            currState: editor.history.currState + 1,
        },
        selectedSlideIndexes: selectedSlideIndexes,
        selectedElementIndexes: [],
    }
}

function deleteSelectedSlides(editor: Editor, selectedSlideIndexes: number[]): Editor {
    const slideList: Slide[] = editor.presentation.slidesList.map((slide: Slide, index: number) => {
        if (!selectedSlideIndexes.includes(index)) {
            return slide
        }
    })

    const selectedSlide: number = selectNearestUnselectedSlide(editor)

    const updatedPresentation: Presentation = {
        ...editor.presentation,
        slidesList: slideList,
    }

    const updatedEditor: Editor = {
        ...editor,
        presentation: updatedPresentation,
        selectedSlideIndexes: [selectedSlide],
        selectedElementIndexes: [],
    }

    return {
        ...editor,
        presentation: updatedPresentation,
        history: {
            states: [
                ...editor.history.states.slice(0, editor.history.currState + 1),
                updatedEditor,
            ],
            currState: editor.history.currState + 1,
        },
        selectedSlideIndexes: [selectedSlide],
        selectedElementIndexes: [],
    }
}

function selectNearestUnselectedSlide(editor: Editor): number {
    let currSlidesIndexes: number[] = []
    const slidesAmount: number = editor.presentation.slidesList.length
    for (let i = 0; i < slidesAmount; i++) {
        currSlidesIndexes.push(i)
    }

    const unselectedSlidesIndexes: number[] = currSlidesIndexes.map((index: number) => {
        if (!editor.selectedSlideIndexes.includes(index)) {
            return index
        }
    })

    if (unselectedSlidesIndexes == []) {
        return -1
    }
    else {
        const lastSelectedSlideIndex: number = editor.selectedSlideIndexes.slice(-1)[0]
        for (let i = lastSelectedSlideIndex; i < currSlidesIndexes.length; ++i) {
            if (unselectedSlidesIndexes.includes(i)) {
                return i
            }
        }
        for (let i = lastSelectedSlideIndex; i >= 0; i--) {
            if (unselectedSlidesIndexes.includes(i)) {
                return i
            }
        }
    }
}

function replaceSlides(editor: Editor, slideIndexes: number[], position: number): Editor {
    const slideList: Slide[] = [
        ...editor.presentation.slidesList.slice(0, position).map((slide: Slide, index: number) => {
            if (!slideIndexes.includes(index)) {
                return slide
            }
        }),
        ...editor.presentation.slidesList.map((slide: Slide, index: number) => {
            if (slideIndexes.includes(index)) {
                return slide
            }
        }),
        ...editor.presentation.slidesList.slice(position).map((slide: Slide, index: number) => {
            if (!slideIndexes.includes(index)) {
                return slide
            }
        })
    ]

    const newSlideIndexes: number[] = slideIndexes.map((element: number, index: number) => {
        return position + index
    })

    const updatedPresentation: Presentation = {
        ...editor.presentation,
        slidesList: slideList,
    }

    const updatedEditor: Editor = {
        ...editor,
        presentation: updatedPresentation,
        selectedSlideIndexes: newSlideIndexes,
        selectedElementIndexes: [],
    }

    return {
        ...editor,
        presentation: updatedPresentation,
        history: {
            states: [
                ...editor.history.states.slice(0, editor.history.currState + 1),
                updatedEditor,
            ],
            currState: editor.history.currState + 1,
        },
        selectedSlideIndexes: newSlideIndexes,
        selectedElementIndexes: [],
    }
}

function addElement(editor: Editor, element: SlideElement) {
    const slideIndex = editor.selectedSlideIndexes.slice(-1)[0]
    const slide = editor.presentation.slidesList[slideIndex]

    const newElementsList: SlideElement[] = [
        ...slide.elementsList,
        element
    ]

    const newSlide = {
        ...slide,
        elementsList: newElementsList
    }
    return newEditor(editor, newSlide, slideIndex)
}

function changeSlideBackground(editor: Editor, background: Background): Editor {
    const slideIndex = editor.selectedSlideIndexes.slice(-1)[0]
    const slide = editor.presentation.slidesList[slideIndex]

    const newSlide: Slide = {
        ...slide,
        background,
    }

    return newEditor(editor, newSlide, slideIndex)
}

function updatePresentationName(presentation: Presentation, name: string): Presentation {
    return {
        ...presentation,
        name,
    }
}















function moveElementsToBackground(editor: Editor) {
    const slideIndex = editor.selectedSlideIndexes.slice(-1)[0]
    const slide = editor.presentation.slidesList[slideIndex]

    const newElementsList = [
        ...slide.elementsList.map((element, index) => {
            if (editor.selectedSlideIndexes.includes(index)) return element
        }),
        ...slide.elementsList.map((element, index) => {
            if (!editor.selectedSlideIndexes.includes(index)) return element
        })
    ]

    const newSlide = {
        ...slide,
        elementsList: newElementsList
    }

    return newEditor(editor, newSlide, slideIndex)
}

function moveElementsToForeground(editor: Editor) {
    const slideIndex = editor.selectedSlideIndexes.slice(-1)[0]
    const slide = editor.presentation.slidesList[slideIndex]

    const newElementsList = [
        ...slide.elementsList.map((element, index) => {
            if (!editor.selectedSlideIndexes.includes(index)) return element
        }),
        ...slide.elementsList.map((element, index) => {
            if (editor.selectedSlideIndexes.includes(index)) return element
        })
    ]

    const newSlide = {
        ...slide,
        elementsList: newElementsList
    }

    return newEditor(editor, newSlide, slideIndex)
}

function moveElementsForward(editor: Editor) {
    // TODO
}

function moveElementsBackward(editor: Editor) {
    // TODO
}

function changeElementsSize(editor: Editor, scale: number[]) {
    const slideIndex = editor.selectedSlideIndexes.slice(-1)[0]
    const slide = editor.presentation.slidesList[slideIndex]

    const newElementsList = [
        ...slide.elementsList.map((element, index) => {
            if (editor.selectedElementIndexes.includes(index)) {
                const size = {
                    width: element.size.width * scale[0],
                    height: element.size.height * scale[1]
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
        elementsList: newElementsList
    }

    return newEditor(editor, newSlide, slideIndex)
}

function changeElementsOpacity(editor: Editor, opacity: number) {
    const slideIndex = editor.selectedSlideIndexes.slice(-1)[0]
    const slide = editor.presentation.slidesList[slideIndex]

    const newElementsList = [
        ...slide.elementsList.map((element, index) => {
            if (editor.selectedElementIndexes.includes(index)) {
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

    return newEditor(editor, newSlide, slideIndex)
}

function changeFiguresColor(editor: Editor, color: string) {
    const slideIndex = editor.selectedSlideIndexes.slice(-1)[0]
    const slide = editor.presentation.slidesList[slideIndex]

    const newElementsList = [
        ...slide.elementsList.map((element, index) => {
            if (editor.selectedElementIndexes.includes(index)) {
                return {
                    ...element,
                    content:  
                }
            }
            return element
        })
    ]

    const newSlide = {
        ...slide,
        elementsList: newElementsList
    }

    return newEditor(editor, newSlide, slideIndex)
}

function changeTextsSize(editor, slide, element, fontSize) {
    const slideIndex = editor.selectedSlideIndexes.slice(-1)[0]
    const slide = editor.presentation.slidesList[slideIndex]

    const newElementsList = [
        ...slide.elementsList.map((element, index) => {
            if (editor.selectedElementIndexes.includes(index)) {
                return {
                    ...element,
                    content:  
                }
            }
            return element
        })
    ]

    const newSlide = {
        ...slide,
        elementsList: newElementsList
    }

    return newEditor(editor, newSlide, slideIndex)
}

function changeTextsColor(editor: Editor, fontcolor: string) {
    const slideIndex = editor.selectedSlideIndexes.slice(-1)[0]
    const slide = editor.presentation.slidesList[slideIndex]

    const newElementsList = [
        ...slide.elementsList.map((element, index) => {
            if (editor.selectedElementIndexes.includes(index)) {
                return {
                    ...element,
                    content:  
                }
            }
            return element
        })
    ]

    const newSlide = {
        ...slide,
        elementsList: newElementsList
    }

    return newEditor(editor, newSlide, slideIndex)
}


function newEditor(editor: Editor, newSlide: Slide, newSlideIndex: number): Editor {
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

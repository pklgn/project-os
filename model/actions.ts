import {Editor, SlideElement} from './types'
import {Presentation} from './types'
import {PresentationMode} from './types'
import {History} from './types'
import {Slide} from './types'
import {Background} from './types'
import {Size} from './types'
import {FigureElement} from './types'
import {TextElement} from './types'
import {PictureElement} from './types'

function undo(editor: Editor): void{
}

function redo(editor: Editor): void{
}

function keep(editor: Editor): void{
    
}

function initHistory(): History {
    return {
        states: [],
        currState: -1,
    }
}

function addSlide(editor: Editor, slideIndex: number): Editor {
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
        selectedSlideIndexes: [slideIndex],
        selectedElementIndexes: []
    }
}

function insertSlide(editor: Editor, newSlide: Slide, slideIndex: number): Editor {
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
        selectedSlideIndexes: [slideIndex],
        selectedElementIndexes: []
    }
}

function deleteSlide(editor: Editor, slideIndex: number): Editor {
    const slideList = [ ...editor.presentation.slidesList.slice(0, slideIndex),
                        ...editor.presentation.slidesList.slice(slideIndex + 1)]

    const updatedPresentation = updatePresentationSlideList(editor.presentation, slideList)

    return {
        ...editor,
        presentation: updatedPresentation,
        selectedSlideIndexes: [slideIndex],
        selectedElementIndexes: []
    }
}

function removeSelectedSlides(editor: Editor): Editor {
    const slidesIndexesToRemove = editor.selectedSlideIndexes
    const slideList = editor.presentation.slidesList.map((element, index) => {
        if (!slidesIndexesToRemove.includes(index)) {
            return element
        }
    })

    const selectedSlide = selectSlide(editor)

    return {
        ...setSelectedSlideIndexes(editor, selectedSlide),
        presentation: updatePresentationSlideList(editor.presentation, slideList)
    }
}

function replaceSlides(editor: Editor, position: number): Editor {
    const slidesList = [
        ...editor.presentation.slidesList.slice(0, position).map((element, index) => {
            if (!editor.selectedSlideIndexes.includes(index)) return element 
        }),
        ...editor.presentation.slidesList.map((element, index) => {
            if (editor.selectedSlideIndexes.includes(index)) return element 
        }),
        ...editor.presentation.slidesList.slice(position).map((element, index) => {
            if (!editor.selectedSlideIndexes.includes(index)) return element 
        })
    ]
    const newSlideIndexes = editor.selectedSlideIndexes.map((element, index) => {
        return position + index
    })
    
    return {
        ...setSelectedSlideIndexes(editor, newSlideIndexes),
        presentation: updatePresentationSlideList(editor.presentation, slidesList)
    }
}

function selectSlide(editor: Editor): number[] {
    let currSlidesIndexes = []
    const slidesAmount = editor.presentation.slidesList.length
    for (let i = 0; i < slidesAmount; ++i) {
        currSlidesIndexes.push(i)
    }

    const unselectedSlidesIndexes = currSlidesIndexes.map((element) => {
        if (!editor.selectedSlideIndexes.includes(element)) {
            return element
        }
    })

    if (!unselectedSlidesIndexes) {
        return [-1]
    }
    else {
        const lastSelectedSlideIndex = editor.selectedSlideIndexes.slice(-1)[0]
        for (let i = lastSelectedSlideIndex; i < currSlidesIndexes.length; ++i){
            if (unselectedSlidesIndexes.includes(i)) {
                return [i]
            }
        }
        for (let i = lastSelectedSlideIndex; i >= 0; --i){
            if (unselectedSlidesIndexes.includes(i)) {
                return [i]
            }
        }
    }
}

function setSelectedSlideIndexes(editor, selectedSlideIndexes): Editor {
    return {
        ...editor,
        selectedSlideIndexes,
    }    
}

function updatePresentationSlideList(presentation, slidesList): Presentation {
    return {
        ...presentation,
        slidesList,    
    }
}
//TODO or history

function addElement(editor: Editor, element: SlideElement): Editor {
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

function removeElements(editor: Editor): Editor {
    const slideIndex = editor.selectedSlideIndexes.slice(-1)[0]
    const slide = editor.presentation.slidesList[slideIndex]
    
    const newElementsList: SlideElement[] = [
        ...slide.elementsList.map((element, index) =>{
            if (!editor.selectedElementIndexes.includes(index)){
                return element
            }
        })
    ]

    const newSlide = {
        ...slide,
        elementsList: newElementsList
    }
    return newEditor(editor, newSlide, slideIndex)
}

function initEditor(): Editor {
    return {
        mode: "edit",
        presentation: initPresentation(),
        history: initHistory(),
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


function initPresentation(): Presentation {
    return {
        name: "Оладушек",
        slidesList: [],
    }
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

function moveElementsToBackground(editor: Editor): Editor {
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

function moveElementsToForeground(editor: Editor): Editor {
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

function moveElementsForward(editor: Editor): Editor {
    // TODO
}

function moveElementsBackward(editor: Editor): Editor {
    // TODO
}

function changeElementsSize(editor: Editor, scale: number[]): Editor {
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

function changeElementsOpacity(editor: Editor, opacity: number): Editor {
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

function changeFiguresColor(editor: Editor, color: string): Editor {
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

function changeTextsSize(editor: Editor, fontSize: number) {
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

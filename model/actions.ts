import {Editor, FigureElement, PictureElement, SlideElement, TextElement} from './types'
import {Presentation} from './types'
import {PresentationMode} from './types'
import {History} from './types'
import {Slide} from './types'
import {Background} from './types'

function undo(editor: Editor): void{
}

function redo(editor: Editor): void{
}

function keep(editor: Editor): void{
    
}

//const s = JSON.parse(JSON.stringify(state))

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
        selectedSlidesIndexes: [slideIndex],
        selectedSlideElementsIndexes: []
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
        selectedSlidesIndexes: [slideIndex],
        selectedSlideElementsIndexes: []
    }
}

function deleteSlide(editor: Editor, slideIndex: number): Editor {
    const slideList = [ ...editor.presentation.slidesList.slice(0, slideIndex),
                        ...editor.presentation.slidesList.slice(slideIndex + 1)]

    const updatedPresentation = updatePresentationSlideList(editor.presentation, slideList)

    return {
        ...editor,
        presentation: updatedPresentation,
        selectedSlidesIndexes: [slideIndex],
        selectedSlideElementsIndexes: []
    }
}

function removeSelectedSlides(editor: Editor): Editor {
    const slidesIndexesToRemove = editor.selectedSlidesIndexes
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
            if (!editor.selectedSlidesIndexes.includes(index)) return element
        }),
        ...editor.presentation.slidesList.map((element, index) => {
            if (editor.selectedSlidesIndexes.includes(index)) return element
        }),
        ...editor.presentation.slidesList.slice(position).map((element, index) => {
            if (!editor.selectedSlidesIndexes.includes(index)) return element
        })
    ]
    const newSlideIndexes = editor.selectedSlidesIndexes.map((element, index) => {
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
        if (!editor.selectedSlidesIndexes.includes(element)) {
            return element
        }
    })

    if (!unselectedSlidesIndexes) {
        return [-1]
    }
    else {
        const lastSelectedSlideIndex = editor.selectedSlidesIndexes.slice(-1)[0]
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
    const slideIndex = editor.selectedSlidesIndexes.slice(-1)[0]
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
    const slideIndex = editor.selectedSlidesIndexes.slice(-1)[0]
    const slide = editor.presentation.slidesList[slideIndex]
    
    const newElementsList: SlideElement[] = [
        ...slide.elementsList.map((element, index) =>{
            if (!editor.selectedSlidesIndexes.includes(index)){
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
        selectedSlidesIndexes: [-1],
        selectedSlideElementsIndexes: []
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
    const slideIndex = editor.selectedSlidesIndexes.slice(-1)[0]
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
    const slideIndex = editor.selectedSlidesIndexes.slice(-1)[0]
    const slide = editor.presentation.slidesList[slideIndex]

    const newElementsList = [
        ...slide.elementsList.map((element, index) => {
            if (editor.selectedSlidesIndexes.includes(index)) return element
        }),
        ...slide.elementsList.map((element, index) => {
            if (!editor.selectedSlidesIndexes.includes(index)) return element
        })
    ]

    const newSlide = {
        ...slide,
        elementsList: newElementsList
    }

    return newEditor(editor, newSlide, slideIndex)
}

function moveElementsToForeground(editor: Editor): Editor {
    const slideIndex = editor.selectedSlidesIndexes.slice(-1)[0]
    const slide = editor.presentation.slidesList[slideIndex]

    const newElementsList = [
        ...slide.elementsList.map((element, index) => {
            if (!editor.selectedSlidesIndexes.includes(index)) return element
        }),
        ...slide.elementsList.map((element, index) => {
            if (editor.selectedSlidesIndexes.includes(index)) return element
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

function changeElementsSize(editor: Editor, scale: number[]): Editor {
    const slideIndex = editor.selectedSlidesIndexes.slice(-1)[0]
    const slide = editor.presentation.slidesList[slideIndex]

    const newElementsList = [
        ...slide.elementsList.map((element, index) => {
            if (editor.selectedSlideElementsIndexes.includes(index)) {
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

    return newEditor(editor, newSlide, slideIndex)
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

    return newEditor(editor, newSlide, slideIndex)
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

    return newEditor(editor, newSlide, slideIndex)
}

function changeTextsColor(editor: Editor, fontColor: string): Editor {
    const slideIndex = editor.selectedSlidesIndexes.slice(-1)[0]
    const slide = editor.presentation.slidesList[slideIndex]

    const newElementsList = [
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

function isText(element): element is TextElement {
    return element.fontSize !== undefined
}

function isFigure(element): element is FigureElement {
    return element.figureType !== undefined
}

function isPicture(element): element is PictureElement {
    return element.src !== undefined
}
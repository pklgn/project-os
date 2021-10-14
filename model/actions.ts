import {Editor, SlideElement} from './types'
import {Presentation} from './types'
import {PresentationMode} from './types'
import {History} from './types'
import {Slide} from './types'
import {Background} from './types'

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

    editor.history.states.push(updatedPresentation)
    editor.history.currState = editor.history.states.length - 1

    return {
        ...editor,
        presentation: updatedPresentation,
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
        selectedSlideIndexes: [slideIndex]
    }
}

function deleteSlide(editor: Editor, slideIndex: number): Editor {
    const slideList = [ ...editor.presentation.slidesList.slice(0, slideIndex),
                        ...editor.presentation.slidesList.slice(slideIndex + 1)]

    const updatedPresentation = updatePresentationSlideList(editor.presentation, slideList)

    return {
        ...editor,
        presentation: updatedPresentation,
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

function setSelectedSlideIndexes(editor, selectedSlideIndexes) {
    return {
        ...editor,
        selectedSlideIndexes,
    }    
}

function updatePresentationSlideList(presentation, slidesList) {
    return {
        ...presentation,
        slidesList,    
    }
}
//TODO or history

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

function initEditor(): Editor {
    return {
        mode: "edit",
        presentation: initPresentation(),
        history: initHistory(),
        selectedSlideIndexes: [-1],
        selectedElementIndexes: []
    }
}

function initHistory(): History {
    return {
        states: [],
        currState: -1,
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




















function changeElementLayoutIndex(editor, slide, element, newIndex) {
    const slideIndex = editor.presentation.slidesList.indexOf(slide)
    const elementIndex = editor.presentation.slidesList[slideIndex].indexOf(element)
    const newElementsList = (elementIndex > newIndex)
        ? [
            ...editor.presentation.slidesList[slideIndex].elementsList.slice(0, newIndex),
            element,
            ...editor.presentation.slidesList[slideIndex].elementsList.slice(newIndex, elementIndex),
            ...editor.presentation.slidesList[slideIndex].elementsList.slice(elementIndex+1)
        ]
        : [
            ...editor.presentation.slidesList[slideIndex].elementsList.slice(0, elementIndex),
            ...editor.presentation.slidesList[slideIndex].elementsList.slice(elementIndex+1, newIndex),
            element,
            ...editor.presentation.slidesList[slideIndex].elementsList.slice(newIndex)
        ]
    const newSlide = {
        ...slide,
        elementsList: newElementsList
    }

    return newEditor(editor, newSlide, slideIndex)
}

/**
 * @param {Editor} editor
 * @param {Slide} slide
 * @param {SlideElement} element
 * @param {Size} size
 * @returns {Editor}
 */
function changeElementSize(editor, slide, element, size) {
    const slideIndex = editor.presentation.slidesList.indexOf(slide)
    const elementIndex = editor.presentation.slidesList[slideIndex].indexOf(element)
    const newElement = {
        ...element,
        size,
    }
    const newElementsList = [
        ...editor.presentation.slidesList[slideIndex].elementsList.slice(0, elementIndex),
        newElement,
        ...editor.presentation.slidesList[slideIndex].elementsList.slice(elementIndex+1)
    ]

    const newSlide = {
        ...slide,
        elementsList: newElementsList
    }

    return newEditor(editor, newSlide, slideIndex)
}

/**
 * @param {Editor} editor
 * @param {Slide} slide
 * @param {SlideElement} element
 * @param {number} opacity
 * @returns {Editor}
 */
function changeElementOpacity(editor, slide, element, opacity) {
    const slideIndex = editor.presentation.slidesList.indexOf(slide)
    const elementIndex = editor.presentation.slidesList[slideIndex].indexOf(element)
    const newElement = {
        ...element,
        opacity: opacity
    }

    const newElementsList = [
        ...editor.presentation.slidesList[slideIndex].elementsList.slice(0, elementIndex),
        newElement,
        ...editor.presentation.slidesList[slideIndex].elementsList.slice(elementIndex+1)
    ]
    
    const newSlide = {
        ...slide,
        elementsList: newElementsList
    }

    return newEditor(editor, newSlide, slideIndex)
}

/**
 * @param {Editor} editor
 * @param {Slide} slide
 * @param {SlideElement} element
 * @param {Color} color
 * @returns {Editor}
 */
function changeFigureColor(editor, slide, element, color) {
    const slideIndex = editor.presentation.slidesList.indexOf(slide)
    const elementIndex = editor.presentation.slidesList[slideIndex].indexOf(element)

    const newElement = {
        ...element,
        content: {
            ...element.content,
            color,
        },
    }

    const newElementsList = [
        ...editor.presentation.slidesList[slideIndex].elementsList.slice(0, elementIndex),
        newElement,
        ...editor.presentation.slidesList[slideIndex].elementsList.slice(elementIndex+1)
    ]
    
    const newSlide = {
        ...slide,
        elementsList: newElementsList
    }

    return newEditor(editor, newSlide, slideIndex)
}

/**
 * @param {Editor} editor
 * @param {Slide} slide
 * @param {SlideElement} element
 * @param {number} fontSize
 * @returns {Editor}
 */
function changeTextSize(editor, slide, element, fontSize) {
    const slideIndex = editor.presentation.slidesList.indexOf(slide)
    const elementIndex = editor.presentation.slidesList[slideIndex].indexOf(element)

    const newElement = {
        ...element,
        fontSize,
    }

    const newElementsList = [
        ...editor.presentation.slidesList[slideIndex].elementsList.slice(0, elementIndex),
        newElement,
        ...editor.presentation.slidesList[slideIndex].elementsList.slice(elementIndex+1)
    ]
    
    const newSlide = {
        ...slide,
        elementsList: newElementsList
    }

    return newEditor(editor, newSlide, slideIndex)
}

/**
 * @param {Editor} editor
 * @param {Slide} slide
 * @param {SlideElement} element
 * @param {Color} color
 * @returns {Editor}
 */
function changeTextColor(editor, slide, element, color) {
    const elementIndex = slide.elementsList.indexOf(element)
    const newElement = {
        ...element,
        content: {
            ...element.content,
            fontColor: color
        }
    }
    const newElementsList = [
        ...slide.elementsList.slice(0, elementIndex),
        newElement,
        ...slide.elementsList.slice(elementIndex+1)
    ]
    const newSlide = {
        ...slide,
        elementsList: newElementsList
    }
    const slideIndex = editor.presentation.slideList.indexOf(slide)

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
                ...editor.presentation.slidesList.slice(newSlideIndex)]
        }
    }
}

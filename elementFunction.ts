import {
    Editor, Presentation, Slide,
    SlideElement, Size,
    TextElement, PictureElement,
    FigureElement, Coordinates,
} from './model/types'
import { insertSlide } from './presentationFunction'

const defaultParams = {
    //TODO реализовать типы полей
    SIZE: {
        //TODO подставлять нормальные значения
        width: 1,
        height: 1,
    },
    OPACITY: 1,
    START_POINT: {
        //TODO подставлять нормальные значения
        x: 1,
        y: 1,
    }
}

export function addElement(editor: Editor, slide: Slide, content: TextElement | PictureElement | FigureElement): Presentation {
    const slideIndex: number = editor.presentation.slidesList.indexOf(slide)

    const newElementsList: SlideElement[] = [
        ...slide.elementsList,
        {
            size: defaultParams.SIZE,
            opacity: defaultParams.OPACITY,
            content,
            startPoint: defaultParams.START_POINT,
        },
    ]

    const newSlide: Slide = {
        ...slide,
        elementsList: newElementsList,
        selectedElementIndexes: [slide.elementsList.length],
    }

    const updatedPresentation: Presentation = insertSlide(editor, newSlide, slideIndex)

    editor.history.states.push(updatedPresentation)
    editor.history.currState = editor.history.states.length - 1

    return updatedPresentation
}

export function removeElements(editor: Editor, slide: Slide, elements: SlideElement[]): Presentation {
    const slideIndex: number = editor.presentation.slidesList.indexOf(slide)

    const newElementsList: SlideElement[] = editor.presentation.slidesList[slideIndex].elementsList.map((element) => {
        if (!elements.includes(element)) {
            return element
        }
    })

    const newSlide: Slide = {
        ...slide,
        elementsList: newElementsList,
        selectedElementIndexes: [-1]
    }

    const updatedPresentation: Presentation = insertSlide(editor, newSlide, slideIndex)

    editor.history.states.push(updatedPresentation)
    editor.history.currState = editor.history.states.length - 1

    return updatedPresentation
}

export function changeElementsLayoutIndex(editor: Editor, slide: Slide, elements: SlideElement[], newIndex: number): Presentation {
    const slideIndex: number = editor.presentation.slidesList.indexOf(slide)

    const elementIndexesToReplace: number[] = editor.presentation.slidesList[slideIndex].elementsList.map((element, index) => {
        if (elements.includes(element)) {
            return index
        }
    })

    /** @type {SlideElement[]}*/
    const newElementsList: SlideElement[] = [
        ...editor.presentation.slidesList[slideIndex].elementsList.slice(0, newIndex).map((element, index) => {
            if (!elementIndexesToReplace.includes(index)) {
                return element
            }
        }),
        ...elements,
        ...editor.presentation.slidesList[slideIndex].elementsList.slice(newIndex).map((element, index) => {
            if (!elementIndexesToReplace.includes(index)) {
                return element
            }
        })
    ]

    const newSelectedElementIndexes: number[] = newElementsList.map((element, index) => {
        if (elements.includes(element)) {
            return index
        }
    })

    const newSlide: Slide = {
        ...slide,
        elementsList: newElementsList,
        selectedElementIndexes: newSelectedElementIndexes,
    }

    const updatedPresentation: Presentation = insertSlide(editor, newSlide, slideIndex)

    editor.history.states.push(updatedPresentation)
    editor.history.currState = editor.history.states.length - 1

    return updatedPresentation
}

export function changeElementsPosition(editor: Editor, slide: Slide, elements: SlideElement[], newPosition: Coordinates): Presentation {
    const slideIndex: number = editor.presentation.slidesList.indexOf(slide)

    const newElementsList: SlideElement[] =
        editor.presentation.slidesList[slideIndex].elementsList.map((element) => {
            if (elements.includes(element)) {
                return {
                    ...element,
                    startPoint: newPosition
                }
            } else {
                return element
            }
        })

    const newSelectedElementIndexes: number[] = newElementsList.map((element, index) => {
        if (elements.includes(element)) {
            return index
        }
    })

    const newSlide: Slide = {
        ...slide,
        elementsList: newElementsList,
        selectedElementIndexes: newSelectedElementIndexes,
    }

    const updatedPresentation: Presentation = insertSlide(editor, newSlide, slideIndex)

    editor.history.states.push(updatedPresentation)
    editor.history.currState = editor.history.states.length - 1

    return updatedPresentation
}

/**
 * @param {Editor} editor
 * @param {Slide} slide
 * @param {SlideElement[]} elements
 * @param {Size[]} size - [{width, height},] - соответственно элементам в elements
 * @returns {Presentation}
 */
export function changeElementsSize(editor: Editor, slide: Slide, elements: SlideElement[], size: Size[]) {
    const slideIndex: number = editor.presentation.slidesList.indexOf(slide)

    let sizeIndex: number

    const newElementsList: SlideElement[] = editor.presentation.slidesList[slideIndex].elementsList.map((element) => {
        sizeIndex = elements.indexOf(element)
        if (sizeIndex !== -1) {
            return {
                ...element,
                size: size[sizeIndex],
            }
        } else {
            return element
        }
    })

    const newSelectedElementIndexes: number[] = newElementsList.map((element, index) => {
        if (elements.includes(element)) {
            return index
        }
    })

    const newSlide: Slide = {
        ...slide,
        elementsList: newElementsList,
        selectedElementIndexes: newSelectedElementIndexes,
    }

    const updatedPresentation: Presentation = insertSlide(editor, newSlide, slideIndex)

    editor.history.states.push(updatedPresentation)
    editor.history.currState = editor.history.states.length - 1

    return updatedPresentation
}

export function changeElementsOpacity(editor: Editor, slide: Slide, elements: SlideElement[], opacities: number[]): Presentation {
    const slideIndex: number = editor.presentation.slidesList.indexOf(slide)

    let opacityIndex: number

    const newElementsList: SlideElement[] = editor.presentation.slidesList[slideIndex].elementsList.map((element) => {
        opacityIndex = elements.indexOf(element)
        if (opacityIndex !== -1) {
            return {
                ...element,
                opacity: opacities[opacityIndex],
            }
        } else {
            return element
        }
    })

    const newSelectedElementIndexes: number[] = newElementsList.map((element, index) => {
        if (elements.includes(element)) {
            return index
        }
    })

    const newSlide: Slide = {
        ...slide,
        elementsList: newElementsList,
        selectedElementIndexes: newSelectedElementIndexes,
    }

    const updatedPresentation: Presentation = insertSlide(editor, newSlide, slideIndex)

    editor.history.states.push(updatedPresentation)
    editor.history.currState = editor.history.states.length - 1

    return updatedPresentation
}

export function changeFigureColor(editor: Editor, slide: Slide, elements: SlideElement[], colors: string[]): Presentation {
    const slideIndex: number = editor.presentation.slidesList.indexOf(slide)

    let colorIndex: number

    const newElementsList: SlideElement[] = editor.presentation.slidesList[slideIndex].elementsList.map((element) => {
        colorIndex = elements.indexOf(element)
        if (colorIndex !== -1) {
            return {
                ...element,
                color: colors[colorIndex],
            }
        } else {
            return element
        }
    })

    const newSelectedElementIndexes: number[] = newElementsList.map((element, index) => {
        if (elements.includes(element)) {
            return index
        }
    })

    const newSlide: Slide = {
        ...slide,
        elementsList: newElementsList,
        selectedElementIndexes: newSelectedElementIndexes,
    }

    const updatedPresentation: Presentation = insertSlide(editor, newSlide, slideIndex)

    editor.history.states.push(updatedPresentation)
    editor.history.currState = editor.history.states.length - 1

    return updatedPresentation
}

export function changeTextColor(editor: Editor, slide: Slide, element: SlideElement, color: string): Presentation {
    const elementIndex: number = slide.elementsList.indexOf(element)

    //TODO продолжение проблемы с типами
    const newElement: SlideElement = {
        ...element,
        content: {
            ...element.content,
            fontColor: color
        }
    }

    const newElementsList: SlideElement[] = [
        ...slide.elementsList.slice(0, elementIndex),
        newElement,
        ...slide.elementsList.slice(elementIndex + 1)
    ]

    const newSlide: Slide = {
        ...slide,
        elementsList: newElementsList,
        selectedElementIndexes: [elementIndex],
    }

    const slideIndex: number = editor.presentation.slidesList.indexOf(slide)

    const updatedPresentation: Presentation = insertSlide(editor, newSlide, slideIndex)

    editor.history.states.push(updatedPresentation)
    editor.history.currState = editor.history.states.length - 1

    return updatedPresentation
}

export function changeTextElementsSize(editor: Editor, fontSize: number): Editor {
    const selectedSlideElementsIndexes: number[] = editor.selectedSlideElementsIndexes
    const slideIndex: number = editor.selectedSlidesIndexes[editor.selectedSlidesIndexes.length - 1]
    const slide: Slide = editor.presentation.slidesList[slideIndex]
    const slideElements: SlideElement[] = slide.elementsList

    const newSlideElements: SlideElement[] = slideElements.map((element, index) => {
        return selectedSlideElementsIndexes.includes(index)
            ? {
                ...element,
                content: {
                    ...element.content,
                    fontSize
                }
            }
            : element
    })

    const newSlide: Slide = {
        ...slide,
        elementsList: newSlideElements,
    }

    const updatedPresentation: Presentation = insertSlide(editor, newSlide, slideIndex)

    editor.history.states.push(updatedPresentation)
    editor.history.currState = editor.history.states.length - 1

    return {
        ...editor,
        presentation: updatedPresentation,
    }
}

/**
 * @param {Editor} editor
 * @param {Slide} slide
 * @param {SlideElement} element
 * @param {string} content
 * @returns {Presentation}
 */
export function changeTextContent(editor: Editor, slide: Slide, element: SlideElement, content: string) {
    const slideIndex: number = editor.presentation.slidesList.indexOf(slide)

    const elementIndex: number = editor.presentation.slidesList[slideIndex].elementsList.indexOf(element)

    //TODO продолжение проблемы c типами
    const newElement: SlideElement = {
        ...element,
        content: {
            ...element.content,
            content,
        },
    }

    const newElementsList: SlideElement[] = [
        ...editor.presentation.slidesList[slideIndex].elementsList.slice(0, elementIndex),
        newElement,
        ...editor.presentation.slidesList[slideIndex].elementsList.slice(elementIndex + 1)
    ]

    const newSlide: Slide = {
        ...slide,
        elementsList: newElementsList,
        selectedElementIndexes: [elementIndex],
    }

    const updatedPresentation: Presentation = insertSlide(editor, newSlide, slideIndex)

    editor.history.states.push(updatedPresentation)
    editor.history.currState = editor.history.states.length - 1

    return updatedPresentation
}
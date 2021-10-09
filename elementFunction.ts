import {
    Editor, Presentation, Slide,
    SlideElement, Size,
    TextElement, PictureElement,
    FigureElement, Coordinates, FigureShape
} from './model/common'
import { updatePresentationSlideListByInsertSlide } from './presentationFunction'

/**
 * @param {Editor} editor
 * @param {Slide} slide
 * @param {TextElement|PictureElement|FigureElement} element
 * @returns {Presentation}
 */
export function addElement(editor, slide, element) {
    /** @type {number}*/
    const slideIndex = editor.presentation.slidesList.indexOf(slide)

    /** @type {SlideElement[]}*/
    const newElementsList = [
        ...slide.elementsList,
        element
    ]

    /** @type {Slide}*/
    const newSlide = {
        ...slide,
        elementsList: newElementsList,
        selectedElementIndexes: slide.elementsList.length,
    }

    /** @type {Presentation}*/
    const updatedPresentation = updatePresentationSlideListByInsertSlide(editor, newSlide, slideIndex)

    editor.history.push(updatedPresentation)
    editor.currPresentationState = editor.history.length - 1

    return updatedPresentation
}

/**
 * @param {Editor} editor
 * @param {Slide} slide
 * @param {SlideElement[]} elements
 * @returns {Presentation}
 */
export function removeElements(editor, slide, elements) {
    /** @type {number}*/
    const slideIndex = editor.presentation.slidesList.indexOf(slide)

    /** @type {SlideElement[]} */
    const newElementsList = editor.presentation.slidesList[slideIndex].elementsList.map((element) => {
        if (!elements.includes(element)) {
            return element
        }
    })

    /** @type {Slide}*/
    const newSlide = {
        ...slide,
        elementsList: newElementsList,
        selectedElementIndexes: [-1]
    }

    /** @type {Presentation}*/
    const updatedPresentation = updatePresentationSlideListByInsertSlide(editor, newSlide, slideIndex)

    editor.history.push(updatedPresentation)
    editor.currPresentationState = editor.history.length - 1

    return updatedPresentation
}

/**
 * @param {Editor} editor
 * @param {Slide} slide
 * @param {SlideElement[]} element
 * @param {number} newIndex
 * @returns {Presentation}
 */
export function changeElementsLayoutIndex(editor, slide, elements, newIndex) {
    /** @type {number}*/
    const slideIndex = editor.presentation.slidesList.indexOf(slide)

    /** @type {number[]}*/
    const elementIndexesToReplace = editor.presentation.slidesList[slideIndex].elementsList.map((element, index) => {
        if (elements.includes(element)) {
            return index
        }
    })

    /** @type {SlideElement[]}*/
    const newElementsList = [
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

    /** @type {number[]}*/
    const newSelectedElementIndexes = newElementsList.map((element, index) => {
        if (elements.includes(element)) {
            return index
        }
    })

    /** @type {Slide}*/
    const newSlide = {
        ...slide,
        elementsList: newElementsList,
        selectedElementIndexes: newSelectedElementIndexes,
    }

    /** @type {Presentation}*/
    const updatedPresentation = updatePresentationSlideListByInsertSlide(editor, newSlide, slideIndex)

    editor.history.push(updatedPresentation)
    editor.currPresentationState = editor.history.length - 1

    return updatedPresentation
}

/**
 * @param {Editor} editor
 * @param {Slide} slide
 * @param {SlideElement[]} elements
 * @param {Coordinates} newPosition
 * @returns {Presentation}
 */
export function changeElementsPosition(editor, slide, elements, newPosition) {
    /** @type {number}*/
    const slideIndex = editor.presentation.slidesList.indexOf(slide)

    /** @type {SlideElement[]}*/
    const newElementsList =
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

    /** @type {number[]}*/
    const newSelectedElementIndexes = newElementsList.map((element, index) => {
        if (elements.includes(element)) {
            return index
        }
    })

    /** @type {Slide}*/
    const newSlide = {
        ...slide,
        elementsList: newElementsList,
        selectedElementIndexes: newSelectedElementIndexes,
    }

    /** @type {Presentation}*/
    const updatedPresentation = updatePresentationSlideListByInsertSlide(editor, newSlide, slideIndex)

    editor.history.push(updatedPresentation)
    editor.currPresentationState = editor.history.length - 1

    return updatedPresentation
}

/**
 * @param {Editor} editor
 * @param {Slide} slide
 * @param {SlideElement[]} elements
 * @param {Size[]} size - [[width, height],] - соответственно элементам в elements
 * @returns {Presentation}
 */
export function changeElementsSize(editor, slide, elements, size) {
    /** @type {number}*/
    const slideIndex = editor.presentation.slidesList.indexOf(slide)

    /** @type {number} */
    var sizeIndex

    /** @type {SlideElement[]}*/
    const newElementsList = editor.presentation.slidesList[slideIndex].elementsList.map((element) => {
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

    /** @type {number[]}*/
    const newSelectedElementIndexes = newElementsList.map((element, index) => {
        if (elements.includes(element)) {
            return index
        }
    })

    /** @type {Slide}*/
    const newSlide = {
        ...slide,
        elementsList: newElementsList,
        selectedElementIndexes: newSelectedElementIndexes,
    }

    /** @type {Presentation}*/
    const updatedPresentation = updatePresentationSlideListByInsertSlide(editor, newSlide, slideIndex)

    editor.history.push(updatedPresentation)
    editor.currPresentationState = editor.history.length - 1

    return updatedPresentation
}

/**
 * @param {Editor} editor
 * @param {Slide} slide
 * @param {SlideElement[]} elements
 * @param {number[]} opacities - значения идут соответственно элементам в elements
 * @returns {Presentation}
 */
export function changeElementsOpacity(editor, slide, elements, opacities) {
    /** @type {number}*/
    const slideIndex = editor.presentation.slidesList.indexOf(slide)

    /** @type {number}*/
    var opacityIndex

    /** @type {SlideElement[]}*/
    const newElementsList = editor.presentation.slidesList[slideIndex].elementsList.map((element) => {
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

    /** @type {number[]}*/
    const newSelectedElementIndexes = newElementsList.map((element, index) => {
        if (elements.includes(element)) {
            return index
        }
    })

    /** @type {Slide}*/
    const newSlide = {
        ...slide,
        elementsList: newElementsList,
        selectedElementIndexes: newSelectedElementIndexes,
    }

    /** @type {Presentation}*/
    const updatedPresentation = updatePresentationSlideListByInsertSlide(editor, newSlide, slideIndex)

    editor.history.push(updatedPresentation)
    editor.currPresentationState = editor.history.length - 1

    return updatedPresentation
}

/**
 * @param {Editor} editor
 * @param {Slide} slide
 * @param {SlideElement[]} elements
 * @param {string[]} colors - значения идут соответственно элементам в elements
 * @returns {Presentation}
 */
export function changeFigureColor(editor, slide, elements, colors) {
    /** @type {number}*/
    const slideIndex = editor.presentation.slidesList.indexOf(slide)

    /** @type {string}*/
    var colorIndex

    /** @type {SlideElement[]}*/
    const newElementsList = editor.presentation.slidesList[slideIndex].elementsList.map((element) => {
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

    /** @type {number[]}*/
    const newSelectedElementIndexes = newElementsList.map((element, index) => {
        if (elements.includes(element)) {
            return index
        }
    })

    /** @type {Slide}*/
    const newSlide = {
        ...slide,
        elementsList: newElementsList,
        selectedElementIndexes: newSelectedElementIndexes,
    }

    /** @type {Presentation}*/
    const updatedPresentation = updatePresentationSlideListByInsertSlide(editor, newSlide, slideIndex)

    editor.history.push(updatedPresentation)
    editor.currPresentationState = editor.history.length - 1

    return updatedPresentation
}

/**
 * @param {Editor} editor
 * @param {Slide} slide
 * @param {SlideElement} element
 * @param {number} fontSize
 * @returns {Presentation}
 */
export function changeTextSize(editor, slide, element, fontSize) {
    /** @type {number}*/
    const slideIndex = editor.presentation.slidesList.indexOf(slide)

    /** @type {number}*/
    const elementIndex = editor.presentation.slidesList[slideIndex].indexOf(element)

    /** @type {Slide}*/
    const newElement = {
        ...element,
        content: {
            ...element.content,
            fontSize,
        },
    }

    /** @type {SlideElement[]}*/
    const newElementsList = [
        ...editor.presentation.slidesList[slideIndex].elementsList.slice(0, elementIndex),
        newElement,
        ...editor.presentation.slidesList[slideIndex].elementsList.slice(elementIndex + 1)
    ]

    /** @type {Slide}*/
    const newSlide = {
        ...slide,
        elementsList: newElementsList,
        selectedElementIndexes: [elementIndex],
    }

    /** @type {Presentation}*/
    const updatedPresentation = updatePresentationSlideListByInsertSlide(editor, newSlide, slideIndex)

    editor.history.push(updatedPresentation)
    editor.currPresentationState = editor.history.length - 1

    return updatedPresentation
}

/**
 * @param {Editor} editor
 * @param {Slide} slide
 * @param {SlideElement} element
 * @param {Color} color
 * @returns {Presentation}
 */
export function changeTextColor(editor, slide, element, color) {
    /** @type {number}*/
    const elementIndex = slide.elementsList.indexOf(element)

    /** @type {SlideElement}*/
    const newElement = {
        ...element,
        content: {
            ...element.content,
            fontColor: color
        }
    }

    /** @type {SlideElement[]}*/
    const newElementsList = [
        ...slide.elementsList.slice(0, elementIndex),
        newElement,
        ...slide.elementsList.slice(elementIndex + 1)
    ]

    /** @type {Slide}*/
    const newSlide = {
        ...slide,
        elementsList: newElementsList,
        selectedElementIndexes: [elementIndex],
    }

    /** @type {number}*/
    const slideIndex = editor.presentation.slidesList.indexOf(slide)

    /** @type {Presentation}*/
    const updatedPresentation = updatePresentationSlideListByInsertSlide(editor, newSlide, slideIndex)

    editor.history.push(updatedPresentation)
    editor.currPresentationState = editor.history.length - 1

    return updatedPresentation
}

/**
 * @param {Editor} editor
 * @param {Slide} slide
 * @param {SlideElement} element
 * @param {string} content
 * @returns {Presentation}
 */
export function changeTextContent(editor, slide, element, content) {
    /** @type {number}*/
    const slideIndex = editor.presentation.slidesList.indexOf(slide)

    /** @type {number}*/
    const elementIndex = editor.presentation.slidesList[slideIndex].indexOf(element)

    /** @type {Slide}*/
    const newElement = {
        ...element,
        content: {
            ...element.content,
            content,
        },
    }

    /** @type {SlideElement[]}*/
    const newElementsList = [
        ...editor.presentation.slidesList[slideIndex].elementsList.slice(0, elementIndex),
        newElement,
        ...editor.presentation.slidesList[slideIndex].elementsList.slice(elementIndex + 1)
    ]

    /** @type {Slide}*/
    const newSlide = {
        ...slide,
        elementsList: newElementsList,
        selectedElementIndexes: [elementIndex],
    }

    /** @type {Presentation}*/
    const updatedPresentation = updatePresentationSlideListByInsertSlide(editor, newSlide, slideIndex)

    editor.history.push(updatedPresentation)
    editor.currPresentationState = editor.history.length - 1

    return updatedPresentation
}
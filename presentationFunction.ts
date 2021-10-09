import {
    Editor, Presentation, PresentationMode, Slide,
    Background
} from "./model/common"

/**
 * @param {Editor} editor
 * @param {number} [slideIndex]
 * @returns {Presentation}
 */
export function addSlide(editor, slideIndex?) {
    /** @type {Background}*/
    const background = {
        color: 'white',
        src: '',
    }

    /** @type {Slide} */
    const newSlide = {
        background,
        elementsList: [],
    }

    /** @type {Slide[]} */
    const slideList = slideIndex !== 'undefined'
        ? [...editor.presentation.slidesList.slice(0, slideIndex), newSlide,
        ...editor.presentation.slidesList.slice(slideIndex)]
        : [...editor.presentation.slidesList, newSlide]

    /** @type {Presentation} */
    const updatedPresentation = updatePresentationSlideList(editor.presentation, slideList)

    editor.history.push(updatedPresentation)
    editor.currPresentationState = editor.history.length - 1

    return updatedPresentation
}

/**
 * @param {Editor} editor
 * @param {number} slideIndex
 * @returns {Presentation}
 */
export function deleteSlide(editor, slideIndex) {
    /** @type {Slide[]} */
    const slideList = [...editor.presentation.slidesList.slice(0, slideIndex),
    ...editor.presentation.slidesList.slice(slideIndex + 1)]

    /** @type {Presentation} */
    const updatedPresentation = updatePresentationSlideList(editor.presentation, slideList)

    editor.history.push(updatedPresentation)
    editor.currPresentationState = editor.history.length - 1

    return updatedPresentation
}

/**
 * @param {Editor} editor
 * @param {Slide} slide
 * @param {Background} background
 * @returns {Presentation}
 */
export function changeSlideBackground(editor, slide, background) {
    /** @type {Slide} */
    const newSlide = {
        ...slide,
        background,
    }

    /** @type {number} */
    const slideIndex = editor.presentation.slidesList.indexOf(slide)

    /** @type {Presentation} */
    const updatedPresentation = updatePresentationSlideListByInsertedSlide(editor, newSlide, slideIndex)

    editor.history.push(updatedPresentation)
    editor.currPresentationState = editor.history.length - 1

    return updatedPresentation
}

/**
 * @param {Editor} editor
 * @param {number} position
 * @returns {Presentation}
 */
export function replaceSlides(editor, position) {
    /** @type {Slide[]} */
    const slideList = [
        ...editor.presentation.slidesList.slice(0, position).map((element, index) => {
            if (editor.selectedSlideIndexes.find(index) === undefined) return element
        }),
        ...editor.presentation.slidesList.map((element, index) => {
            if (editor.selectedSlideIndexes.find(index) !== undefined) return element
        }),
        ...editor.presentation.slidesList.slice(position).map((element, index) => {
            if (editor.selectedSlideIndexes.find(index) === undefined) return element
        })
    ]

    /** @type {number[]} */
    const newSlideIndexes = editor.selectedSlideIndexes.map((element, index) => {
        return position + index
    })

    editor.selectedSlideIndexes = newSlideIndexes

    /** @type {Presentation} */
    const updatedPresentation = updatePresentationSlideList(editor.presentation, slideList)

    editor.history.push(updatedPresentation)
    editor.currPresentationState = editor.history.length - 1

    return updatedPresentation
}

/**
 * @param {Editor} editor
 * @returns {Presentation}
 */
export function removeSelectedSlides(editor) {
    /** @type {number[]} */
    const slidesIndexesToRemove = editor.selectedSlideIndexes

    /** @type {Slide[]} */
    const slideList = editor.presentation.slidesList.map((element, index) => {
        if (!slidesIndexesToRemove.includes(index)) {
            return element
        }
    })

    /** @type {Slide} */
    const selectedSlide = getNearestUnselectedSlide(editor)

    editor.selectedSlideIndexes = selectedSlide

    /** @type {Presentation} */
    const updatedPresentation = updatePresentationSlideList(editor.presentation, slideList)

    editor.history.push(updatedPresentation)
    editor.currPresentationState = editor.history.length - 1

    return updatedPresentation
}

/**
 * @param {Editor} editor
 * @return {number}
 */
export function getNearestUnselectedSlide(editor) {
    /** @type {number[]} */
    let currSlidesIndexes = []

    /** @type {number} */
    const slidesAmount = editor.presentation.slidesList.length
    for (let i = 0; i < slidesAmount; i++) {
        currSlidesIndexes.push(i)
    }

    /** @type {number[]} */
    const unselectedSlidesIndexes = currSlidesIndexes.map((element) => {
        if (!editor.selectedSlideIndexes.includes(element)) {
            return element
        }
    })

    if (!unselectedSlidesIndexes) {
        return -1
    }
    else {
        /** @type {number} */
        const lastSelectedSlideIndex = editor.selectedSlideIndexes.slice(-1)[0]
        if (lastSelectedSlideIndex < slidesAmount - 1) {
            unselectedSlidesIndexes.forEach((index) => {
                if (index > lastSelectedSlideIndex) {
                    return index
                }
            })
        }
        else {
            for (let i = lastSelectedSlideIndex; i >= 0; i--) {
                if (unselectedSlidesIndexes.indexOf(i) !== -1) {
                    return i
                }
            }
        }
    }
}

/**
 * @param {Presentation} presentation
 * @param {string} name
 * @returns {Presentation}
 */
export function updatePresentationName(presentation, name) {
    return {
        ...presentation,
        name,
    }
}

/**
* @param {Presentation} presentation
* @param {Slide[]} slideList
* @returns {Presentation}
*/
export function updatePresentationSlideList(presentation, slideList) {
    return {
        ...presentation,
        slideList,
    }
}

/**
 * @param {Editor} editor
 * @param {Slide} newSlide
 * @param {number} newSlideIndex
 * @returns {Presentation}
 */
export function updatePresentationSlideListByInsertedSlide(editor, newSlide, newSlideIndex) {
    return {
        ...editor.presentation,
        slidesList:
            [...editor.presentation.slidesList.slice(0, newSlideIndex),
                newSlide,
            ...editor.presentation.slidesList.slice(newSlideIndex + 1)]
    }
}
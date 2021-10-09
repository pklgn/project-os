import './model/common'

/**
 * @param {Editor} editor
 * @param {number} [slideIndex]
 * @returns {Presentation}
 */
function addSlide(editor, slideIndex?) {
    /** @type {Background}*/
    const background = {
        color: Color.White,
        src: '',
    }

    /** @type {Slide} */
    const newSlide = {
        background,
        elementsList: [],
    }

    const slideList = slideIndex !== 'undefined'
        ? [...editor.presentation.slidesList.slice(0, slideIndex), newSlide,
        ...editor.presentation.slidesList.slice(slideIndex)]
        : [...editor.presentation.slidesList, newSlide]

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
function deleteSlide(editor, slideIndex) {
    const slideList = [...editor.presentation.slidesList.slice(0, slideIndex),
    ...editor.presentation.slidesList.slice(slideIndex + 1)]

    const updatedPresentation = updatePresentationSlideList(editor.presentation, slideList)

    editor.history.push(updatedPresentation)
    editor.currPresentationState = editor.history.length - 1

    return updatedPresentation
}

/**
 * @param {Presentation} presentation
 * @param {string} name
 * @returns {Presentation}
 */
function updatePresentationName(presentation, name) {
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
function updatePresentationSlideList(presentation, slideList) {
    return {
        ...presentation,
        slideList,
    }
}

/**
 * @param {Editor} editor
 * @returns {Presentation}
 */
function removeSelectedSlides(editor) {
    const slidesIndexesToRemove = editor.selectedSlideIndexes
    const slideList = editor.presentation.slidesList.map((element, index) => {
        if (!slidesIndexesToRemove.includes(index)) {
            return element
        }
    })

    const selectedSlide = selectSlide(editor)

    editor.selectedSlideIndexes = selectSlide

    const updatedPresentation = updatePresentationSlideList(editor.presentation, slideList)

    editor.history.push(updatedPresentation)
    editor.currPresentationState = editor.history.length - 1

    return updatedPresentation
}

/**
 * @param {Editor} editor
 * @return {number}
 */
function selectSlide(editor) {
    let currSlidesIndexes = []
    const slidesAmount = editor.presentation.slidesList.length
    for (let i = 0; i < slidesAmount; i++) {
        currSlidesIndexes.push(i)
    }

    const unselectedSlidesIndexes = currSlidesIndexes.map((element) => {
        if (!editor.selectedSlideIndexes.includes(element)) {
            return element
        }
    })

    if (!unselectedSlidesIndexes) {
        return -1
    }
    else {
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
 * @param {Editor} editor
 * @param {number} position
 * @returns {Presentation}
 */
function replaceSlides(editor, position) {
    const slideList = [
        ...editor.presentation.slidesList.slice(0, position).map((element, index) => {
            if (typeof editor.selectedSlideIndexes.find(index) === "undefined") return element
        }),
        ...editor.presentation.slidesList.map((element, index) => {
            if (typeof editor.selectedSlideIndexes.find(index) !== "undefined") return element
        }),
        ...editor.presentation.slidesList.slice(position).map((element, index) => {
            if (typeof editor.selectedSlideIndexes.find(index) === "undefined") return element
        })
    ] //TODO FIX THAT SHIT
    const newSlideIndexes = editor.selectedSlideIndexes.map((element, index) => {
        return position + index
    })

    editor.selectedSlideIndexes = newSlideIndexes

    const updatedPresentation = updatePresentationSlideList(editor.presentation, slideList)

    editor.history.push(updatedPresentation)
    editor.currPresentationState = editor.history.length - 1

    return updatedPresentation
}

//TODO or history

/**
 * @param {Editor} editor
 * @param {Slide} slide
 * @param {TextElement|PictureElement|FigureElement} element
 * @returns {Presentation}
 */
function addElement(editor, slide, element) {
    const slideIndex = editor.presentation.slidesList.indexOf(slide)

    const newElementsList = {
        ...slide.elementsList,
        element
    }

    const newSlide = {
        ...slide,
        elementsList: newElementsList
    }

    const updatedPresentation = newPresentation(editor, newSlide, slideIndex)

    editor.history.push(updatedPresentation)
    editor.currPresentationState = editor.history.length - 1

    return updatedPresentation
}

/**
 * @param {Editor} editor
 * @param {PresentationMode} mode
 * @description Изменяет режим презентации
 */
function changeMode(editor, mode) {
    editor.mode = mode
}

/**
 * @param {Editor} editor
 * @param {Slide} slide
 * @param {Background} background
 * @returns {Presentation}
 */
function changeSlideBackground(editor, slide, background) {
    const newSlide = {
        ...slide,
        background,
    }

    const slideIndex = editor.presentation.slidesList.indexOf(slide)

    const updatedPresentation = newPresentation(editor, newSlide, slideIndex)

    editor.history.push(updatedPresentation)
    editor.currPresentationState = editor.history.length - 1

    return updatedPresentation
}

/**
 * @param {Editor} editor
 * @param {Slide} slide
 * @param {SlideElement} element
 * @param {number} newIndex
 * @returns {Presentation}
 */
function changeElementLayoutIndex(editor, slide, element, newIndex) {
    const slideIndex = editor.presentation.slidesList.indexOf(slide)
    const elementIndex = editor.presentation.slidesList[slideIndex].indexOf(element)
    const newElementsList = (elementIndex > newIndex)
        ? [
            ...editor.presentation.slidesList[slideIndex].elementsList.slice(0, newIndex),
            element,
            ...editor.presentation.slidesList[slideIndex].elementsList.slice(newIndex, elementIndex),
            ...editor.presentation.slidesList[slideIndex].elementsList.slice(elementIndex + 1)
        ]
        : [
            ...editor.presentation.slidesList[slideIndex].elementsList.slice(0, elementIndex),
            ...editor.presentation.slidesList[slideIndex].elementsList.slice(elementIndex + 1, newIndex),
            element,
            ...editor.presentation.slidesList[slideIndex].elementsList.slice(newIndex)
        ]
    const newSlide = {
        ...slide,
        elementsList: newElementsList
    }

    const updatedPresentation = newPresentation(editor, newSlide, slideIndex)

    editor.history.push(updatedPresentation)
    editor.currPresentationState = editor.history.length - 1

    return updatedPresentation
}

/**
 * @param {Editor} editor
 * @param {Slide} slide
 * @param {SlideElement} element
 * @param {Size} size
 * @returns {Presentation}
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
        ...editor.presentation.slidesList[slideIndex].elementsList.slice(elementIndex + 1)
    ]

    const newSlide = {
        ...slide,
        elementsList: newElementsList
    }

    const updatedPresentation = newPresentation(editor, newSlide, slideIndex)

    editor.history.push(updatedPresentation)
    editor.currPresentationState = editor.history.length - 1

    return updatedPresentation
}

/**
 * @param {Editor} editor
 * @param {Slide} slide
 * @param {SlideElement} element
 * @param {number} opacity
 * @returns {Presentation}
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
        ...editor.presentation.slidesList[slideIndex].elementsList.slice(elementIndex + 1)
    ]

    const newSlide = {
        ...slide,
        elementsList: newElementsList
    }

    const updatedPresentation = newPresentation(editor, newSlide, slideIndex)

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
        ...editor.presentation.slidesList[slideIndex].elementsList.slice(elementIndex + 1)
    ]

    const newSlide = {
        ...slide,
        elementsList: newElementsList
    }

    const updatedPresentation =  newPresentation(editor, newSlide, slideIndex)

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
        ...editor.presentation.slidesList[slideIndex].elementsList.slice(elementIndex + 1)
    ]

    const newSlide = {
        ...slide,
        elementsList: newElementsList
    }

    const updatedPresentation = newPresentation(editor, newSlide, slideIndex)

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
        ...slide.elementsList.slice(elementIndex + 1)
    ]
    const newSlide = {
        ...slide,
        elementsList: newElementsList
    }
    const slideIndex = editor.presentation.slideList.indexOf(slide)

    const updatedPresentation = newPresentation(editor, newSlide, slideIndex)

    editor.history.push(updatedPresentation)
    editor.currPresentationState = editor.history.length - 1

    return updatedPresentation
}

/**
 * @param {Editor} editor
 * @param {Slide} newSlide
 * @param {number} newSlideIndex
 * @returns {Presentation}
 */
function newPresentation(editor, newSlide, newSlideIndex) {
    return {
        ...editor.presentation,
        slidesList:
            [...editor.presentation.slidesList.slice(0, newSlideIndex),
                newSlide,
            ...editor.presentation.slidesList.slice(newSlideIndex + 1)]
    }
}

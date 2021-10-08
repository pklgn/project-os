import './model/common'

/**
 * @param {Editor} editor
 * @param {number} [slideIndex]
 * @returns {Editor}
 */
function addSlide(editor, slideIndex?) {
    /** @type {Background}*/
    const background = {
        color: Color.White,
        src: ''
    }

    /** @type {Slide} */
    const newSlide = {
        background,
        elementsList: [],
    }

    const currSlideList = slideIndex !== 'undefined' 
                ? [...editor.presentation.slidesList.slice(0, slideIndex), newSlide, 
                   ...editor.presentation.slidesList.slice(slideIndex)]
                : [...editor.presentation.slidesList, newSlide]

    const updatedPresentation = updatePresentation(editor.presentation, currSlideList)
    return {
        ...editor,
        presentation: updatedPresentation,
    }
}

/**
 * @param {Editor} editor
 * @param {number} slideIndex
 * @returns {Editor}
 */
 function deleteSlide(editor, slideIndex) {
    const currSlideList = [...editor.presentation.slidesList.slice(0, slideIndex),
        ...editor.presentation.slidesList.slice(slideIndex+1)]

    const updatedPresentation = updatePresentation(editor.presentation, currSlideList)

    return {
        ...editor,
        presentation: updatedPresentation,
    }
}

/**
 * @param {Presentation} presentation
 * @param {Slide[]|number[]|string} changedValue
 * @returns {Presentation}
 */
function updatePresentation(presentation, changedValue) {
    if (typeof changedValue === "string") {
        return {
            ...presentation,
            name: changedValue,
        }
    } else if (typeof changedValue[0] === "number") {
        return {
            ...presentation,
            selectedSlideIndexes: changedValue,
        }
    } else {
        return {
            ...presentation,
            slidesList: changedValue,
        }
    }
}

/**
 * @param {Editor} editor
 * @returns {Editor}
 */
function removeSelectedSlides(editor) {
    const slidesIndexesToRemove = editor.presentation.selectedSlideIndexes
    const slideList = editor.presentation.slidesList.map((element, index) => {
        if (!slidesIndexesToRemove.includes(index)) {
            return element
        }
    })

    const selectedSlide = selectSlide(editor)

    return {
        ...setSelectedSlideIndexes(editor, selectedSlide),
        presentation: updatePresentation(editor.presentation, slideList)
    }
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
        if (!editor.presentation.selectedSlideIndexes.includes(element)) {
            return element
        }
    })

    if (!unselectedSlidesIndexes) {
        return -1
    }
    else {
        const lastSelectedSlideIndex = editor.presentation.selectedSlideIndexes[-1]
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
 * @returns {Editor}
 */
function replaceSlides(editor, position) {
    const currSlideList = [
        ...editor.presentation.slidesList.slice(0, position).map((element, index) => {
            if (typeof editor.presentation.selectedSlideIndexes.find(index) === "undefined") return element 
        }),
        ...editor.presentation.slidesList.map((element, index) => {
            if (typeof editor.presentation.selectedSlideIndexes.find(index) !== "undefined") return element 
        }),
        ...editor.presentation.slidesList.slice(position).map((element, index) => {
            if (typeof editor.presentation.selectedSlideIndexes.find(index) === "undefined") return element 
        })
    ]
    const newSlideIndexes = editor.selectedSlideIndexes.map((element, index) => {
        return position+index
    })
    
    return {
        ...setSelectedSlideIndexes(editor, newSlideIndexes),
        presentation: updatePresentation(editor.presentation, currSlideList)
    }
}

/**
 * @param {Editor} editor
 * @param {number[]} slidesIndexes
 * @returns {Editor}
 */
function setSelectedSlideIndexes(editor, slidesIndexes) {
    return {
        ...editor,
        presentation: updatePresentation(editor.presentation, slidesIndexes),
    }    
}

/**
 * @param {Editor} editor
 * @returns {Editor}
 */
function undo(editor) {
    //TODO implement undo function
}

/**
 * @param {Editor} editor
 * @returns {Editor}
 */
function redo(editor) {
    //TODO implement redo function
}

/**
 * @param {Editor} editor
 * @param {Slide} slide
 * @param {TextElement|PictureElement|FigureElement} element
 * @returns {Editor}
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
    //TODO newEditor
    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slidesList: [
                ...editor.presentation.slidesList.slice(0, slideIndex),
                newSlide,
                ...editor.presentation.slidesList.slice(slideIndex+1)
            ]
        }
    }
}

/**
 * @param {Editor} editor
 * @param {PresentationMode} mode
 * @returns {Editor}
 */
function changeMode(editor, mode) {
    return {
        ...editor,
        mode,
    }
}

/**
 * @param {Editor} editor
 * @param {Slide} slide
 * @param {Background} background
 * @returns {Editor}
 */
function changeSlideBackground(editor, slide, background) {
    const newSlide = {
        ...slide,
        background,
    }

    const slideIndex = editor.presentation.slidesList.indexOf(slide)

    return newEditor(editor, newSlide, slideIndex)
}

/**
 * @param {Editor} editor
 * @param {Slide} slide
 * @param {SlideElement} element
 * @param {number} newIndex
 * @returns {Editor}
 */
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

    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slidesList: [
                ...editor.presentation.slidesList.slice(0, slideIndex),
                newSlide,
                ...editor.presentation.slidesList.slice(slideIndex+1)
            ]
        }
    }
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

/**
 * @param {Editor} editor
 * @param {Slide} newSlide
 * @param {number} newSlideIndex
 * @returns {Editor}
 */
 function newEditor(editor, newSlide, newSlideIndex) {
    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slidesList:
                [...editor.presentation.slidesList.slice(0, newSlideIndex),
                newSlide,
                ...editor.presentation.slidesList.slice(newSlideIndex+1)]
        }
    }
}

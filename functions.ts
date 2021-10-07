import 'model/common'

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
 * @param {Slide} slide
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
 * @param {Slide[]|Array<number>|string} changedValue
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
 * @param {Array<number>} slideIndexes
 * @returns {Editor}
 */
function removeSelectedSlides(editor) {
    const slideIndexes = editor.presentation.selectedSlideIndexes
    const currSlideList = editor.presentation.slidesList.map((element, index) => {
        if (!slideIndexes.includes(index)) return element
    })

    const newSlideIndexes = [slideIndexes[0]]
    
    return {
        ...setSelectedSlideIndexes(editor, newSlideIndexes),
        presentation: updatePresentation(editor.presentation, currSlideList)
    }
}

/**
 * @param {Editor} editor
 * @param {Array<number>} slidesIndexes
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
 * @param {Array<number>} slidesIndexes
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
 * @param {PresentationMode} mode
 * @returns {Editor}
 */
function changeMode(editor, mode) {
    //TODO implement mode changing function
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
        background: background
    }
    const slideIndex = editor.presentation.slidesList.indexOf(slide)
    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            slidesList: 
                [...editor.presentation.slidesList.slice(0, slideIndex),
                newSlide,
                ...editor.presentation.slidesList.slice(slideIndex+1)]
        }
    }
}

/**
 * @param {Editor} editor
 * @param {Slide} slide
 * @param {SlideElement} element
 * @param {number} index
 * @returns {Editor}
 */
function changeElementLayoutIndex(editor, slide, element, insIndex) {
    const slideIndex = editor.presentation.slidesList.indexOf(slide)
    const elementIndex = editor.presentation.slidesList[slideIndex].indexOf(element)
    const newElementsList = (elementIndex > insIndex) 
                ? [
                    ...editor.presentation.slidesList[slideIndex].elementsList.slice(0, insIndex), 
                    element,
                    ...editor.presentation.slidesList[slideIndex].elementsList.slice(insIndex, elementIndex),
                    ...editor.presentation.slidesList[slideIndex].elementsList.slice(elementIndex+1)
                ]
                : [
                    ...editor.presentation.slidesList[slideIndex].elementsList.slice(0, elementIndex),
                    ...editor.presentation.slidesList[slideIndex].elementsList.slice(elementIndex+1, insIndex), 
                    element,
                    ...editor.presentation.slidesList[slideIndex].elementsList.slice(insIndex)
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
 * @param {Size} size
 * @returns {Editor}
 */
function changeElementSize(editor, slide, element, size) {
    const slideIndex = editor.presentation.slidesList.indexOf(slide)
    const elementIndex = editor.presentation.slidesList[slideIndex].indexOf(element)
    const newElement = {
        ...element,
        position: {
            ...element.position,
            size: size
        }
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
 * @param {FigureElement} figure
 * @param {Color} color
 * @returns {Editor}
 */
function changeFigureColor(editor, slide, element, figure, color) {
    const slideIndex = editor.presentation.slidesList.indexOf(slide)
    const elementIndex = editor.presentation.slidesList[slideIndex].indexOf(element)

    const newContent = {
        ...element.content,
        color: color
    }

    const newElement = {
        ...element,
        content: newContent
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
 * @param {string} elementId
 * @param {number} textSize
 * @returns {Editor}
 */
function changeTextSize(editor, elementId, textSize) {
    //TODO implement elementId, нужно в процессе создания элемента присваивать ему id
}

/**
 * @param {Editor} editor
 * @param {string} elementId
 * @param {Color} color
 * @returns {Editor}
 */
function changeTextColor(editor, elementId, color) {
    //TODO implement text color type
}


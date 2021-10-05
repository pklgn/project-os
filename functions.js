/**
 * @param {Editor} editor
 * @returns {Editor}
 */
function addSlide(editor) {
    const currPresentation = editor.presentation
    const currSlideList = editor.presentation.slidesList

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

    const updatedSlidesList = updateSlidesList(currSlideList, newSlide)
    const updatedPresentation = updatePresentation(currPresentation, updatedSlidesList)
    return {
        ...editor,
        presentation: updatedPresentation,
    }
}

/**
 * @param {Slide[]} slideList
 * @param {Slide} slide
 * @param {number} [slideIndex]
 * @returns {Slide[]}
 */
function updateSlidesList(slideList, slide, slideIndex){
    if (slideIndex) {
        return slideList.map((element, index) => {
            if (index === slideIndex) {
                return slide
            }
            else {
                return element
            }
        })
    }
    else {
        return [
            ...slideList,
            slide
        ]
    }
}

/**
 * @param {Presentation} presentation
 * @param {Slide[]|string} changedValue
 * @returns {Presentation}
 */
function updatePresentation(presentation, changedValue) {
    if (typeof changedValue === "string") {
        return {
            ...presentation,
            name: changedValue,
        }
    }
    else {
        return {
            ...presentation,
            slidesList: changedValue,
        }
    }
}

/**
 * @param {Editor} editor
 * @param {Slide} slide
 * @returns {Editor}
 */
function deleteSlide(editor, slide) {
    //TODO implement deleteSlide function
}

/**
 * @param {Editor} editor
 * @param {Array<Slide>} slides
 * @returns {Editor}
 */
function removeSlide(editor, slides) {
    // TODO implement removeSlide function
}

/**
 * @param {Editor} editor
 * @param {Slide} slide
 * @param {number} position нужен ли он, возможно, стоит брать значение из истории действий
 * @returns {Editor}
 */
function replaceSlide(editor, slide, position) {
    //TODO implement replaceSlide function
}

/**
 * @param {Editor} editor
 * @param {string} name аналогично с replaceSlide
 * @returns {Editor}
 */
function renamePresentation(editor, name) {
    //TODO implement renamePresentation function
}

/**
 * @param {Editor} editor
 * @param {Slide} slide
 * @returns {Editor}
 */
function selectSlide(editor, slide) {
    //TODO implement selectSlide function
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
    //TODO implement element adding
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
    //TODO implement background changing function
}

/**
 * @param {Editor} editor
 * @param {Slide} slide
 * @param {SlideElement} element
 * @param {number} index
 * @returns {Editor}
 */
function changeElementLayoutIndex(editor, slide, element, index) {
    //TODO implement work with element layout
}

/**
 * @param {Editor} editor
 * @param {Slide} slide
 * @param {SlideElement} element
 * @param {Size} size
 * @returns {Editor}
 */
function changeElementSize(editor, slide, element, size) {
    //TODO implement resizing of the element
}

/**
 * @param {Editor} editor
 * @param {Slide} slide
 * @param {SlideElement} element
 * @param {number} opacity
 * @returns {Editor}
 */
function changeElementOpacity(editor, slide, element, opacity) {
    //TODO implement element opacity
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
    //TODO changeFigureColor arguments amount too big
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


/**
 * @param {Editor} editor
 * @returns {Editor}
 */
function addSlide(editor: Editor) {
    //TODO implement addSlide function
    const slide: Slide = {
            background: Color.White,
            elementList: []
    };
    editor.presentation.slideList.push(slide);
}

/**
 * @param {Editor} editor
 * @param {Slide} slide
 * @returns {Editor}
 */

function deleteSlide(editor: Editor, slide: Slide) {
    //TODO implement deleteSlide function
    editor.presentation.undo.push(editor.presentation.slideList[editor.presentation.slideList.indexOf(slide)])
    delete editor.presentation.slideList[editor.presentation.slideList.indexOf(slide)];
}

/**
 * @param {Editor} editor
 * @param {Array<Slide>} slides
 * @returns {Editor}
 */
function removeSlides(editor: Editor, slides: Slide[]) {
    // TODO implement removeSlide function
    slides.forEach((slide: Slide) => deleteSlide(editor, slide));
}

/**
 * @param {Editor} editor
 * @param {Slide} slide
 * @param {number} position нужен ли он, возможно, стоит брать значение из истории действий
 * @returns {Editor}
 */
function replaceSlide(editor: Editor, slide: Slide, position: number) {
    //TODO implement replaceSlide function
    //swap: b = [a, a = b][0];
    editor.presentation.slideList[editor.presentation.slideList.indexOf(slide)] = 
    [editor.presentation.slideList[position],
    editor.presentation.slideList[position] = editor.presentation.slideList[editor.presentation.slideList.indexOf(slide)]][0];
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
 * @param {ElementType} type
 * @returns {Editor}
 */
function addElement(editor, slide, type) {
    //TODO implement element adding
}

/**
 * @param {Editor} editor
 * @param {Mode} mode
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
 * @param {ElementSize} size
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
 * @param {Figure} figure
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


/**
 * @param {Editor} editor
 * @param {Slide} slide
 * @returns {Editor}
 */
function addSlide(editor, slide) {
    //TODO implement addSlide function
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
    /** Отличие от deleteSlide в том, что изначально необходимо только скрыть удаленный
     * слайд для возможно его восстановления
    */
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
 * @param {Presentation} presentation
 * @param {string} name аналогично с replaceSlide
 * @returns {Editor}
 */
function renamePresentation(editor, presentation, name) {
    //TODO implement renamePresentation function
}

/**
 * @param {Editor} editor
 * @param {Slide} slide
 * @returns {Editor}
 */
function chooseSlide(editor, slide) {
    //TODO implement chooseSlide function
}

/**
 * @param {Editor} editor
 * @param {Slide} slide
 * @returns {Editor}
 */
function undo(editor, slide) {
    //TODO implement undo function
    /**
     * по значению Id слайда будет получать из списка изменений
     * предыдущее изменение?
     */
}

/**
 * @param {Editor} editor
 * @param {Slide} slide
 * @returns {Editor}
 */
function redo(editor, slide) {
    //TODO implement redo function
}

/**
 * @param {Editor} editor
 * @returns {Editor}
 */
function addElement(editor) {
    //TODO implement element adding
}
export enum ActionType {
    //EditorActions
    SET_SELECTED_ID_IN_EDITOR = 'SET_SELECTED_ID_IN_EDITOR',
    SET_EDITOR_MODE = 'SET_EDITOR_MODE',
    //EditorActions

    //HistoryActions
    KEEP = 'KEEP',
    REDO = 'REDO',
    UNDO = 'UNDO',
    //HistoryActions

    //PresentationActions
    CHANGE_PRESENTATION_TITLE = 'CHANGE_PRESENTATION_TITLE',
    UPLOAD_PRESENTATION_FROM_JSON = 'UPLOAD_PRESENTATION_FROM_JSON',
    //PresentationActions

    //SlideActions
    ADD_SLIDE = 'ADD_SLIDE',
    DELETE_SELECTED_SLIDES = 'DELETE_SELECTED_SLIDES',
    INSERT_SELECTED_SLIDES_AT_INDEX = 'INSERT_SELECTED_SLIDES_AT_INDEX',
    //SlideActions

    //ElementsActions
    CHANGE_ELEMENTS_OPACITY = 'CHANGE_ELEMENTS_OPACITY',
    CHANGE_ELEMENTS_POSITION = 'CHANGE_ELEMENTS_POSITION',
    CHANGE_ELEMENTS_SIZE = 'CHANGE_ELEMENTS_SIZE',
    MOVE_ELEMENTS_TO_BACKGROUND_OR_FOREGROUND = 'MOVE_ELEMENTS_TO_BACKGROUND_OR_FOREGROUND',
    REMOVE_SELECTED_ELEMENTS = 'REMOVE_SELECTED_ELEMENTS',
    //ElementsActions

    //TextActions
    ADD_TEXT_AT_SELECTED_SLIDE = 'ADD_TEXT_AT_SELECTED_SLIDE',
    CHANGE_SELECTED_TEXTS_COLOR = 'CHANGE_SELECTED_TEXTS_COLOR',
    CHANGE_SELECTED_TEXT_CONTENT = 'CHANGE_SELECTED_TEXT_CONTENT',
    CHANGE_SELECTED_TEXTS_SIZE = 'CHANGE_SELECTED_TEXTS_SIZE',
    CHANGE_SELECTED_TEXTS_STYLE = 'CHANGE_SELECTED_TEXTS_STYLE',
    //TextActions

    //PictureActions
    ADD_PICTURE_AT_SELECTED_SLIDE = 'ADD_PICTURE_AT_SELECTED_SLIDE',
}

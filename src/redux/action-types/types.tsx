export enum ActionType {
    //EditorActions
    SET_SELECTED_ID_IN_EDITOR = "SET_SELECTED_ID_IN_EDITOR",
    //EditorActions

    //HistoryActions
    UNDO = 'UNDO',
    REDO = 'REDO',
    KEEP = 'KEEP',
    //HistoryActions

    //PresentationActions
    CHANGE_PRESENTATION_TITLE = 'CHANGE_PRESENTATION_TITLE',
    //PresentationActions

    //SlideActions
    ADD_SLIDE = "ADD_SLIDE",
    DELETE_SELECTED_SLIDES = "DELETE_SELECTED_SLIDES",
    //SlideActions

    //ElementsActions
    CHANGE_ELEMENTS_OPACITY = 'CHANGE_ELEMENTS_OPACITY',
    CHANGE_ELEMENTS_POSITION = 'CHANGE_ELEMENTS_POSITION',
    CHANGE_ELEMENTS_SIZE = 'CHANGE_ELEMENTS_SIZE',
    MOVE_ELEMENTS_TO_BACKGROUND_OR_FOREGROUND = 'MOVE_ELEMENTS_TO_BACKGROUND_OR_FOREGROUND',
    REMOVE_SELECTED_ELEMENTS = 'REMOVE_SELECTED_ELEMENTS',
    //ElementsActions
}
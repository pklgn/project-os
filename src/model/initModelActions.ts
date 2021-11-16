import { Editor, Presentation, History } from "./types"

export function initEditor(): Editor {
    return {
        mode: "edit",
        presentation: initPresentation(),
        history: initHistory(),
        selectedSlidesIds: [],
        selectedSlideElementsIds: [],
    }
}

function initPresentation(): Presentation {
    return {
        name: "Оладушек",
        slidesList: [],
    }
}

function initHistory(): History {
    return {
        presentationStates: [],
        currState: -1,
        selectedSlidesIdsStates: [[]],
        selectedSlideElementsIdsStates: [[]],
    }
}
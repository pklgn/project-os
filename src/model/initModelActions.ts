import { Editor, Presentation, History } from './types';

export function initEditor(): Editor {
    return {
        mode: 'edit',
        presentation: initPresentation(),
        history: initHistory(),
        selectedSlidesIds: [],
        selectedSlideElementsIds: [],
        selectedAreasLocation: undefined,
    };
}

function initPresentation(): Presentation {
    return {
        name: 'Оладушек',
        slidesList: [],
    };
}

function initHistory(): History {
    return {
        presentationStates: [initPresentation()],
        currState: 0,
        selectedSlidesIdsStates: [[]],
        selectedSlideElementsIdsStates: [[]],
        selectedAreasLocation: [],
    };
}

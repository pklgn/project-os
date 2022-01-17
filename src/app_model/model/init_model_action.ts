import { Editor, Presentation, History } from './types';

export function initEditor(): Editor {
    return {
        presentation: initPresentation(),
        history: initHistory(),
        selectedSlidesIds: [],
        selectedSlideElementsIds: [],
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
    };
}

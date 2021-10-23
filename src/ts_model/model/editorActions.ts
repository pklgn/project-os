import { Editor, PresentationMode } from "./types";

export function togglePresentationMode(editor: Editor): Editor {
    let mode: PresentationMode;
    if (editor.mode === "edit") {
        mode = "show";
    } else {
        mode = "edit";
    }
    return {
        ...editor,
        mode,
    }
}

export function changePresentationName(editor: Editor, name: string): Editor {
    return {
        ...editor,
        presentation: {
            ...editor.presentation,
            name,
        }
    }
}

export function setSelectedIdInEditor(editor: Editor, selectedSlidesIds: string[], selectedSlideElementsIds: string[]): Editor {
    return {
        ...editor,
        selectedSlidesIds,
        selectedSlideElementsIds,
    }
}
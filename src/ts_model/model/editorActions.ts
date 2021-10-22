import { Editor, PresentationMode } from "./types";

export function togglePresentationMode(editor: Editor): Editor {
    var mode: PresentationMode;
    if (editor.mode === "edit") {
        mode = "show";
    } else {
        mode = "edit";
    }
    return {
        ...editor,
        mode
    }
}

export function setSelectedIdInEditor(editor: Editor, selectedSlidesIds: string[], selectedSlideElementsIds: string[]): Editor {
    return {
        ...editor,
        selectedSlidesIds,
        selectedSlideElementsIds,
    }
}
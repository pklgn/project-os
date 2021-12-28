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

export function setSelectedIdInEditor(editor: Editor, selectedSlidesIds: string[] = [], selectedSlideElementsIds: string[] = []): Editor {
    const nextSelectedSlidesIds: string[] = (selectedSlidesIds.length)
        ? selectedSlidesIds
        : editor.selectedSlidesIds;
    const nextSelectedElementsIds: string[] = (selectedSlideElementsIds.length)
        ? selectedSlideElementsIds
        : editor.selectedSlideElementsIds;

    editor.selectedSlideElementsIds = nextSelectedElementsIds;
    editor.selectedSlidesIds = nextSelectedSlidesIds;

    return editor;
}
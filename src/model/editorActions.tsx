import { Editor, PresentationMode } from './types';

export function getCurrentEditorMode(editor: Editor): PresentationMode {
    return editor.mode;
}

export function toggleEditorMode(
    editor: Editor,
    key: PresentationMode,
): Editor {
    const mode: PresentationMode =
        key === 'edit'
            ? 'edit'
            : key === 'show-from-first-slide'
            ? 'show-from-first-slide'
            : 'show-from-current-slide';

    return {
        ...editor,
        mode,
    };
}

export function setSelectedIdInEditor(
    editor: Editor,
    selectedSlidesIds: string[] = [],
    selectedSlideElementsIds: string[] = [],
): Editor {
    const nextSelectedSlidesIds: string[] = selectedSlidesIds.length
        ? selectedSlidesIds
        : editor.selectedSlidesIds;
    const nextSelectedElementsIds: string[] = selectedSlideElementsIds.length
        ? selectedSlideElementsIds
        : editor.selectedSlideElementsIds;

    editor.selectedSlideElementsIds = nextSelectedElementsIds;
    editor.selectedSlidesIds = nextSelectedSlidesIds;

    return editor;
}

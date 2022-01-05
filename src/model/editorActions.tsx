import { Editor, PresentationMode } from './types';

export function toggleEditorMode(editor: Editor): Editor {
    const mode: PresentationMode = editor.mode === 'edit' ? 'show' : 'edit';

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

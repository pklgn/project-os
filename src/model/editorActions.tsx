import { initEditor } from './initModelActions';
import { Editor, PresentationMode } from './types';

export function getCurrentEditorMode(editor: Editor): PresentationMode {
    return editor.mode;
}

export function toggleEditorMode(editor: Editor, key: PresentationMode): Editor {
    const mode: PresentationMode =
        key === 'edit' ? 'edit' : key === 'show-from-first-slide' ? 'show-from-first-slide' : 'show-from-current-slide';

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
    const nextSelectedSlidesIds: string[] = selectedSlidesIds.length ? selectedSlidesIds : editor.selectedSlidesIds;
    const nextSelectedElementsIds: string[] = selectedSlideElementsIds;

    editor.selectedSlideElementsIds = nextSelectedElementsIds;
    editor.selectedSlidesIds = nextSelectedSlidesIds;

    return editor;
}

export function savePresentationAsJson(editor: Editor) {
    const presentation = editor.presentation;
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(presentation));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute('href', dataStr);
    downloadAnchorNode.setAttribute('download', editor.presentation.name + '.json');
    document.body.appendChild(downloadAnchorNode); // required for firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
}

export function uploadPresentationFromJson(s: string): Editor {
    return {
        ...initEditor(),
        presentation: JSON.parse(s),
    };
}

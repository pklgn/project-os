import { initEditor } from './initModelActions';
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

export function savePresentationAsJson(editor: Editor) {
    const presentation = editor.presentation
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(presentation));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href",     dataStr);
    downloadAnchorNode.setAttribute("download", editor.presentation.name + ".json");
    document.body.appendChild(downloadAnchorNode); // required for firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
}

export function uploadPresentationFromJson(): Editor {
    const fileInput = document.createElement("input");
    document.body.appendChild(fileInput); // required for firefox
    fileInput.type = "file";
    fileInput.click()
    
    const file = fileInput.files[0];
    const reader = new FileReader()
    reader.onload = e => {
        fileInput.remove()
        return JSON.parse(reader.readAsText(file));
    };
    return initEditor()
}


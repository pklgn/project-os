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
    // const fileInput = document.createElement("input");
    // fileInput.type = "file";
    // const reader = new FileReader();
    // fileInput.click();
    

    // console.log("0")
    // if (!fileInput.files) return initEditor();
    // console.log(fileInput)
    // console.log(fileInput.files)
    // const file = fileInput.files[0];
    // reader.readAsText(file);

    // fileInput.remove();
    // if (!reader.result) return initEditor();
    // console.log("2")
    // if (typeof reader.result === 'string') {
    //     return JSON.parse(reader.result);
    // }
    const file = pick()
    console.log(file);
    return initEditor();
}

async function pick(): Promise<string> {
    const filepicker = document.createElement("input");
    filepicker.setAttribute("type","file");
    filepicker.click();
    return new Promise((resolve, reject) => {
      filepicker.onchange = e => {
        const reader = new FileReader();
        reader.addEventListener('load', file => resolve(file.target.result));
        reader.addEventListener('error', reject);
        reader.readAsText(e.target.files[0]);
      };
    });
}
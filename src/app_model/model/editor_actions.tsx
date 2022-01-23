import { initEditor } from './init_model_action';
import { Editor, Presentation } from './types';

export function setSelectedIdInEditor(
    editor: Editor,
    selectedSlidesIds: string[] = [],
    selectedSlideElementsIds: string[] = [],
): Editor {
    const nextSelectedSlidesIds: string[] = selectedSlidesIds.length ? selectedSlidesIds : editor.selectedSlidesIds;
    editor.selectedSlideElementsIds = selectedSlideElementsIds;

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
    const uploadedPresentation: Presentation = JSON.parse(s);

    return {
        ...initEditor(),
        history: {
            ...initEditor().history,
            currState: 0,
            selectedSlidesIdsStates: [[uploadedPresentation.slidesList[0].id]],
            presentationStates: [uploadedPresentation],
        },
        selectedSlidesIds: [uploadedPresentation.slidesList[0].id],
        presentation: uploadedPresentation,
    };
}

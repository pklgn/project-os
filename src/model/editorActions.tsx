import { initEditor } from './initModelActions';
import { Editor, Presentation, PresentationMode, Slide, SlideElement } from './types';
import { isPicture } from './utils/tools';
import { BaseSyntheticEvent } from 'react';
import { Editor, PresentationMode, SelectedAreaLocation } from './types';

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
    editor.selectedSlideElementsIds = selectedSlideElementsIds.length
        ? selectedSlideElementsIds
        : editor.selectedSlideElementsIds;
    editor.selectedSlidesIds = nextSelectedSlidesIds;

    return editor;
}

async function getBase64(src: string) {
    let base64data: string | ArrayBuffer | null | undefined;
    const reader = new FileReader();
    const blob = await fetch(src).then((r) => r.blob());
    reader.readAsDataURL(blob);
    reader.onloadend = function (ev: ProgressEvent<FileReader>) {
        base64data = ev.target?.result;
        console.log(base64data);
    };
    if base64data.is
    return base64data;
}

export function savePresentationAsJson(editor: Editor) {
    if (editor.presentation.slidesList.length === 0) {
        alert('Нельзя сохранить пустую презентацию');
    } else {
        const newSlideList: Slide[] = editor.presentation.slidesList.map((slide) => {
            const newElementsListPromise = slide.elementsList.map(async (elem) => {
                if (isPicture(elem.content)) {
                    elem.content.raw = await getBase64(elem.content.src);
                }
                return elem;
            });
            const newElementsList: SlideElement[] = [];
            newElementsListPromise.map((elem) => {
                elem.then((r) => {
                    console.log('r', r);
                    newElementsList.push(r);
                });
            });

            return {
                ...slide,
                elementsList: newElementsList,
            };
        });
        const presentation: Presentation = {
            ...editor.presentation,
            slidesList: [...newSlideList],
        };
        console.log(presentation);
        const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(presentation));
        const downloadAnchorNode = document.createElement('a');
        downloadAnchorNode.setAttribute('href', dataStr);
        downloadAnchorNode.setAttribute('download', editor.presentation.name + '.json');
        document.body.appendChild(downloadAnchorNode); // required for firefox
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
    }
}

export function uploadPresentationFromJson(s: string): Editor {
    return {
        ...initEditor(),
        presentation: JSON.parse(s),
    };
}

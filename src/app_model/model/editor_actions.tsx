import { jsPDF } from 'jspdf';
import canvg from 'canvg';

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

export function savePresentationAsPdf(editor: Editor) {
    const svg = document.getElementsByTagName('svg');
    const slides: string[] = [];
    for (let index = 0; index < svg.length; index++) {
        const element = svg[index] as Element;
        if (element.getAttribute('id') === 'slide-list-item') {
            const html = element.outerHTML.replace(/\r?\n|\r/g, '').trim();
            slides.push(html);
        }
    }
    slides.forEach((element) => {
        console.log(element);
    });
    const canvas = document.createElement('canvas');
    canvg.fromString(canvas, slides[0], {
        offsetX: -500,
        offsetY: -200,
        scaleWidth: 100,
        scaleHeight: 100,
    });
    const imageData = canvas.toDataURL('image/png');
    const doc = new jsPDF({
        orientation: 'landscape',
        unit: 'px',
    });
    console.log(doc);
    doc.addImage(imageData, 'PNG', -500, -200, 1000, 1000);
    doc.save();
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

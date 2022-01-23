import { jsPDF } from 'jspdf';
import 'svg2pdf.js';

import { ViewModelType } from '../view_model/types';

import { initEditor } from './init_model_action';
import { Editor, Presentation } from './types';

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

export function savePresentationAsPdf(editor: Editor, viewModel: ViewModelType) {
    let slideWidth = 0;
    let slideHeight = 0;
    const doc = new jsPDF({
        orientation: 'landscape',
        unit: 'px',
    });
    const element = document.getElementsByTagName('svg');
    const slides: Element[] = [];
    for (let index = 0; index < element.length; index++) {
        if (element[index].getAttribute('id') === 'hidden-slide') {
            const slide = element[index] as Element;
            slides.push(element[index] as Element);
            slideWidth = parseFloat(slide.getAttribute('width')!);
            slideHeight = parseFloat(slide.getAttribute('height')!);
            doc.addPage();
        }
    }
    doc.deletePage(1);
    doc.svg(slides[0]).then(() => {
        slides.forEach((slide, index) => {
            console.log(slide);
            doc.setPage(index);
            doc.svg(slide);
            if (index >= slides.length - 1) {
                doc.save('myPDF.pdf');
            }
        });
    });
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

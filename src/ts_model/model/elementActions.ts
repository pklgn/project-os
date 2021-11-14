import { getCurrSlide, applySlideChanges } from "./slidesActions";
import { Editor, Size, Slide, SlideElement } from "./types";

export function moveElementsToBackgroundOrForeground(editor: Editor, way: boolean): Editor {
    if (!editor.selectedSlidesIds.length || !editor.presentation.slidesList.length) {
        return editor;
    }

    const currSlide: Slide = getCurrSlide(editor);
    const slideIndex = editor.presentation.slidesList.findIndex(item => {
        return item.id === currSlide.id;
    });

    if (!currSlide.elementsList.length) {
        return editor;
    }

    const movedElementList: SlideElement[] = currSlide.elementsList.filter(item => 
        editor.selectedSlideElementsIds.includes(item.id)
    );

    const unmovedElementList: SlideElement[] = currSlide.elementsList.filter(item => 
        !editor.selectedSlideElementsIds.includes(item.id)
    );

    const updatedElementList: SlideElement[] = (way) 
        ? [...movedElementList, ...unmovedElementList]
        : [...unmovedElementList, ...movedElementList];

    const updatedSlide: Slide = {
        ...currSlide,
        elementsList: updatedElementList,
    }
    const updatedEditor = applySlideChanges(editor, updatedSlide, slideIndex);

    return {
        ...updatedEditor,
        selectedSlidesIds: [currSlide.id],
    }
}

export function moveElementsBackOrForward(editor: Editor, way: boolean) {
    //TODO Раф
}

export function changeElementsSize(editor: Editor, scaleX: number, scaleY: number): Editor {
    const scale: Size = {
        width: scaleX,
        height: scaleY,
    }

    if (!editor.selectedSlidesIds.length || !editor.presentation.slidesList.length) {
        return editor;
    }

    const currSlide: Slide = getCurrSlide(editor);
    const slideIndex = editor.presentation.slidesList.findIndex(item => {
        return item.id === currSlide.id;
    });

    if (!currSlide.elementsList.length) {
        return editor;
    }

    const updatedElementList: SlideElement[] = currSlide.elementsList.map(item => {
        if (editor.selectedSlideElementsIds.includes(item.id)) {
            const size: Size = {
                width: item.size.width * scale.width,
                height: item.size.height * scale.height,
            };

            return {
                ...item,
                size,
            };
        }

        return item;
    });

    const updatedSlide: Slide = {
        ...currSlide,
        elementsList: updatedElementList,
    }
    const updatedEditor = applySlideChanges(editor, updatedSlide, slideIndex);

    return {
        ...updatedEditor,
        selectedSlidesIds: [currSlide.id],
    }
}

export function changeElementsOpacity(editor: Editor, opacity: number): Editor {
    //TODO Лёня
    if (!editor.selectedSlidesIds.length || !editor.presentation.slidesList.length) {
        return editor;
    }

    const currSlide: Slide = getCurrSlide(editor);
    const slideIndex = editor.presentation.slidesList.findIndex(item => {
        return item.id === currSlide.id;
    });

    if (!currSlide.elementsList.length) {
        return editor;
    }


    const newElementsList: SlideElement[] = currSlide.elementsList.filter(item => {
        if (editor.selectedSlideElementsIds.includes(item.id)) {
            return {
                ...item,
                opacity,
            }
        }
        return item;
    })

    const newSlide: Slide = {
        ...currSlide,
        elementsList: newElementsList,
    }

    const updatedEditor = applySlideChanges(editor, newSlide, slideIndex);

    return {
        ...updatedEditor,
        selectedSlidesIds: [currSlide.id],
        selectedSlideElementsIds: [],
    }
}

export function removeSelectedElements(editor: Editor): Editor {
    if (!editor.selectedSlidesIds.length || !editor.presentation.slidesList.length) {
        return editor;
    }

    const currSlide: Slide = getCurrSlide(editor);
    const slideIndex = editor.presentation.slidesList.findIndex(item => {
        return item.id === currSlide.id;
    });

    if (!currSlide.elementsList.length) {
        return editor;
    }

    const updatedElementsList: SlideElement[] = currSlide.elementsList.filter(item => {
        return !editor.selectedSlideElementsIds.includes(item.id)
    })

    const updatedSlide: Slide = {
        ...currSlide,
        elementsList: updatedElementsList,
    }

    const updatedEditor = applySlideChanges(editor, updatedSlide, slideIndex);

    return {
        ...updatedEditor,
        selectedSlidesIds: [currSlide.id],
        selectedSlideElementsIds: [],
    }
}

//TODO Лёня
// save centerPoint func(t: Coordinates)

export function changeElementsPosition(editor: Editor, dx: number, dy: number): Editor {
    if (!editor.selectedSlidesIds.length || !editor.presentation.slidesList.length) {
        return editor;
    }

    const currSlide: Slide = getCurrSlide(editor);
    const slideIndex = editor.presentation.slidesList.findIndex(item => {
        return item.id === currSlide.id;
    });

    if (!currSlide.elementsList.length) {
        return editor;
    }


    const updatedElementsList: SlideElement[] = currSlide.elementsList.map(element => {
        if (editor.selectedSlideElementsIds.includes(element.id)) {
            return {
                ...element,
                centerPoint: {
                    x: element.centerPoint.x + dx,
                    y: element.centerPoint.y + dy,
                }
            }
        }

        return element;
    })

    const updatedSlide: Slide = {
        ...currSlide,
        elementsList: updatedElementsList,
    }

    const updatedEditor = applySlideChanges(editor, updatedSlide, slideIndex);

    return {
        ...updatedEditor,
        selectedSlidesIds: [currSlide.id],
    }
}
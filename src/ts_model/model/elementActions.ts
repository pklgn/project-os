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

export function moveElementsForeward(editor: Editor){
    if (!editor.selectedSlidesIds.length || !editor.presentation.slidesList.length) {
        return editor;
    }

    const currSlide: Slide = getCurrSlide(editor);
    const currElementsList = currSlide.elementsList
    if (!currElementsList.length) {
        return editor
    }

    const slideIndex = editor.presentation.slidesList.findIndex(item => {
        return item.id === currSlide.id;
    });

    function nextUnselectedIndex(index: number, elementsList: SlideElement[], selectedElements: string[]): number{
        const res = elementsList.slice(index).findIndex(item => 
            selectedElements.some(selId => 
                item.id === selId
            )
        )
        return (res === -1)
        ? res
        : res + index
    }

    var updatedElementList: SlideElement[] = []
    var first: number = 0
    var second: number = 0
    while (first !== -1) {
        if (editor.selectedSlideElementsIds.some(item => 
            item === currElementsList[first].id)) {
                second = nextUnselectedIndex(first, currElementsList, editor.selectedSlideElementsIds)
                second === -1
                ? updatedElementList.concat(currElementsList.slice(first))
                : updatedElementList
                  .concat(currElementsList.slice(second + 1, second + 2))
                  .concat(currElementsList.slice(first, second))
                first = second              
            }
        else {
            updatedElementList.push(currElementsList[first])
        }
        ++first
    }
    
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
    if (!editor.selectedSlidesIds.length || !editor.presentation.slidesList.length) {
        return editor;
    }

    const currSlide: Slide = getCurrSlide(editor);
    const currElementsList = currSlide.elementsList
    const slideIndex = editor.presentation.slidesList.findIndex(item => {
        return item.id === currSlide.id;
    });

    if (!currSlide.elementsList.length) {
        return editor;
    }


    const updatedElementList: SlideElement[] = []

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
                startPoint: {
                    x: element.startPoint.x + dx,
                    y: element.startPoint.y + dy,
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
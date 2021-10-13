import {Background, Editor, Presentation, Slide} from "./model/common"

export function initPresentation(): Presentation {
    return {
        name: "Оладушек",
        slidesList: [],
        selectedSlideIndexes: [-1]
    }
}

export function addSlide(editor: Editor, slideIndex: number): Presentation {
    const background: Background = {
        color: 'white',
        src: '',
    }

    const newSlide: Slide = {
        background,
        elementsList: [],
        selectedElementIndexes: [],
    }

    const slidesList: Slide[] = [
        ...editor.presentation.slidesList.slice(0, slideIndex),
        newSlide,
        ...editor.presentation.slidesList.slice(slideIndex)
    ]

    const updatedPresentation: Presentation = {
        ...editor.presentation,
        slidesList: slidesList,
        selectedSlideIndexes: [slideIndex + 1],
    }

    editor.history.states.push(updatedPresentation)
    editor.history.currState = editor.history.states.length - 1

    return updatedPresentation
}

export function changeSlideBackground(editor: Editor, slide: Slide, background: Background): Presentation {
    const newSlide: Slide = {
        ...slide,
        background,
    }

    const slideIndex: number = editor.presentation.slidesList.indexOf(slide)

    const updatedPresentation: Presentation = {
        ...editor.presentation,
        slidesList:
            [...editor.presentation.slidesList.slice(0, slideIndex),
                newSlide,
                ...editor.presentation.slidesList.slice(slideIndex + 1)],
        selectedSlideIndexes: [slideIndex]
    }

    editor.history.states.push(updatedPresentation)
    editor.history.currState = editor.history.states.length - 1

    return updatedPresentation
}

export function replaceSlides(editor: Editor, position: number): Presentation {
    const slidesList: Slide[] = [
        ...editor.presentation.slidesList.slice(0, position).map((element: Slide, index: number) => {
            if (editor.presentation.selectedSlideIndexes.indexOf(index) === undefined) {
                return element
            }
        }),
        ...editor.presentation.slidesList.map((element, index) => {
            if (editor.presentation.selectedSlideIndexes.indexOf(index) !== undefined) {
                return element
            }
        }),
        ...editor.presentation.slidesList.slice(position).map((element, index) => {
            if (editor.presentation.selectedSlideIndexes.indexOf(index) === undefined) {
                return element
            }
        })
    ]

    const newSlideIndexes: number[] = editor.presentation.selectedSlideIndexes.map((element, index) => {
        return position + index
    })

    const updatedPresentation: Presentation = {
        ...editor.presentation,
        slidesList: slidesList,
        selectedSlideIndexes: newSlideIndexes
    }

    editor.history.states.push(updatedPresentation)
    editor.history.currState = editor.history.states.length - 1

    return updatedPresentation
}

export function removeSelectedSlides(editor: Editor): Presentation {
    const slidesIndexesToRemove: number[] = editor.presentation.selectedSlideIndexes

    const slidesList: Slide[] = editor.presentation.slidesList.map((element: Slide, index: number) => {
        if (!slidesIndexesToRemove.includes(index)) {
            return element
        }
    })

    const selectedSlideIndex: number = getNearestUnselectedSlideIndex(editor)

    const updatedPresentation: Presentation = {
        ...editor.presentation,
        slidesList: slidesList,
        selectedSlideIndexes: [selectedSlideIndex],
    }

    editor.history.states.push(updatedPresentation)
    editor.history.currState = editor.history.states.length - 1

    return updatedPresentation
}

/**
 * @param {Editor} editor
 * @return {number}
 */
export function getNearestUnselectedSlideIndex(editor) {
    let currSlidesIndexes: number[] = []

    const slidesAmount: number = editor.presentation.slidesList.length
    for (let i = 0; i < slidesAmount; i++) {
        currSlidesIndexes.push(i)
    }

    const unselectedSlidesIndexes: number[] = currSlidesIndexes.map((element: number) => {
        if (!editor.presentation.selectedSlideIndexes.includes(element)) {
            return element
        }
    })

    if (!unselectedSlidesIndexes) {
        return -1
    }
    else {
        const lastSelectedSlideIndex: number = editor.presentation.selectedSlideIndexes.slice(-1)[0]
        if (lastSelectedSlideIndex < slidesAmount - 1) {
            unselectedSlidesIndexes.forEach((index) => {
                if (index > lastSelectedSlideIndex) {
                    return index
                }
            })
        }
        else {
            for (let i = lastSelectedSlideIndex; i >= 0; i--) {
                if (unselectedSlidesIndexes.indexOf(i) !== -1) {
                    return i
                }
            }
        }
    }
}

export function updatePresentationName(presentation: Presentation, name: string): Presentation {
    return {
        ...presentation,
        name,
    }
}

export function insertSlide(editor: Editor, newSlide: Slide, newSlideIndex: number): Presentation {
    return {
        ...editor.presentation,
        slidesList: [
            ...editor.presentation.slidesList.slice(0, newSlideIndex),
            newSlide,
            ...editor.presentation.slidesList.slice(newSlideIndex + 1),
        ],
        selectedSlideIndexes: [newSlideIndex]
    }
}
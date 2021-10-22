type Editor = {
    mode: PresentationMode,
    presentation: Presentation,
    history: History,
    selectedSlidesIds: string[],
    selectedSlideElementsIds: string[],
}

type PresentationMode = "edit" | "show"

type History = {
    currState: number,
    presentationStates: Presentation[],
    selectedSlidesIdsStates: string[][],
    selectedSlideElementsIdsStates: string[][],
}

type Presentation = {
    name: string,
    slidesList: Slide[],
}

type Slide = {
    id: string,
    background: Background,
    elementsList: SlideElement[],
}

type Background = {
    src: string
    color: string,
}

type SlideElement = {
    id: string,
    size: Size,
    opacity: number,
    content: TextElement | PictureElement | FigureElement,
    startPoint: Coordinates,
}

type Size = {
    width: number,
    height: number,
}

type TextElement = {
    content: string,
    fontSize: number,
    fontColor: string,
    fontStyle: string
}

type PictureElement = {
    src: string,
}

type FigureElement = {
    figureType: FigureShape,
    figureColor: string,
    borderWidth: number,
    borderColor: string
}

type Coordinates = {
    x: number,
    y: number,
}

enum FigureShape {
    Circle,
    Triangle,
    Rectangle,
}

export {
    Editor, Presentation, PresentationMode, History,
    Slide, Background, SlideElement, Size,
    TextElement, PictureElement,
    FigureElement, Coordinates, FigureShape
}
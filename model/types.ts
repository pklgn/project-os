type Editor = {
    mode: PresentationMode,
    presentation: Presentation,
    history: History,
    selectedSlidesIndexes: number[],
    selectedSlideElementsIndexes: number[],
}

type PresentationMode = "edit" | "show"

type History = {
    currState: number,
    states: Presentation[],
}

type Presentation = {
    name: string,
    slidesList: Slide[],
}

type Slide = {
    background: Background,
    elementsList: SlideElement[],
}

type Background = {
    src: string
    color: string,
}

type SlideElement = {
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
}

type PictureElement = {
    src: string,
}

type FigureElement = {
    type: FigureShape,
    color: string,
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
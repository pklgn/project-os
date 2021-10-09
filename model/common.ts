type Editor = {
    mode: PresentationMode, //mutable
    presentation: Presentation, //NOT mutable
    history: Presentation[], //mutable
    currPresentationState: number, //mutable
    selectedSlideIndexes: number[], //mutable
}

type PresentationMode = "edit" | "show"

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
    Editor, Presentation, PresentationMode, Slide,
    Background, SlideElement, Size,
    TextElement, PictureElement, 
    FigureElement, Coordinates, FigureShape
}
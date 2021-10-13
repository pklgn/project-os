export type Editor = {
    mode: PresentationMode, //mutable
    presentation: Presentation, //immutable
    history: History, //mutable
}

export type PresentationMode = "edit" | "show"

export type History = {
    currState: number,
    states: Presentation[],
}

export type Presentation = {
    name: string,
    slidesList: Slide[],
    selectedSlideIndexes: number[],
}

export type Slide = {
    background: Background,
    elementsList: SlideElement[],
    selectedElementIndexes: number[]
}

export type Background = {
    src: string
    color: string,
}

export type SlideElement = {
    size: Size,
    opacity: number,
    content: TextElement | PictureElement | FigureElement,
    startPoint: Coordinates,
}

export type Size = {
    width: number,
    height: number,
}

export type TextElement = {
    content: string,
    fontSize: number,
    fontColor: string,
}

export type PictureElement = {
    src: string,
}

export type FigureElement = {
    type: FigureShape,
    color: string,
}

export type Coordinates = {
    x: number,
    y: number,
}

export enum FigureShape {
    Circle,
    Triangle,
    Rectangle,
}
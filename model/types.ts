<<<<<<< HEAD:model/types.ts
export type Editor = {
    mode: PresentationMode,
    presentation: Presentation,
    history: History,
    selectedSlideIndexes: number[],
    selectedElementIndexes: number[]
}

export type PresentationMode = "edit" | "show"

export type History = {
    currState: number,
    states: Presentation[],
}

export type Presentation = {
    name: string,
    slidesList: Slide[],
}

export type Slide = {
    background: Background,
    elementsList: SlideElement[],
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
=======
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
>>>>>>> f0fbb15165f75a65c4be4b67b953ff09f4e729ab:model/common.ts
}
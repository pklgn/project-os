export type Editor = {
    mode: PresentationMode,
    presentation: Presentation,
    history: History,
    selectedSlidesIds: string[],
    selectedSlideElementsIds: string[],
};

export type PresentationMode = "edit" | "show";

export type History = {
    currState: number,
    presentationStates: Presentation[],
    selectedSlidesIdsStates: string[][],
    selectedSlideElementsIdsStates: string[][],
};

export type Presentation = {
    name: string,
    slidesList: Slide[],
};

export type Slide = {
    id: string,
    background: Background,
    elementsList: SlideElement[],
};

export type Background = {
    src: string
    color: string,
};

export type SlideElement = {
    id: string,
    startPoint: Coordinates,
    size: Size,
    angle: number,
    opacity: number,
    content: TextElement | PictureElement | FigureElement,
};

export type Size = {
    width: number,
    height: number,
};

export type TextElement = {
    content: string,
    fontSize: number,
    fontColor: string,
    fontStyle: string
};

export type PictureElement = {
    src: string,
};

export type FigureElement = {
    figureType: FigureShape,
    figureColor: string,
    borderWidth: number,
    borderColor: string
};

export type Coordinates = {
    x: number,
    y: number,
};

export enum FigureShape {
    Circle,
    Triangle,
    Rectangle,
}
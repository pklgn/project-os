export type Editor = {
    mode: PresentationMode;
    presentation: Presentation;
    history: History;
    selectedSlidesIds: string[];
    selectedSlideElementsIds: string[];
};

export type PresentationMode = 'edit' | 'show-from-first-slide' | 'show-from-current-slide';

export type History = {
    currState: number;
    presentationStates: Presentation[];
    selectedSlidesIdsStates: string[][];
    selectedSlideElementsIdsStates: string[][];
};

export type Presentation = {
    name: string;
    slidesList: Slide[];
};

export type Slide = {
    readonly id: string;
    background: Background;
    elementsList: SlideElement[];
};

export type Background = {
    src: string;
    color: string;
};

export type SelectedAreaDimensions = {
    width: number;
    height: number;
};

export type SelectedAreaLocation = {
    xy: Coordinates;
    dimensions: SelectedAreaDimensions;
};

export type SlideElement = {
    readonly id: string;
    startPoint: Coordinates;
    size: Size;
    opacity: number;
    content: TextElement | PictureElement | FigureElement;
};

export type Size = {
    width: number;
    height: number;
};

export type TextElement = {
    content: string[];
    fontSize: number;
    fontColor: string;
    fontStyle: string;
    fontFamily: string;
};

export type PictureElement = {
    src: string;
    alt: string;
};

export type FigureElement = {
    figureType: FigureShape;
    figureColor: string;
    borderWidth: number;
    borderColor: string;
};

export type Coordinates = {
    x: number;
    y: number;
};

export enum FigureShape {
    Circle,
    Triangle,
    Rectangle,
}

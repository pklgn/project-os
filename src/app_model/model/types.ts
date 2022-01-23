import CSS from 'csstype';

export type Editor = {
    presentation: Presentation;
    history: History;
    selectedSlidesIds: string[];
    selectedSlideElementsIds: string[];
};

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

export type AreaDimensions = {
    width: number;
    height: number;
};

export type AreaLocation = {
    xy: Coordinates;
    dimensions: AreaDimensions;
};

export type SlideElement = {
    readonly id: string;
    startPoint: Coordinates;
    size: Size;
    opacity: number;
    content: TextElement | PictureElement | FigureElement;
    transform?: CSS.Properties;
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

export type FigureInfo = {
    shape: FigureShape;
    xy: Coordinates;
};

export type LocationDeltas = {
    dXY: {
        dx: number;
        dy: number;
    };
    dDimensions: {
        dWidth: number;
        dHeight: number;
    };
};

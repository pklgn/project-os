enum Color {
    Red,
    Blue,
    Green,
    White,
    Yellow,
}

type PresentationMode = "edit" | "show"

type Editor = {
    mode: PresentationMode,
    presentation: Presentation,
    selectedSlidesList: Slide[],
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
    //TODO переделать color на строку, чтобы не было непонятных чисел
    src: string
    color: number,
}

type SlideElement = {
    id: string,
    opacity: number,
    content: TextElement | PictureElement | FigureElement,
    position: SlideElementPosition,
}

type SlideElementPosition = {
    startPoint: Coordinates,
    size: Size,
}

type Size = {
    width: number,
    height: number,
}

type Coordinates = {
    x: number,
    y: number,
}

type TextElement = {
    content: string,
    fontSize: number,
    fontColor: Color,
}

type PictureElement = {
    src: string,
}

enum FigureShape {
    Circle,
    Triangle,
    Rectangle,
}

type FigureElement = {
    type: FigureShape,
    color: Color,
}
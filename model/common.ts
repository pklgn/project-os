enum Color {
    Yellow,
    Green,
    Blue,
    Red,
}

type PresentationMode = "edit" | "show"

type Editor = {
    mode: PresentationMode,
    presentation: Presentation,
    selectedSlideList: Slide[],
}

type Presentation = {
    name: string,
    slideList: Slide[],
}

type Slide = {
    background: Color,
    elementList: SlideElement[],
}

type SlideElement = {
    id: string,
    opacity: number,
    content: TextElement | PictureElement | FigureElement,
    position: ElementPosition,
}


type ElementPosition = {
    startPoint: Coordinates,
    width: number,
    height: number,
}

type Coordinates = {
    x: number,
    y: number,
}

type TextElement = {
    content: string,
    color: Color,
    fontSize: number,
}

type PictureElement = {
    content: string,
}

enum FigureShape {
    Circle,
    Rectangle,
    Triangle,
}

type FigureElement = {
    type: FigureShape,
    color: Color,
}


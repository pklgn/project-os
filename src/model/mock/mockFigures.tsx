import {FigureShape, SlideElement} from "../types";
import {generateUUId} from "../utils/uuid";

const mockCircleFigureElement: SlideElement = {
    id: generateUUId(),
    startPoint: {
        x: 200,
        y: 400,
    },
    size: {
        width: 50,
        height: 50,
    },
    opacity: 1,
    content: {
        figureType: FigureShape.Circle,
        figureColor: '#fe3499',
        borderWidth: 1,
        borderColor: '#000000',
    }
}

const mockRectangleFigureElement: SlideElement = {
    id: generateUUId(),
    startPoint: {
        x: 200,
        y: 300,
    },
    size: {
        width: 30,
        height: 30,
    },
    opacity: 1,
    content: {
        figureType: FigureShape.Rectangle,
        figureColor: '#fe3499',
        borderWidth: 1,
        borderColor: '#000000',
    }
}

const mockTriangleFigureElement: SlideElement = {
    id: generateUUId(),
    startPoint: {
        x: 400,
        y: 300,
    },
    size: {
        width: 30,
        height: 30,
    },
    opacity: 1,
    content: {
        figureType: FigureShape.Triangle,
        figureColor: '#fe3499',
        borderWidth: 1,
        borderColor: '#000000',
    }
}

export {
    mockCircleFigureElement,
    mockRectangleFigureElement,
    mockTriangleFigureElement,
}
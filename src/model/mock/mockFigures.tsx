import { FigureShape, SlideElement } from '../types';
import { generateUUId } from '../utils/uuid';

const mockCircleFigureElement: SlideElement = {
    id: generateUUId(),
    startPoint: {
        x: 60,
        y: 60,
    },
    size: {
        width: 10,
        height: 10,
    },
    opacity: 1,
    content: {
        figureType: FigureShape.Circle,
        figureColor: '#fe3499',
        borderWidth: 1,
        borderColor: '#000000',
    },
};

const mockRectangleFigureElement: SlideElement = {
    id: generateUUId(),
    startPoint: {
        x: 10,
        y: 10,
    },
    size: {
        width: 5,
        height: 5,
    },
    opacity: 1,
    content: {
        figureType: FigureShape.Rectangle,
        figureColor: '#fe3499',
        borderWidth: 1,
        borderColor: '#000000',
    },
};

const mockTriangleFigureElement: SlideElement = {
    id: generateUUId(),
    startPoint: {
        x: 20,
        y: 30,
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
    },
};

export {
    mockCircleFigureElement,
    mockRectangleFigureElement,
    mockTriangleFigureElement,
};

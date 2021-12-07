import {Slide} from "../types";
import {generateUUId} from "../utils/uuid";
import {mockCircleFigureElement, mockRectangleFigureElement} from "./mockFigures";
import {mockText} from "./mockEditor";

const mockSlide: Slide = {
    id: generateUUId(),
    background: {
        src: '',
        color: '#000000',
    },
    elementsList: [
        mockCircleFigureElement,
        mockRectangleFigureElement,
        mockRectangleFigureElement,
        mockText,
    ]
}

export {
    mockSlide,
}
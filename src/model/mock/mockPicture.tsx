import {SlideElement} from "../types";
import {generateUUId} from "../utils/uuid";

const mockPicture: SlideElement = {
    id: generateUUId(),
    startPoint: {
        x: 0,
        y: 0,
    },
    size: {
        width: 50,
        height: 50,
    },
    opacity: 1,
    content: {
        src: 'C:/Users/pk_er/OneDrive/Изображения/test.png',
        alt: '',
    }
}

export {
    mockPicture,
}
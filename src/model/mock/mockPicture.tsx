import {SlideElement} from "../types";
import {generateUUId} from "../utils/uuid";

const mockPicture: SlideElement = {
    id: generateUUId(),
    startPoint: {
        x: 0,
        y: 100,
    },
    size: {
        width: 100,
        height: 100,
    },
    opacity: 1,
    content: {
        src: 'C:\\Users\\pk_er\\OneDrive\\Рабочий стол\test.png',
        alt: '',
    }
}

export {
    mockPicture,
}
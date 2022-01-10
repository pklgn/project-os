import { SlideElement } from '../types';
import { generateUUId } from '../utils/uuid';

const mockPicture: SlideElement = {
    id: generateUUId(),
    startPoint: {
        x: 25,
        y: 25,
    },
    size: {
        width: 50,
        height: 50,
    },
    opacity: 1,
    content: {
        src: 'D:/downloads/browser/1.jpg',
        alt: '',
    },
};

export { mockPicture };

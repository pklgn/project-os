import { Coordinates } from '../../model/types';
import { useEffect } from 'react';

const INITIAL_SCALE = 1;

export function useDragAndDrop(
    element: SVGGeometryElement | null,
    position: Coordinates,
    setPosition: (coordinates: Coordinates) => void,
): void {
    let startPosition: Coordinates;
    const scale = parseFloat(element?.parentElement?.dataset.scale ?? `${INITIAL_SCALE}`);
    function onMouseDown(event: MouseEvent) {
        startPosition = {
            x: event.pageX,
            y: event.pageY,
        };
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    }

    function onMouseUp() {
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
    }

    function onMouseMove(e: MouseEvent) {
        const delta = {
            x: e.pageX - startPosition.x,
            y: e.pageY - startPosition.y,
        };
        const newPosition = {
            x: position.x + delta.x / scale,
            y: position.y + delta.y / scale,
        };

        setPosition(newPosition);
    }

    useEffect(() => {
        if (element) {
            element.addEventListener('mousedown', onMouseDown);
        }
        return () => {
            if (element) {
                element.removeEventListener('mousedown', onMouseDown);
            }
        };
    });
}

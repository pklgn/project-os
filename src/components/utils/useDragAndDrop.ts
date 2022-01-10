import { Coordinates, SelectedAreaLocation } from '../../model/types';
import { useEffect } from 'react';

const INITIAL_SCALE = 2;

export function useDragAndDrop(
    element: SVGRectElement | null,
    position: SelectedAreaLocation,
    setPosition: (coordinates: SelectedAreaLocation) => void,
): void {
    let startDragPosition: Coordinates;
    const scale = parseFloat(element?.parentElement?.dataset.scale ?? `${INITIAL_SCALE}`);
    function onMouseDown(event: MouseEvent) {
        startDragPosition = {
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
            x: e.pageX - startDragPosition.x,
            y: e.pageY - startDragPosition.y,
        };
        const newPosition = {
            x: position.xy.x + delta.x,
            y: position.xy.y + delta.y,
        };

        const newSelectedAreaLocation: SelectedAreaLocation = {
            xy: newPosition,
            dimensions: position.dimensions,
        };

        setPosition(newSelectedAreaLocation);
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

import { Coordinates, AreaLocation } from '../../app_model/model/types';
import { useEffect } from 'react';

export type DragAndDropParamsType = {
    element: SVGRectElement | null;
    position: AreaLocation;
    setPosition: (coordinates: AreaLocation) => void;
};

export function useDragAndDrop(params: DragAndDropParamsType): void {
    const { element, position, setPosition } = params;
    let startDragPosition: Coordinates;
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

        const newSelectedAreaLocation: AreaLocation = {
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

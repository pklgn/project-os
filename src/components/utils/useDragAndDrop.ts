import {Coordinates} from "../../model/types";
import {useEffect} from "react";

function useDragAndDrop(element: SVGCircleElement|SVGRectElement|SVGPolygonElement|null,
                        position: Coordinates,
                        setPosition: (coordinates: Coordinates) => void,

) {
    let startPosition: Coordinates

    function onMouseMove(e: MouseEvent) {
        const delta = {
            x: e.pageX - startPosition.x,
            y: e.pageY - startPosition.y,
        }
        const newPosition = {
            x: position.x + delta.x,
            y: position.y + delta.y,
        }

        setPosition(newPosition)
    }

    useEffect(() => {
        if (document) {
            document.addEventListener('mousedown', onMouseDown)
        }

        function onMouseDown(event: MouseEvent) {
            startPosition = {
                x: event.pageX,
                y: event.pageY,
            }

            document.addEventListener('mousemove', onMouseMove)
            document.addEventListener('mouseup', onMouseUp)
        }
    }, [])

    function onMouseUp() {
        document.removeEventListener('mousemove', onMouseMove)
        document.removeEventListener('mouseup', onMouseUp)
    }
}

export {
    useDragAndDrop
}
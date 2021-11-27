import {Coordinates, FigureElement, FigureShape, Size, SlideElement} from "../../model/types";
import {isFigure} from "../../model/utils/tools";
import {CircleFigure} from "./FigureElements/CircleFigure";
import {RectangleFigure} from "./FigureElements/RectangleFigure";
import {TriangleFigure} from "./FigureElements/TriangleFigure";
import React, {useState} from "react";

type FigureElementProps = {
    element: SlideElement,
    slideRef: HTMLDivElement|null,
}

export type FigureProps = {
    startPoint: Coordinates,
    size: Size,
    opacity: number,
    content: FigureElement,
    onMouseDown: (event: MouseEvent) => void
    onMouseUp: (event: MouseEvent) => void
}

function getFigureElement(element: SlideElement): FigureElement | undefined {
    let figureElement: FigureElement | undefined;

    if (isFigure(element.content)) {
        figureElement = element.content;
    } else {
        figureElement = undefined;
    }

    return figureElement;
}

function FigureElementComponent(props: FigureElementProps) {
    const figureElement = getFigureElement(props.element)
    const [position, setPosition] = useState({
        x: 0,
        y: 0,
        mouseCoordinates: {
            x: 0,
            y: 0,
        },
    })

    if (!figureElement) {
        return null;
    }

    function onMouseDown(event: MouseEvent) {
        setPosition((prevState) => ({
            ...prevState,
            mouseCoordinates: {
                x: event.pageX ?? 0,
                y: event.pageY ?? 0,
            },
        }))
        console.log('onMouseDown')
        props.slideRef && props.slideRef.addEventListener('mousemove', onMouseMove)
    }


    function onMouseUp(event: MouseEvent) {
        props.slideRef && props.slideRef.removeEventListener('mousemove', onMouseMove)
        setPosition((prevState) => ({
            ...prevState,
            mouseCoordinates: {
                x: 0,
                y: 0,
            }
        }))
        console.log()
    }

    function onMouseMove(event: MouseEvent) {
        const dx = position.mouseCoordinates.x - event.pageX
        const dy = position.mouseCoordinates.y - event.pageY
        setPosition(() => ({
            x: position.x - dx,
            y: position.y - dy,
            mouseCoordinates: {
                x: event.pageX,
                y: event.pageY,
            }
        }))
    }


    const figureProps: FigureProps = {
        startPoint: props.element.startPoint,
        size: props.element.size,
        opacity: props.element.opacity,
        content: figureElement,
        onMouseDown,
        onMouseUp,
    }
    const figureShape = figureElement.figureType

    switch (figureShape) {
        case FigureShape.Circle:
            return CircleFigure(figureProps);
        case FigureShape.Rectangle:
            return RectangleFigure(figureProps);
        case FigureShape.Triangle:
            return TriangleFigure(figureProps);
    }
}

export {
    FigureElementComponent,
}
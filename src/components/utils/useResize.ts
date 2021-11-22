import {useCallback, useState, RefObject, useLayoutEffect} from "react";

function useResize(ref: RefObject<HTMLElement>) {
    const [width, setWidth] = useState(0)
    const [height, setHeight] = useState(0)
    const trackResize = useCallback((entries: ResizeObserverEntry[]) => {
        if (!Array.isArray(entries)) {
            return null;
        }

        const element = entries[0]
        setWidth(element.contentRect.width)
        setHeight(element.contentRect.height)
    }, [])

    useLayoutEffect(() => {
        if (!ref.current) {
            return;
        }

        const customResizeObserver = new ResizeObserver((entries => {
            trackResize(entries)
        }))

        customResizeObserver.observe(ref.current)

        return () => customResizeObserver.disconnect()
    }, [ref])

    return [width, height]
}

export {
    useResize,
}
import { AreaLocation } from '../../app_model/model/types';
import { ElementsRatioType } from '../../app_model/view_model/types';

const RESIZER_ID = '-resize';

const NW_RESIZER_ID = 'nw' + RESIZER_ID;
const N_RESIZER_ID = 'n' + RESIZER_ID;
const NE_RESIZER_ID = 'ne' + RESIZER_ID;
const E_RESIZER_ID = 'e' + RESIZER_ID;
const SE_RESIZER_ID = 'se' + RESIZER_ID;
const S_RESIZER_ID = 's' + RESIZER_ID;
const SW_RESIZER_ID = 'sw' + RESIZER_ID;
const W_RESIZER_ID = 'w' + RESIZER_ID;

export {
    NW_RESIZER_ID,
    N_RESIZER_ID,
    NE_RESIZER_ID,
    E_RESIZER_ID,
    SE_RESIZER_ID,
    S_RESIZER_ID,
    SW_RESIZER_ID,
    W_RESIZER_ID,
};

export function getResizedSelectedAreaLocation(
    currSelectedAreaLocation: AreaLocation,
    dXY: {
        dx: number;
        dy: number;
    },
    resizerType: {
        itsNResizer: boolean | undefined;
        itsSResizer: boolean | undefined;
        itsWResizer: boolean | undefined;
        itsEResizer: boolean | undefined;
    },
): AreaLocation {
    const changingSideMinCord =
        resizerType.itsNResizer || resizerType.itsSResizer
            ? currSelectedAreaLocation.xy.y
            : currSelectedAreaLocation.xy.x;
    const changingDimension =
        resizerType.itsNResizer || resizerType.itsSResizer
            ? currSelectedAreaLocation.dimensions.height
            : currSelectedAreaLocation.dimensions.width;
    const changingSideMaxCoord = changingSideMinCord + changingDimension;

    const countedMinCord =
        resizerType.itsNResizer || resizerType.itsSResizer
            ? resizerType.itsNResizer
                ? currSelectedAreaLocation.xy.y + dXY.dy <= changingSideMaxCoord
                    ? currSelectedAreaLocation.xy.y + dXY.dy
                    : changingSideMaxCoord
                : changingSideMaxCoord + dXY.dy >= changingSideMinCord
                ? changingSideMinCord
                : changingSideMaxCoord + dXY.dy
            : resizerType.itsWResizer
            ? currSelectedAreaLocation.xy.x + dXY.dx <= changingSideMaxCoord
                ? currSelectedAreaLocation.xy.x + dXY.dx
                : changingSideMaxCoord
            : changingSideMaxCoord + dXY.dx >= changingSideMinCord
            ? changingSideMinCord
            : changingSideMaxCoord + dXY.dx;

    const countedDimensions = {
        width:
            resizerType.itsNResizer || resizerType.itsSResizer
                ? Math.abs(currSelectedAreaLocation.dimensions.width)
                : resizerType.itsWResizer
                ? Math.abs(currSelectedAreaLocation.dimensions.width - dXY.dx)
                : Math.abs(currSelectedAreaLocation.dimensions.width + dXY.dx),
        height:
            resizerType.itsEResizer || resizerType.itsWResizer
                ? Math.abs(currSelectedAreaLocation.dimensions.height)
                : resizerType.itsNResizer
                ? Math.abs(currSelectedAreaLocation.dimensions.height - dXY.dy)
                : Math.abs(currSelectedAreaLocation.dimensions.height + dXY.dy),
    };

    return {
        ...currSelectedAreaLocation,
        xy:
            resizerType.itsNResizer || resizerType.itsSResizer
                ? {
                      x: currSelectedAreaLocation.xy.x,
                      y: countedMinCord,
                  }
                : {
                      x: countedMinCord,
                      y: currSelectedAreaLocation.xy.y,
                  },
        dimensions: {
            width: countedDimensions.width,
            height: countedDimensions.height,
        },
    };
}

export function getResizersRenderInfoArr(
    selectedAreaLocation: AreaLocation | undefined,
    resizersSize: number,
    resizersOffset: number,
    renderScale: ElementsRatioType,
    windowRatio: number,
) {
    const scaledAreaLocation = {
        xy: {
            x: selectedAreaLocation ? selectedAreaLocation.xy.x * renderScale.width * windowRatio : 0,
            y: selectedAreaLocation ? selectedAreaLocation.xy.y * renderScale.height * windowRatio : 0,
        },
        dimensions: {
            width: selectedAreaLocation ? selectedAreaLocation.dimensions.width * renderScale.width * windowRatio : 0,
            height: selectedAreaLocation
                ? selectedAreaLocation.dimensions.height * renderScale.height * windowRatio
                : 0,
        },
    };
    const resizersCords = {
        xyStart: {
            x: scaledAreaLocation.xy.x - resizersOffset,
            y: scaledAreaLocation.xy.y - resizersOffset,
        },
        halfs: {
            width: (scaledAreaLocation.dimensions.width - resizersSize) / 2 + resizersOffset,
            height: (scaledAreaLocation.dimensions.height - resizersSize) / 2 + resizersOffset,
        },
        dimensions: {
            width: scaledAreaLocation.xy.x + scaledAreaLocation.dimensions.width - resizersSize + resizersOffset,
            height: scaledAreaLocation.xy.y + scaledAreaLocation.dimensions.height - resizersSize + resizersOffset,
        },
    };

    return [
        {
            id: NW_RESIZER_ID,
            x: resizersCords.xyStart.x,
            y: resizersCords.xyStart.y,
            className: NW_RESIZER_ID,
        },
        {
            id: N_RESIZER_ID,
            x: resizersCords.xyStart.x + resizersCords.halfs.width,
            y: resizersCords.xyStart.y,
            className: N_RESIZER_ID,
        },
        {
            id: NE_RESIZER_ID,
            x: resizersCords.dimensions.width,
            y: resizersCords.xyStart.y,
            className: NE_RESIZER_ID,
        },
        {
            id: E_RESIZER_ID,
            x: resizersCords.dimensions.width,
            y: resizersCords.xyStart.y + resizersCords.halfs.height,
            className: E_RESIZER_ID,
        },
        {
            id: SE_RESIZER_ID,
            x: resizersCords.dimensions.width,
            y: resizersCords.dimensions.height,
            className: SE_RESIZER_ID,
        },
        {
            id: S_RESIZER_ID,
            x: resizersCords.xyStart.x + resizersCords.halfs.width,
            y: resizersCords.dimensions.height,
            className: S_RESIZER_ID,
        },
        {
            id: SW_RESIZER_ID,
            x: resizersCords.xyStart.x,
            y: resizersCords.dimensions.height,
            className: SW_RESIZER_ID,
        },
        {
            id: W_RESIZER_ID,
            x: resizersCords.xyStart.x,
            y: resizersCords.xyStart.y + resizersCords.halfs.height,
            className: W_RESIZER_ID,
        },
    ];
}

import styles from "./ClickHandlerLayer.module.css";
import { BaseSyntheticEvent } from "react";

export type ClickHandlerLayerType = {
    clickHandlerLayer: JSX.Element,
    resetClickState: () => void,
}

export function ClickHandlerLayer(): ClickHandlerLayerType {

    const onClickHandler = (_: BaseSyntheticEvent) => {
        console.log('click layer!');
    }

    const resetClickState = () => {
        //
    }

    return {
        clickHandlerLayer: <div
          className={styles["click-handler-layer"]}
          onClick={onClickHandler}
        ></div>,
        resetClickState: resetClickState
    }
}
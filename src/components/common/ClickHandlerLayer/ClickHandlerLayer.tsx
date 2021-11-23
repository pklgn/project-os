import styles from "./ClickHandlerLayer.module.css";
import { BaseSyntheticEvent, useState } from "react";

export type ClickHandlerType = {
    clickHandlerLayer: JSX.Element,
    clickHandled: boolean,
    falsingStateFunc: () => void
}

export function ClickHandlerLayer(): ClickHandlerType {
    const [wasClick, setClickState] = useState(false);

    const onClickHandler = (_: BaseSyntheticEvent) => {
        setClickState(true);
    }

    const resetClickState = () => {
        setClickState(false);
    }

    return {
        clickHandlerLayer: <div
          className={styles["click-handler-layer"]}
          onClick={onClickHandler}
        ></div>,
        clickHandled: wasClick,
        falsingStateFunc: resetClickState
    }
}
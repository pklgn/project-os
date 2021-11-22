import styles from "./ClickHandlerLayer.module.css";
import { BaseSyntheticEvent, useState } from "react";

export type ClickHandlerType = {
    clickHandlerLayer: JSX.Element,
    clickHandled: boolean,
    falsingStateFunc: React.Dispatch<React.SetStateAction<boolean>>
}

export function ClickHandlerLayer(): ClickHandlerType {
    const [wasClick, setClickState] = useState(false);

    const onClickHandler = (_: BaseSyntheticEvent) => {
        setClickState(true);
    }

    return {
        clickHandlerLayer: <div
          className={styles["click-handler-layer"]}
          onClick={onClickHandler}
        ></div>,
        clickHandled: false,
        falsingStateFunc: setClickState
    }
}
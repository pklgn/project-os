import styles from "./SlideList.module.css";
import {Slide} from "../Slide/Slide";
import {useRef} from "react";

export function SlideList() {
    const ref = useRef<HTMLUListElement>(null)

    return <div
        className={styles['list-wrapper']}
    >
        <ul
            className={styles.list}
            ref={ref}
        >
            <li className={styles['list-item-wrapper']}>
                <div
                    className={styles['list-item']}
                >
                    <Slide/>
                    <div className={styles["prevent-pointer-events"]}/>
                </div>
            </li>
            <li className={styles['list-item-wrapper']}>
                <div
                    className={styles['list-item']}
                >
                    <Slide/>
                    <div className={styles["prevent-pointer-events"]}/>
                </div>
            </li>
            <li className={styles['list-item-wrapper']}>
                <div
                    className={styles['list-item']}
                >
                    <Slide/>
                    <div className={styles["prevent-pointer-events"]}/>
                </div>
            </li>
        </ul>
    </div>
}
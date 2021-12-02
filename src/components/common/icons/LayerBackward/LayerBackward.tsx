import styles from "./LayerBackward.module.css";

export function LayerBackward(): JSX.Element {
    return (
        <svg className={styles.layer_backward} x="0px" y="0px" opacity={styles.opacity} width={styles.width}
            height={styles.height} viewBox="0 0 24 24" enable-background="new 0 0 280.168 280.168" 
            fill="#208EB2">
            <path d="M0 0h24v24H0V0z" fill="none"/>
            <path d="M16 13h-3V3h-2v10H8l4 4 4-4zM4 19v2h16v-2H4z"/>
        </svg>
    );
}
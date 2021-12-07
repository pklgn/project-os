import styles from "./LayerForeground.module.css";

export function LayerForeground(): JSX.Element {
    return (
        <svg className={styles.layer_forward} x="0px" y="0px" opacity={styles.opacity} width={styles.width}
            height={styles.height} viewBox="0 0 24 24" enable-background="new 0 0 280.168 280.168" 
            fill="#208EB2">
            <path d="M0 0h24v24H0V0z" fill="none"/>
            <path d="M8 11h3v10h2V11h3l-4-4-4 4zM4 3v2h16V3H4z"/>
        </svg>
    );
}
import styles from "./Opacity.module.css";

export function Opacity(): JSX.Element {
    return (
        <svg className={styles.opacity} x="0px" y="0px" width={styles.width} height={styles.height} 
            fill="#208EB2" viewBox="0 0 24 24" enable-background="0 0 24 24" opacity={styles.opacity}>
            <path d="M24 0H0v24h24V0zm0 0H0v24h24V0zM0 24h24V0H0v24z" fill="none"/>
            <path d="M17.66 8L12 2.35 6.34 8C4.78 9.56 4 11.64 4 13.64s.78 4.11 2.34 5.67 3.61 2.35 5.66 2.35 
            4.1-.79 5.66-2.35S20 15.64 20 13.64 19.22 9.56 17.66 8zM6 14c.01-2 .62-3.27 1.76-4.4L12 5.27l4.24 
            4.38C17.38 10.77 17.99 12 18 14H6z"/>
        </svg>
    );
}
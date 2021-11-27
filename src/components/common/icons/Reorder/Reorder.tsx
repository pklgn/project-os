import styles from "./Reorder.module.css";

export function Reorder(): JSX.Element {
    return (
        <svg className={styles.reorder} version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
            width={styles.width} height={styles.height} opacity={styles.opacity}
            viewBox="0 0 280.168 280.168" enable-background="new 0 0 280.168 280.168">
        <g>
            <path fill = "#1A7492" d="M0,183.842l140.084-70.042l140.084,70.033l-140.084,
            70.042L0,183.842z"/>
            <path fill = "#208EB2" d="M0,140.079l140.084-70.033l140.084,70.042l-140.084,
            70.024L0,140.079z"/>
            <path fill = "#26A6D1" d="M0,96.326l140.084-70.033l140.084,70.042l-140.084,
            70.024L0,96.326z"/>
        </g>
        </svg>   
    );
}
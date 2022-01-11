import styles from './Reorder.module.css';

export function Reorder(): JSX.Element {
    return (
        <svg
            className={styles.reorder}
            x="0px"
            y="0px"
            width={styles.width}
            height={styles.height}
            opacity={styles.opacity}
            viewBox="0 0 280.168 280.168"
            fill="#EAA363"
        >
            <rect height="100%" width="100%" fill="#582C1E" rx="62" ry="62" />
            <path
                d="M0,183.842l140.084-70.042l140.084,70.033l-140.084,
            70.042L0,183.842z"
            />
            <path
                fill="#bb7b42"
                d="M0,140.079l140.084-70.033l140.084,70.042l-140.084,
            70.024L0,140.079z"
            />
            <path
                fill="#aa5b16"
                d="M0,96.326l140.084-70.033l140.084,70.042l-140.084,
            70.024L0,96.326z"
            />
        </svg>
    );
}

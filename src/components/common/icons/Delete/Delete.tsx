import styles from "./Delete.module.css";

export function Delete(): JSX.Element {
    return (
        <svg className={styles.delete} x="0px" y="0px" width={styles.width} height={styles.height} 
            opacity={styles.opacity} viewBox="0 0 512 512" enable-background="new 0 0 512 512">
            <g>
                <polygon fill="#CEE8FA" points="190.551,495.523 117.226,495.523 87.886,113.866 190.551,113.866 	"/>
                <polygon fill="#CEE8FA" points="394.773,495.523 321.448,495.523 321.448,113.866 424.112,113.866 	"/>
            </g>
            <g>
                <path fill="#2D527C" d="M468.321,97.389h-44.208H321.446H190.551H87.888h-44.21c-9.1,0-16.477,7.378-16.477,16.477
                    s7.377,16.477,16.477,16.477h28.95l28.168,366.444c0.661,8.585,7.818,15.213,16.429,15.213h73.325h51.333
                    c9.1,0,16.477-7.378,16.477-16.477s-7.377-16.477-16.477-16.477H207.03V130.343h97.941v365.18c0,9.099,7.378,16.477,16.477,16.477
                    h73.327c8.611,0,15.769-6.629,16.429-15.213l28.169-366.444h28.949c9.099,0,16.477-7.378,16.477-16.477
                    S477.419,97.389,468.321,97.389z M174.074,479.046h-41.589L105.68,130.343h68.394V479.046L174.074,479.046z M379.513,479.046
                    h-41.59V130.343h68.397L379.513,479.046z"/>
                <path fill="#2D527C" d="M332.693,75.578c-9.099,0-16.477-7.379-16.477-16.477V32.954H201.899V59.1
                    c0,9.099-7.377,16.477-16.477,16.477s-16.477-7.379-16.477-16.477V16.477C168.944,7.378,176.321,0,185.421,0h147.272
                    c9.099,0,16.477,7.378,16.477,16.477V59.1C349.17,68.201,341.794,75.578,332.693,75.578z"/>
            </g>
        </svg>    
    );
}
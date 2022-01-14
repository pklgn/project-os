import styles from './VerticalLine.module.css';

export function VerticalLine(props: { id: string }): JSX.Element {
    return <div className={styles.vertical_line} id={props.id}></div>;
}

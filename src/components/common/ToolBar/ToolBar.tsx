import styles from './ToolBar.module.css';

export type ToolBarProps = {
    children: JSX.Element[];
};

export function ToolBar(props: ToolBarProps) {
    return (
        <div className={styles['tool-bar']}>
            {props.children.map((element) => {
                return element;
            })}
        </div>
    );
}

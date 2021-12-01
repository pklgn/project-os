import styles from './AdaptiveInputField.module.css'

export function AdaptiveInputField(): JSX.Element {
    return (
        <input
          className={styles.input}
          type="text"
        />
    );
}
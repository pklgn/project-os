import { BaseSyntheticEvent } from 'react';
import styles from './AdaptiveInputField.module.css'

export function AdaptiveInputField(props: {
    value: string,
    onChange: (_: BaseSyntheticEvent) => void
}): JSX.Element {
    return (
        <input
            className={styles.input}
            type="text"
            value={props.value}
            onChange={props.onChange}
        />
    );
}
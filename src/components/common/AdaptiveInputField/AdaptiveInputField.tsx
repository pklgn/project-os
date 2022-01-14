import { BaseSyntheticEvent } from 'react';
import styles from './AdaptiveInputField.module.css';

export type AddaptiveInputFieldPropsType = {
    value: string;
    id: string;
    maxLength: number;
    onChange: (event: BaseSyntheticEvent) => void;
    onBlur: (event: BaseSyntheticEvent) => void;
};

export function AdaptiveInputField(props: AddaptiveInputFieldPropsType): JSX.Element {
    return (
        <input
            id={props.id}
            className={styles.input}
            type="text"
            maxLength={props.maxLength}
            value={props.value}
            onChange={props.onChange}
            onBlur={props.onBlur}
        />
    );
}

import { BaseSyntheticEvent, CSSProperties } from 'react';
import styles from './AdaptiveInputField.module.css';

export type AdaptiveInputFieldPropsType = {
    value: string;
    id: string;
    maxLength: number;
    onChange: (event: BaseSyntheticEvent) => void;
    onBlur: (event: BaseSyntheticEvent) => void;
    cssMix?: CSSProperties;
};

export function AdaptiveInputField(props: AdaptiveInputFieldPropsType): JSX.Element {
    return (
        <input
            id={props.id}
            className={styles['ghost-input']}
            type="text"
            maxLength={props.maxLength}
            value={props.value}
            onChange={props.onChange}
            onBlur={props.onBlur}
            style={props.cssMix}
        />
    );
}

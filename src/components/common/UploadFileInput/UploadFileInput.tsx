import { BaseSyntheticEvent, LegacyRef } from 'react';
import styles from './UploadFileInput.module.css';

export type UploadProps = {
    inputRef: LegacyRef<HTMLInputElement> | null;
    onChange: (e: BaseSyntheticEvent) => void;
    extensions: string[];
};

function UploadFileInput(props: UploadProps) {
    return (
        <input
            ref={props.inputRef}
            type="file"
            accept={props.extensions.join(', ')}
            onChange={props.onChange}
            className={styles['file-input']}
        />
    );
}

export { UploadFileInput };

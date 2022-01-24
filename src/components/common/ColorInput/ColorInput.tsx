import { BaseSyntheticEvent, useRef } from 'react';
import styles from './ColorInput.module.css';

export type UploadProps = {
    onInput: (e: BaseSyntheticEvent) => void;
    children?: JSX.Element;
};

function ColorInput(props: UploadProps) {
    const colorInputRef = useRef<HTMLInputElement>(null);
    const handleColorInputClick = (e: BaseSyntheticEvent) => {
        e.stopPropagation();
        colorInputRef.current?.click();
    };

    return (
        <div className={styles['color-input-container']}>
            <input
                ref={colorInputRef}
                type="color"
                onClick={handleColorInputClick}
                className={styles['color-input']}
                onInput={props.onInput}
            />
            {props.children !== undefined ? (
                <span onClick={handleColorInputClick}>{props.children}</span>
            ) : (
                <span className={styles['color-btn']} onClick={handleColorInputClick}>
                    {props.children}
                </span>
            )}
        </div>
    );
}

export { ColorInput };

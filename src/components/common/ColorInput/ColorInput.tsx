import { BaseSyntheticEvent, useEffect, useRef, useState } from 'react';
import styles from './ColorInput.module.css';

export type UploadProps = {
    onChange: (e: BaseSyntheticEvent) => void;
    onMouseDown: (e: BaseSyntheticEvent) => void;
};

function ColorInput(props: UploadProps) {
    const colorInputRef = useRef<HTMLInputElement>(null);
    const handleColorInputClick = () => {
        colorInputRef.current?.click();
    };

    return (
        <div className={styles['color-input-container']}>
            <input
                ref={colorInputRef}
                type="color"
                onClick={handleColorInputClick}
                className={styles['color-input']}
                onChange={props.onChange}
            />
            <span className={styles['color-btn']} onClick={handleColorInputClick}>
                {' '}
            </span>
        </div>
    );
}

export { ColorInput };

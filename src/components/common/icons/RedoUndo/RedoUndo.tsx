export function RedoUndoIcon(props: { turn: 'redo' | 'undo'; color: string }): JSX.Element {
    const reg = /^#([0-9a-f]{3}){1,2}$/i;
    return (
        <svg
            width="32"
            height="32"
            viewBox="0 0 25 12"
            fill="none"
            transform={props.turn === 'redo' ? 'scale(-1, 1)' : ''}
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M12.8212 1.36346C9.6083 1.36346 6.69849 2.53346 4.45552 4.43619L0.0908203 0.181641V10.818H11.0026L6.61363 6.53982C8.29889 5.16891 10.4449 4.318 12.8212 4.318C17.1132 4.318 20.7625 7.048 22.0356 10.818L24.909 9.89619C23.2237 4.94437 18.4589 1.36346 12.8212 1.36346Z"
                fill={`${reg.test(props.color) ? props.color : '#fff'}`}
            />
        </svg>
    );
}

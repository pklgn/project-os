export function GlobeIcon(props: { width: number; height: number; color: string }): JSX.Element {
    const reg = /^#([0-9a-f]{3}){1,2}$/i;
    return (
        <svg
            width={props.width}
            height={props.height}
            viewBox={`-2 -2 ${props.width}
            ${props.height}`}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M1.125 13.125C1.125 19.7524 6.49758 25.125 13.125 25.125C19.7524 25.125 25.125 19.7524 25.125 13.125C25.125 6.49758 19.7524 1.125 13.125 1.125C6.49758 1.125 1.125 6.49758 1.125 13.125Z"
                stroke={`${reg.test(props.color) ? props.color : '#fff'}`}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M14.1094 1.27637C14.1094 1.27637 17.625 5.906 17.625 12.9372C17.625 19.9685 14.1094 24.5982 14.1094 24.5982"
                stroke={`${reg.test(props.color) ? props.color : '#fff'}`}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M11.7656 24.5982C11.7656 24.5982 8.25 19.9685 8.25 12.9372C8.25 5.906 11.7656 1.27637 11.7656 1.27637"
                stroke={`${reg.test(props.color) ? props.color : '#fff'}`}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M1.95654 17.0391H23.9184"
                stroke={`${reg.test(props.color) ? props.color : '#fff'}`}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M1.95654 8.83594H23.9184"
                stroke={`${reg.test(props.color) ? props.color : '#fff'}`}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

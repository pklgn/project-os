type TriangleProps = {
    width: number;
    height: number;
    color: string;
};

export function Triangle(props: TriangleProps): JSX.Element {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={`${props.width}`}
            height={`${props.height}`}
            viewBox="0 0 81.601 90.666"
            fill={`${props.color}`}
        >
            <path d="M91.2,53.333,9.6,98.666V8Z" transform="translate(-9.6 -8)" />
        </svg>
    );
}

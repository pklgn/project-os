import styles from './Circle.module.css';

export function Circle(): JSX.Element {
    return (
        <svg
            viewBox="0 0 3 3"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
        >
            <circle cx="1" cy="1" r="1" />
        </svg>
    );
}
export function DeleteIcon(props: { color: string }): JSX.Element {
    const reg = /^#([0-9a-f]{3}){1,2}$/i;
    return (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_361_70)">
                <path
                    d="M10.3713 15.1776V17.8937H22.6284V15.1776H10.3713ZM16.4998 3.68652C9.45198 3.68652 3.68555 9.45295 3.68555 16.5008C3.68555 23.5487 9.45198 29.3151 16.4998 29.3151C23.5477 29.3151 29.3141 23.5487 29.3141 16.5008C29.3141 9.45295 23.5477 3.68652 16.4998 3.68652ZM16.4998 26.5294C10.8692 26.5294 6.47126 22.1314 6.47126 16.5008C6.47126 10.8702 10.8692 6.47224 16.4998 6.47224C22.1305 6.47224 26.5284 10.8702 26.5284 16.5008C26.5284 22.1314 22.1305 26.5294 16.4998 26.5294Z"
                    fill={reg.test(props.color) ? props.color : '#fff'}
                />
            </g>
            <defs>
                <clipPath id="clip0_361_70">
                    <rect width="30.6429" height="30.6429" fill="white" transform="translate(0.899902 0.900391)" />
                </clipPath>
            </defs>
        </svg>
    );
}

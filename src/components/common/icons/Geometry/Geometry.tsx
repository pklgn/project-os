export function GeometryIcon(props: { color: string }): JSX.Element {
    const reg = /^#([0-9a-f]{3}){1,2}$/i;
    return (
        <svg width="28" height="28" viewBox="2 2 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_362_90)">
                <path
                    d="M21.325 23.0664L11.7395 2.55792C11.5949 2.24762 11.0982 2.24762 10.9535 2.55792L1.36806 23.0664C1.30271 23.2037 1.31231 23.3669 1.39245 23.4962C1.47259 23.6255 1.61119 23.704 1.76105 23.704H20.932C21.0819 23.704 21.2213 23.6255 21.3006 23.4962C21.3799 23.3669 21.3895 23.2046 21.325 23.0664ZM2.45211 22.8123L11.3465 3.78308L20.241 22.8123H2.45211Z"
                    fill={`${reg.test(props.color) ? props.color : '#fff'}`}
                />
            </g>
            <path
                d="M21.0964 1.8623C15.8528 1.8623 11.5906 6.22365 11.5906 11.5892C11.5906 16.9548 15.8528 21.314 21.0964 21.314C26.34 21.314 30.6002 16.9548 30.6002 11.5892C30.6002 6.22365 26.34 1.8623 21.0964 1.8623ZM21.0964 2.60973C25.9483 2.60973 29.8739 6.6245 29.8739 11.5892C29.8739 16.5539 25.9483 20.5708 21.0964 20.5708C16.2445 20.5708 12.321 16.5539 12.321 11.5892C12.321 6.6245 16.2445 2.60973 21.0964 2.60973Z"
                fill={`${reg.test(props.color) ? props.color : '#fff'}`}
            />
            <g clipPath="url(#clip1_362_90)">
                <path
                    d="M8.5 10.1631C8.5 10.1631 8.5 16.7679 8.5 21C8.5 25.1168 8.5 31.5418 8.5 31.5418H29.4536L29.3929 10.1631H18.9464H8.5ZM28.7572 30.8292H9.25722V10.8757H28.7572V30.8292Z"
                    fill={`${reg.test(props.color) ? props.color : '#fff'}`}
                />
            </g>
            <defs>
                <clipPath id="clip0_362_90">
                    <rect width="20.8929" height="21.3787" fill="white" transform="translate(0.899902 2.3252)" />
                </clipPath>
                <clipPath id="clip1_362_90">
                    <rect width="20.8929" height="21.3787" fill="white" transform="translate(8.56079 10.1631)" />
                </clipPath>
            </defs>
        </svg>
    );
}

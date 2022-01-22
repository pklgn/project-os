export function AddSlideIcon(props: { color: string }): JSX.Element {
    const reg = /^#([0-9a-f]{3}){1,2}$/i;
    return (
        <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_358_63)">
                <path
                    d="M6.00694 8.56124H3.45337V26.4362C3.45337 27.8407 4.60248 28.9898 6.00694 28.9898H23.8819V26.4362H6.00694V8.56124ZM26.4355 3.4541H11.1141C9.70962 3.4541 8.56051 4.60321 8.56051 6.00767V21.3291C8.56051 22.7336 9.70962 23.8827 11.1141 23.8827H26.4355C27.84 23.8827 28.9891 22.7336 28.9891 21.3291V6.00767C28.9891 4.60321 27.84 3.4541 26.4355 3.4541ZM26.4355 21.3291H11.1141V6.00767H26.4355V21.3291ZM17.498 18.7755H20.0516V14.9452H23.8819V12.3916H20.0516V8.56124H17.498V12.3916H13.6677V14.9452H17.498V18.7755Z"
                    fill={`${reg.test(props.color) ? props.color : '#fff'}`}
                />
            </g>
            <defs>
                <clipPath id="clip0_358_63">
                    <rect width="30.6429" height="30.6429" fill="white" transform="translate(0.899902 0.900391)" />
                </clipPath>
            </defs>
        </svg>
    );
}

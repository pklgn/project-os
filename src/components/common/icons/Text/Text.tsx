export function TextIcon(props: { color: string }): JSX.Element {
    const reg = /^#([0-9a-f]{3}){1,2}$/i;
    return (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M8.96894 6.92646V10.0928C8.96894 10.6005 8.55735 11.0121 8.04966 11.0121C7.54194 11.0121 7.13037 10.6005 7.13037 10.0928V6.00722C7.13037 5.91002 7.14545 5.81635 7.17339 5.72843C7.29145 5.357 7.63912 5.08789 8.04966 5.08789H24.3924C24.7099 5.08789 24.9896 5.24866 25.1548 5.49319C25.2539 5.63991 25.3117 5.81678 25.3117 6.00718V6.00722V10.0928C25.3117 10.6005 24.9003 11.0121 24.3924 11.0121C23.8848 11.0121 23.4732 10.6005 23.4732 10.0928V6.92646H17.3447V25.5164H19.805C20.3127 25.5164 20.7243 25.9281 20.7243 26.4357C20.7243 26.9436 20.3127 27.355 19.805 27.355H12.655C12.1473 27.355 11.7357 26.9436 11.7357 26.4357C11.7357 25.9281 12.1473 25.5164 12.655 25.5164H15.0975V6.92646H8.96894Z"
                fill={`${reg.test(props.color) ? props.color : '#fff'}`}
            />
        </svg>
    );
}

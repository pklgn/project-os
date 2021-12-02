import logoDefault from '../../../assets/logos/logoOS.svg';
import logoNotDefault from '../../../assets/logos/logoMari.svg';

export function AppLogoSVG(props: {
    type: 'default' | '!default',
    height: number,
    width: number
}) {
    const src = (props.type === 'default')
        ? logoDefault
        : logoNotDefault;

    return (
        <img width={props.width} height={props.height} src={src} alt="app_logo" />
    );
}
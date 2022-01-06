import logoDefault from '../../../assets/logos/logoOS.png';
import logoNotDefault from '../../../assets/logos/logoMari.png';

export function AppLogoPng(props: { type: 'default' | '!default'; height: number; width: number }) {
    const src = props.type === 'default' ? logoDefault : logoNotDefault;

    return <img width={props.width} height={props.height} src={src} alt="app_logo" />;
}

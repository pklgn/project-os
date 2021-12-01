import logoDefault from '../../../../assets/logos/logoOS.svg';
import logoNotDefault from '../../../../assets/logos/logoMari.svg';
import styles from './AppLogo.module.css';

export function AppLogoSVG(props: {
    type: 'default' | '!default',
    height: number,
    width: number
}) {
    const src = (props.type === 'default')
        ? logoDefault
        : logoNotDefault;

    return (
        <img className={styles.logo} width={props.width} height={props.height} src={src} alt="app_logo" />
    );
}
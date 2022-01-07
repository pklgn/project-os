import styles from './Button.module.css';

import { Triangle } from '../icons/Triangle/Triangle';
import CSS from 'csstype';

export type ButtonContentType =
    | 'text'
    | 'icon'
    | 'textInSubMenu'
    | 'textInSubMenu'
    | 'iconAndTextInSubMenu'
    | 'iconAndTextInSubMenuAndHotkeyInfo'
    | 'subMenuSummoner'
    | 'iconAndSubMenuSummoner';

type ButtonState = 'disabled' | 'active';

type ButtonShapeType = 'square' | 'circle';

export type ButtonProps = {
    textInfo: string;
    hotKeyText: string | undefined;
    icon: JSX.Element | undefined;
    state: ButtonState;
    contentType: ButtonContentType;
    shape: ButtonShapeType;
    foo: () => void | undefined;
};

const TEXT = 'TEXT';
const ICON = 'ICON';
const SUMMONER = 'SUMMONER';
const HOTKEY = 'HOTKEY';

export function Button(
    props: ButtonProps = {
        textInfo: '',
        hotKeyText: undefined,
        icon: undefined,
        state: 'disabled',
        contentType: 'text',
        shape: 'square',
        foo: () => undefined,
    },
): JSX.Element {
    const { textInfo, hotKeyText, icon, state, contentType, shape, foo } = props;

    const buttonStyle = getButtonStyleByContentTypeAndState(contentType, state);

    const onClickHandler = () => {
        if (foo !== undefined) {
            foo();
        }
    };

    const cssShapeStyle: CSS.Properties = shape === 'circle' ? { borderRadius: '50%' } : { borderRadius: 0 };

    const button: JSX.Element = (
        <button className={styles[buttonStyle]} style={cssShapeStyle}>
            {contentType.toUpperCase().includes(ICON) ? <div className={styles.icon}>{icon}</div> : <></>}
            {contentType.toUpperCase().includes(TEXT) ? <div className={styles.text}>{textInfo}</div> : <></>}
            {contentType.toUpperCase().includes(SUMMONER) ? <Triangle width={10} height={10} color="grey" /> : <></>}
            {contentType.toUpperCase().includes(HOTKEY) ? <div className={styles.hotkey}>{hotKeyText}</div> : <></>}
        </button>
    );

    return button;
}

function getButtonStyleByContentTypeAndState(contentType: ButtonContentType, state: ButtonState): string {
    const upperContentType = contentType.toUpperCase();

    if (upperContentType.includes(ICON) && !upperContentType.includes(TEXT) && !upperContentType.includes(SUMMONER)) {
        return 'button-with-icon';
    }
    return 'default';
}

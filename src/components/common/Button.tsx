import {withMods} from '../utils/withMods'
import {useState} from "react";

function Button(props: {
    text: string;
    state: 'loading'|'disabled'|'default';
    onClick: () => void;
}) {
    const {
        text,
        state,
        onClick
    } = props

    const disabled = state === 'loading' || state === 'disabled'

    const [hover, setHover] = useState(false)

    return <button
        className={withMods('button', {
            'hover': hover && !disabled
        })}
        disabled={disabled}
        onClick={onClick}
        onMouseOver={() => setHover(true)}
        onMouseOut={() => setHover(false)}
    >
        <span>{text}</span>
    </button>
}

export {
    Button,
}
import React, {cloneElement, JSXElementConstructor, ReactElement} from "react";

export type ButtonComponentProps = {
    size: 'default'|'small'|'large',
    icon: JSX.Element|undefined,
    iconPosition: 'left'|'right'|undefined,
    text: string,
    state: 'default'|'disabled',
    design: 'text'|'icon'|'iconAndText'|'textAndIcon'|'iconAndTextAndIcon',
}

function ButtonComponent(props: ButtonComponentProps) {

    return <button>
        {props.iconPosition === 'left' && props.icon && cloneElement(props.icon, {
            className=''
        })}
        {props.text}
    </button>
}
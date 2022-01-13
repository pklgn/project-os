import styles from './Modal.module.css';

type ModalProps = {
    active: boolean;
    setActive: React.Dispatch<React.SetStateAction<boolean>>;
};

export function Modal(props: ModalProps): JSX.Element {
    return (
        <div className={props.active ? 'modal active' : 'modal'} onClick={() => props.setActive(false)}>
            <div
                className={props.active ? 'modal__content active' : styles.modal__content}
                onClick={(e) => e.stopPropagation()}
            >
                <input value="enter text"></input>
            </div>
        </div>
    );
}

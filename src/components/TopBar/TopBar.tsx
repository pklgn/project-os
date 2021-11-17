import {Button} from "../common/Button";
import './TopBar.module.css'

import styles from './TopBar.module.css'
console.log(styles)
function TopBar() {
    const mockData = [
        'Файл',
        'Вставка',
        'Показ слайдов',
    ]
    const buttonList = mockData.map(text => {
        return <Button text={text} state={"default"} onClick={() => console.log('hello')}/>
    })

    return <div
        className={styles['top-bar']}
    >
        <div
            className={styles['top-bar__text']}
        >
            <span>Презентация 1</span>
        </div>
        <div
            className={styles['top-bar__button-list']}
        >
            {buttonList}
        </div>
    </div>
}

export {
    TopBar,
}
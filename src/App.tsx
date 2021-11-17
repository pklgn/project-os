import "./App.css";
import {Button} from "./components/common/Button"

function App() {
    return <div>
        <Button text={'Первый компонент!'} state={"default"} onClick={() => console.log('onClick')}/>
    </div>
}

export default App;

import "./App.css";
import {Button} from "./components/common/Button"
import {TopBar} from "./components/TopBar/TopBar";

function App() {
    return <div>
        <TopBar/>
        <Button text={'Первый компонент!'} state={"default"} onClick={() => console.log('onClick')}/>
    </div>
}

export default App;

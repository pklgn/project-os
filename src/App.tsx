import "./App.css";
import { TopBar } from "./components/TopBar/TopBar";

function App() {
  return <PresentationEditor />;
}

function PresentationEditor(): JSX.Element {
  return (
    <div className="editor">
      <TopBar />
      <Center />
      <Bottom />
    </div>
  );
}

function Center(): JSX.Element {
  return (
    <div className="center">
      <SlideList />
      <Slide />
    </div>
  );
}

function Bottom(): JSX.Element {
  return (
    <div className="bottom">
      <SlideListTool />
      <SlideInfo />
    </div>
  );
}

function SlideList(): JSX.Element {
  return <div className="slides-list">slidelist</div>;
}

function Slide(): JSX.Element {
  return <div className="slide">Slide</div>;
}

function SlideListTool(): JSX.Element {
  return <div className="slides-list-tools">tools</div>;
}

function SlideInfo(): JSX.Element {
  return <div className="slide-info">slideInfo</div>;
}

export default App;

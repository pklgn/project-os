import { SetStateAction, useState } from 'react';
import logo from './assets/logos/logoMari.svg';
import './App.css';
import { initEditor } from './ts_model/model/initModelFunctions';
import { setSelectedIdInEditor, togglePresentationMode } from './ts_model/model/editorActions';
import { addSlide, deleteSelectedSlides } from './ts_model/model/slidesActions';
import { undo, redo, keep } from './ts_model/model/historyActions';
import { Slide } from './ts_model/model/types';

function App() {
  const [editor, setEditor] = useState(initEditor());

  const [selectedSlidesId, setSelectedSlidesId] = useState('');
  const [selectedElementsId, setSelectedElementsId] = useState('');

  const handleInputFirst = (event: { target: { value: SetStateAction<string>; }; }) => {
    setSelectedSlidesId(event.target.value);
  };

  const handleInputSecond = (event: { target: { value: SetStateAction<string>; }; }) => {
    setSelectedElementsId(event.target.value);
  };

  function undoState() {
    undo(editor);
  }

  function redoState() {
    redo(editor);
  }

  function keepState() {
    keep(editor);
  }

  function setSelectedIdState() {
    const selectedSlidesIds: string[] = selectedSlidesId.split(';');

    const selectedElementsIds: string[] = selectedElementsId.split(';');
    console.log(selectedSlidesIds);
    console.log(selectedElementsIds);

    setEditor(setSelectedIdInEditor(editor, selectedSlidesIds, selectedElementsIds));
  }

  function toggleEditorState() {
    setEditor(togglePresentationMode(editor));
  }

  function addSlideState() {
    setEditor(addSlide(editor));
  }

  function rmSlideState() {
    setEditor(deleteSelectedSlides(editor));
  }

  var slideAmount: number = -1;

  var listItems: any = editor.presentation.slidesList.map((slide: Slide) => {
    slideAmount++;
    return <li className="li_some" key={slide.id}>slideIndex: {slideAmount} | slideId: {slide.id}</li>
  }
  );

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

        <div className="functiton-block">History Functions</div>

        <button className="button-53" onClick={undoState}>undoState</button>
        <button className="button-53" onClick={redoState}>redoState</button>
        <button className="button-53" onClick={keepState}>keepState</button>

        <div className="functiton-block">Editor Functions</div>

        <button className="button-53" onClick={toggleEditorState}>toggleEditorMode</button>
        <input className="type-2" type="text" placeholder="Input;Slides;Ids;here" onChange={handleInputFirst} />
        <input className="type-2" type="text" placeholder="Input;Elements;Ids;here" onChange={handleInputSecond} />
        <button className="button-53" onClick={setSelectedIdState}>setSelectedIdState</button>


        <div className="functiton-block">Slide Functions</div>

        <button className="button-53" onClick={addSlideState}>addSlide</button>
        <button className="button-53" onClick={rmSlideState}>removeSelectedSlides</button>

        <div className="functiton-block">Dump your editor here</div>

        <button className="button-53" onClick={() => console.log(editor)}>seeEditor</button>
        <div>мод презентации: {editor.mode}</div>
        <div>кол-во слайдов: {editor.presentation.slidesList.length}</div>
        <div className="editor-info">{listItems}</div>
        <div></div>
      </header>
    </div>
  );
}

export default App;

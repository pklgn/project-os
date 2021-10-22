import React, { useState } from 'react';
import logo from './assets/logos/logoMari.svg';
import './App.css';
import { initEditor } from './ts_model/model/initModelFunctions';
import { setSelectedIdInEditor, togglePresentationMode } from './ts_model/model/editorActions';
import { addSlide, deleteSelectedSlides } from './ts_model/model/slidesActions';
import { undo, redo, keep } from './ts_model/model/historyActions';

function App() {
  const [editor, setEditor] = useState(initEditor());

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
    setEditor(setSelectedIdInEditor(editor, [], []));
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

  

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <button className="button-53" onClick={addSlideState}>addSlide</button>
        <button className="button-53" onClick={rmSlideState}>removeSlide</button>
        <button className="button-53" onClick={toggleEditorState}>toggleEditorMode</button>
        <button className="button-53" onClick={undoState}>undoState</button>
        <button className="button-53" onClick={redoState}>redoState</button>
        <button className="button-53" onClick={keepState}>keepState</button>
        <button className="button-53" onClick={setSelectedIdState}>setSelectedIdState</button>
        <button className="button-53" onClick={() => console.log(editor)}>seeEditor</button>
        <div>{editor.mode}</div>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;

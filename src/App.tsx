import {SetStateAction, useState} from 'react';
import logo from './assets/logos/logoMari.svg';
import './App.css';
import {initEditor} from './ts_model/model/initModelFunctions';
import {changePresentationName, setSelectedIdInEditor, togglePresentationMode} from './ts_model/model/editorActions';
import {addSlide, changeSelectedSlidesBackground, deleteSelectedSlides} from './ts_model/model/slidesActions';
import {keep, redo, undo} from './ts_model/model/historyActions';
import {addFigureElement, addPictureElement, addTextElement} from "./ts_model/model/actions";
import {Slide} from './ts_model/model/types';

function App() {
  const [editor, setEditor] = useState(initEditor());

  const [firstInput, setSelectedSlidesId] = useState('');
  const [secondInput, setSelectedElementsId] = useState('');

  const [thirdInput, setSelectedSlidesImgSrc] = useState('');
  const [fourthInput, setSelectedSlidesBackgroundColor] = useState('');

  const [fifthInput, setPresentationName] = useState('');

  const handleInputFirst = (event: { target: { value: SetStateAction<string>; }; }) => {
    setSelectedSlidesId(event.target.value);
  };

  const handleInputSecond = (event: { target: { value: SetStateAction<string>; }; }) => {
    setSelectedElementsId(event.target.value);
  };

  const handleInputThird = (event: { target: { value: SetStateAction<string>; }; }) => {
    setSelectedSlidesImgSrc(event.target.value);
  };

  const handleInputFourth = (event: { target: { value: SetStateAction<string>; }; }) => {
    setSelectedSlidesBackgroundColor(event.target.value);
  };

  const handleInputFifth = (event: { target: { value: SetStateAction<string>; }; }) => {
    setPresentationName(event.target.value);
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
    const selectedSlidesIds: string[] = firstInput.split(';');
    const selectedElementsIds: string[] = secondInput.split(';');
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

  function setSlideBackgroundState() {
    const imageSrc: string = thirdInput;
    const color: string = fourthInput;
    setEditor(changeSelectedSlidesBackground(editor, imageSrc, color));    
  }

  function setNewPresentationName() {
    setEditor(changePresentationName(editor, fifthInput));    
  }

  function addNewTextElement() {
    setEditor(addTextElement(editor, 200, 100));
  }

  function addNewPictureElement() {
    setEditor(addPictureElement(editor, 200, 100, 400, 600, 'path/to/picture'));
  }

  function addNewFigureElement() {
    setEditor(addFigureElement(editor, 0, 100, 200));
  }
  let slideAmount: number = -1;

  let listItems: any = editor.presentation.slidesList.map((slide: Slide) => {
    slideAmount++;
    const slideSrc: string = (slide.background.src)
    ? slide.background.src
    : slide.background.color;
    return <li className="li_some" key={slide.id}>slideIndex: {slideAmount} | slideId: {slide.id} | slideBackround: {slideSrc}</li>
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
        <input className="type-2" type="text" placeholder="Input Presentation name here" onChange={handleInputFifth} />
        <button className="button-53" onClick={setNewPresentationName}>setPresentationName</button>
        <button className="button-53" onClick={addNewTextElement}>addNewTextElement</button>
        <button className="button-53" onClick={addNewPictureElement}>addNewPictureElement</button>
        <button className="button-53" onClick={addNewFigureElement}>addNewFigureElement</button>



        <div className="functiton-block">Slide Functions</div>

        <button className="button-53" onClick={addSlideState}>addSlide</button>
        <button className="button-53" onClick={rmSlideState}>removeSelectedSlides</button>
        <input className="type-2" type="text" placeholder="Input background image's src here" onChange={handleInputThird} />
        <input className="type-2" type="text" placeholder="Input background color here" onChange={handleInputFourth} />
        <button className="button-53" onClick={setSlideBackgroundState}>changeSelectedSlidesBackground</button>

        <div className="functiton-block">Dump your editor here</div>

        <button className="button-53" onClick={() => console.log(editor)}>seeEditor in console</button>
        <div>название презентации: {editor.presentation.name}</div>
        <div>мод презентации: {editor.mode}</div>
        <div>кол-во слайдов: {editor.presentation.slidesList.length}</div>
        <div className="editor-info">{listItems}</div>
        <div></div>
      </header>
    </div>
  );
}

export default App;

import { useState, SetStateAction } from 'react';
import logo from './assets/logos/logoMari.svg';
import {
    addPictureElement,
    addFigureElement,
    changeElementsPosition,
    changeElementsSize,
    changeFiguresColor,
    removeSelectedElements
} from './ts_model/model/actions';
import {
    addTextElement,
    changeTextsSize,
    changeTextsContent,
    changeTextsColor,
    changeTextsStyle
} from './ts_model/model/actions/textActions';
import {
    setSelectedIdInEditor,
    togglePresentationMode,
    changePresentationName
} from './ts_model/model/editorActions';
import { undo, redo, keep } from './ts_model/model/historyActions';
import { initEditor } from './ts_model/model/initModelFunctions';
import {
    addSlide,
    deleteSelectedSlides,
    changeSelectedSlidesBackground
} from './ts_model/model/slidesActions';
import { FigureShape, Slide, SlideElement } from './ts_model/model/types';
import { isFigure, isPicture } from './ts_model/utils/tools';
import "./App.css";



function App() {
    const [editor, setEditor] = useState(initEditor());

    const [selectedSlidesIdInput, setSelectedSlidesId] = useState('');
    const [selectedElementsIdInput, setSelectedElementsId] = useState('');
    const [imageSrcInput, setSelectedSlidesImgSrc] = useState('');
    const [backgroundCOlorInput, setSelectedSlidesBackgroundColor] = useState('');
    const [presentationNameInput, setPresentationName] = useState('');
    const [XYCordsInput, setElementsXY] = useState('');
    const [figureShapeTypeInput, setFigureShapeInput] = useState('');
    const [pictureContentInput, setPictureContentInput] = useState('');
    const [textSizeInput, setTextSizeInput] = useState('');
    const [textColorInput, setTextColorInput] = useState('');
    const [textStyleInput, setTextStyleInput] = useState('');
    const [textContentInput, setTextContentInput] = useState('');

    const handleSelectedSlidesIdInput = (event: { target: { value: SetStateAction<string>; }; }) => {
        setSelectedSlidesId(event.target.value);
    }

    const handleSelectedElementsIdInput = (event: { target: { value: SetStateAction<string>; }; }) => {
        setSelectedElementsId(event.target.value);
    }

    const handleBackgroundImgSrcInput = (event: { target: { value: SetStateAction<string>; }; }) => {
        setSelectedSlidesImgSrc(event.target.value);
    }

    const handleBackgroundColorInput = (event: { target: { value: SetStateAction<string>; }; }) => {
        setSelectedSlidesBackgroundColor(event.target.value);
    }

    const handlePresentationNameInput = (event: { target: { value: SetStateAction<string>; }; }) => {
        setPresentationName(event.target.value);
    }

    const handleXYElementsCordsInput = (event: { target: { value: SetStateAction<string>; }; }) => {
        setElementsXY(event.target.value);
    }

    const handleFigureShapeInput = (event: { target: { value: SetStateAction<string>; }; }) => {
        setFigureShapeInput(event.target.value);
    }

    const handlePictureContentInput = (event: { target: { value: SetStateAction<string>; }; }) => {
        setPictureContentInput(event.target.value);
    }

    const handleTextSizeInput = (event: { target: { value: SetStateAction<string>; }; }) => {
        setTextSizeInput(event.target.value);
    }

    const handleTextColorInput = (event: { target: { value: SetStateAction<string>; }; }) => {
        setTextColorInput(event.target.value);
    }

    const handleTextStyleInput = (event: { target: { value: SetStateAction<string>; }; }) => {
        setTextStyleInput(event.target.value);
    }

    const handleTextContentInput = (event: { target: { value: SetStateAction<string>; }; }) => {
        setTextContentInput(event.target.value);
    }

    function getXYArr(XYCords: string): number[] {
        const XY: string[] = (XYCords !== '')
            ? (XYCords.split(';'))
            : ['1', '1'];
        return XY.map(coord => parseInt(coord));
    }

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
        const selectedSlidesIds: string[] = (selectedSlidesIdInput)
            ? selectedSlidesIdInput.split(';')
            : editor.selectedSlidesIds;
        const selectedElementsIds: string[] = (selectedElementsIdInput)
            ? selectedElementsIdInput.split(';')
            : editor.selectedSlideElementsIds;
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
        const imageSrc: string = imageSrcInput;
        const color: string = backgroundCOlorInput;
        setEditor(changeSelectedSlidesBackground(editor, imageSrc, color));
    }

    function setNewPresentationName() {
        setEditor(changePresentationName(editor, presentationNameInput));
    }

    function addNewTextElement() {
        const XY: number[] = getXYArr(XYCordsInput);
        setEditor(addTextElement(editor, XY[0], XY[1]));
    }

    function addNewPictureElement() {
        const XY: number[] = getXYArr(XYCordsInput);
        setEditor(addPictureElement(editor, pictureContentInput, XY[0], XY[1]));
    }

    function addNewFigureElement() {
        const XY: number[] = getXYArr(XYCordsInput);
        const figureShape: string = figureShapeTypeInput;
        const figure: number = (figureShape === 'Circle')
            ? FigureShape.Circle
            : (figureShape === 'Triangle')
                ? FigureShape.Triangle
                : FigureShape.Rectangle;
        setEditor(addFigureElement(editor, figure, XY[0], XY[1]));
    }

    function setChangeElementsPosition() {
        setEditor(changeElementsPosition(editor, 10, 10))
    }

    function setChangeElementsSize() {
        setEditor(changeElementsSize(editor, 1.5, 1.7))
    }

    function setChangeFiguresColor() {
        setEditor(changeFiguresColor(editor, 'feffef'))
    }

    function setChangeTextsSize() {
        const textSize: number = (textSizeInput.length)
            ? parseInt(textSizeInput)
            : 1;
        setEditor(changeTextsSize(editor, textSize))
    }

    function setChangeTextContent() {
        setEditor(changeTextsContent(editor, textContentInput));
    }

    function setChangeTextColor() {
        setEditor(changeTextsColor(editor, textColorInput));
    }

    function setChangeTextStyle() {
        setEditor(changeTextsStyle(editor, textStyleInput));
    }

    function setRemoveSelectedElements() {
        setEditor(removeSelectedElements(editor))
    }

    let slideAmount: number = -1;

    function slidesInfo(): JSX.Element[] {
        return editor.presentation.slidesList.map((slide: Slide) => {
            slideAmount++;
            const slideSrc: string = (slide.background.src)
                ? slide.background.src
                : slide.background.color;
            const slideInfo: JSX.Element[] = slide.elementsList.map((el: SlideElement) => {
                const contentType: string = (isFigure(el.content))
                    ? 'Фигура'
                    : (isPicture(el.content))
                        ? 'Картинка'
                        : 'Текст';
                const additionalInfo = isPicture(el.content)
                    ? `src: ${el.content.src}`
                    : isFigure(el.content)
                        ? FigureShape[+el.content.figureType]
                        : `content: '${el.content.content}' 
                        textSize: ${el.content.fontSize} 
                        fontColor: ${el.content.fontColor} 
                        fontStyle: ${el.content.fontStyle}`;
                return <div className="slide-element-info" key={el.id}>
                    |elementId: {el.id} 
                    width: {el.size.width} 
                    height: {el.size.height}  
                    x: {el.centerPoint.x} 
                    y: {el.centerPoint.y} 
                    opacity: {el.opacity} |
                    <div>{'<'}{contentType}{'>'} {additionalInfo}</div>
                </div>
            });
            return <div className="slide-Info" key={slide.id}>slideIndex: {slideAmount} | slideId: {slide.id} |
                slideBackround: {slideSrc}
                <div>content: </div>
                <hr />
                {slideInfo}
                <hr />
            </div>
        });
    }

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
                <input className="type-2" type="text" placeholder="Input;Slides;Ids;here" onChange={handleSelectedSlidesIdInput} />
                <input className="type-2" type="text" placeholder="Input;Elements;Ids;here"
                    onChange={handleSelectedElementsIdInput} />
                <button className="button-53" onClick={setSelectedIdState}>setSelectedIdState</button>
                <input className="type-2" type="text" placeholder="Input Presentation name here"
                    onChange={handlePresentationNameInput} />
                <button className="button-53" onClick={setNewPresentationName}>setPresentationName</button>

                <div className="functiton-block">Slide Functions</div>

                <button className="button-53" onClick={addSlideState}>addSlide</button>
                <button className="button-53" onClick={rmSlideState}>removeSelectedSlides</button>
                <input className="type-2" type="text" placeholder="Input background image's src here"
                    onChange={handleBackgroundImgSrcInput} />
                <input className="type-2" type="text" placeholder="Input background color here"
                    onChange={handleBackgroundColorInput} />
                <button className="button-53" onClick={setSlideBackgroundState}>changeSelectedSlidesBackground</button>

                <div className="functiton-block">Elements Functions</div>
                <input className="type-2" type="text" placeholder="Input;X;Y;here" onChange={handleXYElementsCordsInput} />

                <div className="functiton-block">Texts Functions</div>

                <button className="button-53" onClick={addNewTextElement}>addNewTextElement</button>
                <input className="type-2" type="text" placeholder="Input text size" onChange={handleTextSizeInput} />
                <button className="button-53" onClick={setChangeTextsSize}>setChangeTextsSize</button>
                <input className="type-2" type="text" placeholder="Input text color #ffffff" onChange={handleTextColorInput} />
                <button className="button-53" onClick={setChangeTextColor}>setChangeTextColor</button>
                <input className="type-2" type="text" placeholder="Input text style italic" onChange={handleTextStyleInput} />
                <button className="button-53" onClick={setChangeTextStyle}>setChangeTextStyle</button>
                <input className="type-2" type="text" placeholder="Input text content" onChange={handleTextContentInput} />
                <button className="button-53" onClick={setChangeTextContent}>setChangeTextContent</button>

                <input className="type-2" type="text" placeholder="Input picture content" onChange={handlePictureContentInput} />
                <button className="button-53" onClick={addNewPictureElement}>addNewPictureElement</button>
                <input className="type-2" type="text" placeholder="Input figureshape {Circle|Triangle|Rectangle}" onChange={handleFigureShapeInput} />
                <button className="button-53" onClick={addNewFigureElement}>addNewFigureElement</button>
                <button className="button-53" onClick={setChangeElementsSize}>setChangeElementsSize</button>
                <button className="button-53" onClick={setChangeFiguresColor}>setChangeFiguresColor</button>
                <button className="button-53" onClick={setRemoveSelectedElements}>setRemoveSelectedElements</button>
                <button className="button-53" onClick={setChangeElementsPosition}>setChangeElementsPosition</button>

                <div className="functiton-block">Dump your editor here</div>

                <button className="button-53" onClick={() => console.log(editor)}>seeEditor in console</button>
                <div>название презентации: {editor.presentation.name}</div>
                <div>мод презентации: {editor.mode}</div>
                <div>кол-во слайдов: {editor.presentation.slidesList.length}</div>
                <div className="editor-info">{slidesInfo()}</div>
                <div></div>
            </header>
        </div>
    );
}

export default App;

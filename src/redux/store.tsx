import { createStore } from 'redux';
import { initEditor } from '../model/initModelActions';
import { Editor } from '../model/types';
import { editorReducers } from './reducers';

const editor: Editor = initEditor();

export let store = createStore(editorReducers, editor);
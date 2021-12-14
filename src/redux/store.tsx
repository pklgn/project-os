import { createStore } from 'redux';
import { initEditor } from '../model/initModelActions';
import { Editor } from '../model/types';
import { editorReducers } from './reducers';

const editor: Editor = initEditor();

export const store = createStore(editorReducers, editor);
import { createStore } from 'redux';
import { editorReducers } from './reducers/reducers';

export const store = createStore(editorReducers);
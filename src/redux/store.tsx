import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers/rootReducer';

export const store = createStore(reducers, {}, applyMiddleware(thunk));

export type StoreType = typeof store;

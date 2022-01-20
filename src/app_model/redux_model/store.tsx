import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import reducers from './reducers/root_reducer';

const composedDevTools = composeWithDevTools({ trace: false, traceLimit: 50 });

export const store = createStore(reducers, {}, composedDevTools(applyMiddleware(thunk)));

export type StoreType = typeof store;

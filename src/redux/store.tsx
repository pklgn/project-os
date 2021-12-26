import { applyMiddleware, createStore, StoreEnhancer } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import reducers from "./reducers/rootReducer";

type WindowWithDevTools = Window & {
    __REDUX_DEVTOOLS_EXTENSION__: () => StoreEnhancer<unknown, {}>
}

const isReduxDevtoolsExtenstionExist =
    (arg: Window | WindowWithDevTools):
        arg is WindowWithDevTools => {
        return '__REDUX_DEVTOOLS_EXTENSION__' in arg;
    }

const thunkHolder = {
    m: applyMiddleware(thunk),
    n: isReduxDevtoolsExtenstionExist(window)
      ? window.__REDUX_DEVTOOLS_EXTENSION__()
      : undefined
}

const t = composeWithDevTools({trace: true, traceLimit: 50})

export const store = createStore(
    reducers,
    {},
    t(applyMiddleware(thunk))
);

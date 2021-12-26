import { applyMiddleware, createStore, StoreEnhancer } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import reducers from "./reducers/rootReducer";

const composedDevTools = composeWithDevTools({trace: true, traceLimit: 50})

export const store = createStore(
    reducers,
    {},
    composedDevTools(applyMiddleware(thunk))
);

import { createStore } from "redux";
import reducers from "./reducers/rootReducer";

export const store = createStore(reducers);
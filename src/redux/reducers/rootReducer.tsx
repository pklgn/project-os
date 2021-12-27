import { allReducers } from "./reducer";
import { combineReducers } from "redux";

const reducers = combineReducers({
    model: allReducers
});

export default reducers;

export type RootState = ReturnType<typeof reducers>;
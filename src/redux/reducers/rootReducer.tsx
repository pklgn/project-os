import { allReducers } from "./reducer";
import { combineReducers } from "redux";

const reducers = combineReducers({
    allReducers
})

export default reducers

export type RootState = ReturnType<typeof reducers>
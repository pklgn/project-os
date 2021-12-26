import { combineReducers } from "redux";
import { allReducers } from "./reducer";

const reducers = combineReducers({
    allReducers
})

export default reducers

export type RootState = ReturnType<typeof reducers>
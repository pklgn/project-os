import { combineReducers } from "redux";
import elementReducers from "./elementReducers"


const reducers = combineReducers({
    element: elementReducers
})

export default reducers

export type RootState = ReturnType<typeof reducers>
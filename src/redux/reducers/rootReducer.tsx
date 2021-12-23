import { combineReducers } from "redux";
import elementReducer from "./elementReducer"


const reducers = combineReducers({
    element: elementReducer
})

export default reducers

export type RootState = ReturnType<typeof reducers>
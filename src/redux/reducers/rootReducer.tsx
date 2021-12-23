import { combineReducers } from "redux";
import elementReducers from "./elementReducers"
import { presentationReducers } from "./presentationReducers";


const reducers = combineReducers({
    element: elementReducers,
    presentation: presentationReducers
})

export default reducers

export type RootState = ReturnType<typeof reducers>
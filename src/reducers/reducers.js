import { combineReducers } from "redux";
import todoReducer from "./todoReducer";

//combine all reducers here if you have more than one reducer
const rootReducer = combineReducers({
    todo: todoReducer
});

export default rootReducer;
import { combineReducers } from "redux";
import itemReducer from './initialReducer';

export default combineReducers({
    items: itemReducer,
})
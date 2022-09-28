import { createStore } from "redux";
import {fileReducer} from "./reducers/Reducers";

const reducer = fileReducer;
console.log('Type of reducer is: ', typeof(reducer))

const thistore = createStore(reducer);

export default thistore;
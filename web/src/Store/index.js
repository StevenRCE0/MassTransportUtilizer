import { createStore } from "redux";
import methods from './methods';

const store = createStore(
    methods,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

export default store
import { createStore } from "redux";
import methods from './methods';
import { persistStore, persistReducer } from 'redux-persist';
import { CookieStorage } from 'redux-persist-cookie-storage';
import Cookies from 'cookies-js';

let expires = 22 * 86400

export function setExpiration(schoolDays)
{
    if (schoolDays === undefined) {
        schoolDays = 22
    }
    expires = schoolDays * 86400;
}

const persistConfig = {
    key: 'root',
    storage: new CookieStorage(Cookies, {expiration:
        {
            default: expires
        }
    })
}
const persistedMethods = persistReducer(persistConfig, methods)

let store = createStore(persistedMethods, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

export let exposedMethods = persistStore(store)
export default store
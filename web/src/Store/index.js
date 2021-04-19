import { createStore } from "redux";
import methods from './methods';
import mapsUpdater from './mapsUpdater';
import { persistStore, persistReducer } from 'redux-persist';
import { CookieStorage } from 'redux-persist-cookie-storage';
import storage from 'redux-persist/lib/storage';
import Cookies from 'cookies-js';
import axios from "axios";

let expires = 22 * 86400

export function setExpiration(schoolDays)
{
    if (schoolDays === undefined) {
        schoolDays = 22
    }
    expires = schoolDays * 86400;
}

//组件数据和会话
const persistConfig = {
    key: 'root',
    storage: new CookieStorage(Cookies, {expiration:
        {default: expires}
    })
}
const persistedMethods = persistReducer(persistConfig, methods)
let store = createStore(persistedMethods, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

export let exposedMethods = persistStore(store)
export default store

//地图存储
const mapsPersistConfig = {
    key: 'maps',
    storage: storage
}
const mapsMethods = persistReducer(mapsPersistConfig, mapsUpdater)
export let mapsStore = createStore(mapsMethods, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
export let mapsExposedMethods = persistStore(mapsStore)

export function searchObject(data, searchKey, value, requiredKey) {
    let result
    try {
        data.forEach(function (theObject) {
            if (theObject[searchKey] === value) {
                result = theObject[requiredKey]
            }
        })
    }
    catch(error)
    {
        console.error(error)
        return result
    }

    return result
}
export function refreshDashboard(timeline) {
    if (timeline === undefined) {
        console.log('undefined date')
        return
    }
    const date = new Date(timeline)
    const data = {
        year: date.getFullYear().toString(),
        month: (date.getMonth() + 1).toString(),
        day: date.getDate().toString(),
        hour: date.getHours().toString(),
        minute: date.getMinutes().toString()
    }
    console.log('Time update request fired')
    axios.post('/api/time/json', data)
        .then(response => {
            console.log(response.data.result.msg)
            mapsStore.dispatch({
                type: 'loadDashboard',
                data: response.data
            })
            store.dispatch({
                type: 'noGo',
                value: response.data.result.msg
            })
        })
        .catch(error => {
            console.error(error)
        })
}
export function moodyTimeDifference(givenTime) {
    const moodyHour = givenTime.getHours() + (givenTime.getMinutes() > 30 ? 1 : 0)
    const moodyMin = givenTime.getMinutes() > 15 && givenTime.getMinutes() <= 45 ? 30 : 0
    return givenTime.getMonth()+1 + ':' + givenTime.getDate() + ':' + moodyHour + ':' + moodyMin
}
export function clearStorage() {
    mapsStore.dispatch({type: 'clear'})
    store.dispatch({type: 'clear'})
}
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
    catch(error) {}

    return result
}
export function searchArray(data, searchKey, value, requiredKey) {
    let result = []
    try {
        data.forEach(function (theObject) {
            if (theObject[searchKey] === value) {
                result.push(theObject[requiredKey])
            }
        })
    }
    catch(error) {}

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
export function arrayCoherence(keys, values, slice) {
    let newArray = []
    try {
        values.map(function (value, index) {
            if (slice === undefined) {
                let newDictionary = {
                    key: keys[index],
                    value: value
                }
                newArray.push(newDictionary)
            }
            else if (index >= slice[0] && index <= slice[1]) {
                let newDictionary = {
                    key: keys[index],
                    value: value
                }
                newArray.push(newDictionary)
            }
            return true
        })
    }
    catch (e) {
        newArray = [{key: '数据加载中', value: 100}]
    }

    return newArray
}
export function patchZero(str, target){
    str ='00000'+str;
    return str.substring(str.length-target,str.length);
}
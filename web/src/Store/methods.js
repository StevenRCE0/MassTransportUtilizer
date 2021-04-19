import {mapsStore} from "./index";

const defaultState = {
    active: "dashboard",
    theme: 'light',
    loginState: false,
    sessionData: '',
    timeUpToDate: true,
    now: new Date('May 29, 2020 22:30:00'),
    timeline: new Date('May 29, 2020 22:30:00'),
    timePeriod: '实时',
    timeNoGo: '数据加载中',
    lineSpectating: 'No',
    stationSpectating: {station: '没有选中站点', flow: 0},
    flowSpectating: -1,
    peakSpectating: -1,
    dashboardData: {}
}
const Store = (state = defaultState, action) => {
    let newState = JSON.parse(JSON.stringify(state))
    if (action.type === 'login' && action.loginState) {
        newState.loginState = true
        newState.sessionData = action.session
        return newState
    }
    if (action.type === 'certMan') {
        if (action.logout) {
            return defaultState
        }
    }
    if (action.type === 'hoverUpdate') {
        newState.lineSpectating = action.line
        if (action.hoverType === 'station') {
            newState.stationSpectating.station = action.hoverID
            newState.stationSpectating.flow = action.flow
        }
        return newState
    }
    if (action.type === 'switchTheme') {
        newState.theme = 'light'
        if (state.theme === 'light') {
            newState.theme = 'dark'
        }
        return newState
    }
    if (action.type === 'timeUpdate') {
        if (action.live === true) {
            newState.timePeriod = '实时'
            newState.timeline = state.now
            mapsStore.dispatch({type: 'refresh'})
            return newState
        }
        if (action.time > state.now) {
            newState.timePeriod = '预测'
        }
        else if (action.time < state.now) {
            newState.timePeriod = '历史'
        }
        newState.timeline = action.time
        return newState
    }
    if (action.type === 'noGo') {
        newState.timeNoGo = action.value === '成功'
        return newState
    }
    if (action.type === 'clear') {
        return defaultState
    }
    return state
}
export default Store
const nowPlacebo = 'May 29, 2020 22:30:00'
const defaultState = {
    active: "dashboard",
    theme: 'light',
    loginState: false,
    sessionData: '',
    now: new Date(nowPlacebo),
    timeline: new Date(nowPlacebo),
    passengerMode: '总客流',
    timePeriod: '实时',
    timeNoGo: '数据加载中',
    flowSpectating: -1,
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
    if (action.type === 'switchTheme') {
        newState.theme = 'light'
        if (state.theme === 'light') {
            newState.theme = 'dark'
        }
        return newState
    }
    if (action.type === 'changePassengerMode') {
        newState.passengerMode = action.mode
        return newState
    }
    if (action.type === 'timeUpdate') {
        if (action.live === true) {
            newState.timePeriod = '实时'
            newState.timeline = nowPlacebo
        }
        else {
            if (action.time > state.now) {
                newState.timePeriod = '预测'
            }
            else if (action.time < state.now) {
                newState.timePeriod = '历史'
            }
            newState.timeline = action.time
        }
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
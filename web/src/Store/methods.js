const givenDate = new Date('July 1, 2020 00:00:00')
const defaultState = {
    active: "dashboard",
    theme: 'light',
    loginState: false,
    sessionData: '',
    timeUpToDate: true,
    time: givenDate,
    timePeriod: '实时',
    lineSpectating: 'No',
    stationSpectating: 'No',
    flowSpectating: -1,
    peakSpectating: -1
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
            newState.stationSpectating = action.hoverID
        }
        return newState
    }
    if (action.type === 'switchTheme') {
        newState.theme = action.theme
        return newState
    }
    if (action.type === 'timeUpdate') {
        if (action.time > givenDate) {
            newState.timePeriod = '预测'
        }
        else if (action.time < givenDate) {
            newState.timePeriod = '历史'
        }
        else if (action.now) {
            newState.timePeriod = '实时'
        }
        else {
            return newState
        }
        newState.time = action.time
        return newState
    }

    return state
}
export default Store
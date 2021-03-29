const defaultState = {
    active: "dashboard",
    loginState: false,
    timeUpToDate: true,
    time: new Date(),
    lineSpectating: 'No',
    stationSpectating: 'No',
    flowSpectating: -1,
    peakSpectating: -1
}
const Store = (state = defaultState, action) => {
    if (action.type === 'login' && action.loginState) {
        let newState = JSON.parse(JSON.stringify(state))
        newState.loginState = true
        alert("认证成功了")
        return newState
    }
    if (action.type === 'certMan') {
        if (action.logout) {
            return defaultState
        }
    }
    if (action.type === 'hoverUpdate') {
        let newState = JSON.parse(JSON.stringify(state))
        newState.lineSpectating = action.line
        if (action.hoverType === 'station') {
            newState.stationSpectating = action.hoverID
        }
        return newState
    }

    return state
}
export default Store
import axios from "axios";

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
    stationSpectating: {station: '没有选中站点', flow: 0},
    flowSpectating: -1,
    peakSpectating: -1,
    dashboardData: {}
}
const Store = (state = defaultState, action) => {
    function refreshDashboard(statePass) {
        const date = new Date(statePass.time)
        console.log(date)
        const data = {
            year: date.getYear(),
            month: date.getMonth() + 1,
            day: date.getDate(),
            hour: date.getHours(),
            minute: date.getMinutes()
        }
        let result
        try {
            axios.post('/api/time/json', {data})
                .then(response => {
                    result = response
                    console.log(result)
                })
                .catch(error => console.error(error))
        }
        catch (error) {
            console.log(error)
            alert('网络通讯存在问题，组件更新不力')
        }

        return result
    }
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
        if (action.time > givenDate) {
            newState.timePeriod = '预测'
        }
        else if (action.time < givenDate) {
            newState.timePeriod = '历史'
        }
        else if (action.now) {
            newState.timePeriod = '实时'
        }
        newState.time = action.time
        newState.dashboardData = refreshDashboard(state)
        return newState
    }
    return state
}
export default Store
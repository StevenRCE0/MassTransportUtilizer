import store, {refreshDashboard} from "./index";

const defaultValue = {
    initiated: 0,
    stationData: {},
    pathData: {},
    heatData: {},
    dashboardData: {},
    lineSpectating: 'No',
    stationSpectating: {station: '没有选中站点', flow: 0},
}

const Store = (state = defaultValue, action) => {
    let newMapState = JSON.parse(JSON.stringify(state))
    if (action.type === 'refresh') {
        if (!newMapState.initiated) {
            newMapState.dashboardData = require('../stationaryPlaceholder/dashboard.json')
            newMapState.stationData = require('../stationaryPlaceholder/stations.json')
            newMapState.pathData = require('../stationaryPlaceholder/paths.json')
        }
        refreshDashboard(store.getState().timeline)
        return newMapState
    }
    if (action.type === 'push') {
        if (action.stationData !== undefined) {newMapState.stationData = action.stationData}
        if (action.pathData !== undefined) {newMapState.pathData = action.pathData}
        if (action.heatData !== undefined) {newMapState.heatData = action.heatData}
        return newMapState
    }
    if (action.type === 'loadDashboard') {
        newMapState.dashboardData = action.data
        return newMapState
    }
    if (action.type === 'hoverUpdate') {
        newMapState.lineSpectating = action.line
        if (action.hoverType === 'station' || action.hoverType === 'path') {
            newMapState.stationSpectating[action.hoverType] = action.hoverID
            newMapState.stationSpectating.flow = action.flow
            console.log(newMapState.stationSpectating.flow)
        }

        return newMapState
    }
    if (action.type === 'clear') {
        return defaultValue
    }
    return state
}
export default Store
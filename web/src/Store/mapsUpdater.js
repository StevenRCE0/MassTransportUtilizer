import store, {refreshDashboard} from "./index";

const defaultValue = {
    stationData: {},
    pathData: {},
    heatData: {},
    dashboardData: {}
}

const Store = (state = defaultValue, action) => {
    let newMapState = JSON.parse(JSON.stringify(state))
    if (action.type === 'refresh') {
        newMapState.stationData = require('../stationaryPlaceholder/stations.json')
        newMapState.pathData = require('../stationaryPlaceholder/paths.json')
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
    return state
}
export default Store
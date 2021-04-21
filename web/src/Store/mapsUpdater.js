import store, {refreshDashboard, searchObject} from "./index";

const defaultValue = {
    initiated: 0,
    pathData: {},
    heatData: {},
    dashboardData: {},
    lineSpectating: 'No',
    stationSpectating: {station: '没有选中站点', flow: 0},
    ageMapSpectating: {station: '没有选中站点', inward: undefined, outward: undefined}
}

const Store = (state = defaultValue, action) => {
    let newMapState = JSON.parse(JSON.stringify(state))
    if (action.type === 'refresh') {
        if (!newMapState.initiated) {
            newMapState.dashboardData = require('../stationaryPlaceholder/dashboard.json')
            newMapState.pathData = require('../stationaryPlaceholder/paths.json')
        }
        refreshDashboard(store.getState().timeline)
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
        }
        if (action.hoverType === 'age') {
            newMapState.ageMapSpectating.station = action.hoverID
            newMapState.ageMapSpectating.inward = searchObject(newMapState.dashboardData.ageMap, 'station', action.hoverID, 'in')
            newMapState.ageMapSpectating.outward = searchObject(newMapState.dashboardData.ageMap, 'station', action.hoverID, 'out')
        }
        console.log(newMapState)
        return newMapState
    }
    if (action.type === 'clear') {
        return defaultValue
    }
    return state
}
export default Store
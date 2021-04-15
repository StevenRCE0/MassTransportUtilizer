const defaultValue = {
    stationData: {},
    pathData: {},
    heatData: {}
}
const Store = (state = defaultValue, action) => {
    let newMapState = JSON.parse(JSON.stringify(state))

    if (action.type === 'refresh') {
        newMapState.stationData = require('../stationaryPlaceholder/stations.json')
        newMapState.pathData = require('../stationaryPlaceholder/paths.json')
        return newMapState
    }
    if (action.type === 'push') {
        newMapState.stationData = action.stationData
        newMapState.pathData = action.pathData
    }
    if (action.type === 'heatRevamp') {
        newMapState.heatData = action.heatData
    }
    return state
}
export default Store
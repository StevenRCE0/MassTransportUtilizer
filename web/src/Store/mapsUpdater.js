const defaultValue = {
    stationData: {},
    pathData: {}
}
const Store = (state = defaultValue, action) => {
    if (action.type === 'refresh') {
        let newMapState = JSON.parse(JSON.stringify(state))
        newMapState.stationData = require('../stationaryPlaceholder/stations.json')
        newMapState.pathData = require('../stationaryPlaceholder/paths.json')
        return newMapState
    }
    return state
}
export default Store
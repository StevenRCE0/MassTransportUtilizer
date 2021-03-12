import React from "@testing-library/react";

const defaultState = {
    active: "dashboard",
    loginState: false,
    timeUpToDate: true,
    time: new Date(),
    LineSpectating: 0,
    FlowSpectating: -1,
    PeakSpectating: -1
}
export default(state = defaultState, action) => {
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

    }

    return state
}
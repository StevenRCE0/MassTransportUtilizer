import React from "@testing-library/react";

const defaultState = {
    active: "dashboard",
    loginState: false,
    timeUpToDate: true,
    time: new Date(),
    lineSpectating: 'No',
    flowSpectating: -1,
    peakSpectating: -1
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
        let newState = JSON.parse(JSON.stringify(state))
        newState.lineSpectating = action.line
        return newState
    }

    return state
}
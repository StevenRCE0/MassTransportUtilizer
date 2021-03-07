const defaultState = {
    active: "dashboard",
    loginState: false
}

export var DefaultState = function () {
    return defaultState
}

export var Authenticate = function (state, action) {
    if (action.type === 'login' && action.loginState) {
        return state.concat({loginState: true})
    }
    return state
}
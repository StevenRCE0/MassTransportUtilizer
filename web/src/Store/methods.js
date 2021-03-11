const defaultState = {
    active: "dashboard",
    loginState: false
}
export default(state = defaultState, action) => {
    if (action.type === 'login' && action.loginState) {
        let newState = JSON.parse(JSON.stringify(state))
        newState.loginState = true
        return newState
    }
    return state
}
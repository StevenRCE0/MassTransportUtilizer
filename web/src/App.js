import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
    NavLink,
} from "react-router-dom";
import {TransitionGroup, CSSTransition} from "react-transition-group";
import Overview from "./Overview";
import { LineHeat, HeatTimeline } from "./LineHeat";
import PassengerAnalytics from "./PassengerAnalytics";
import Login from "./Authenticate";
import './index.css';

import { PersistGate } from 'redux-persist/integration/react';
import store, {exposedMethods, mapsStore} from "./Store";

const root = document.documentElement

function setTheme() {
    if (store.getState().theme === 'light') {
        root.style.setProperty('--themeTable', '#E3E3E3')
        root.style.setProperty('--themeBorder', 'none')
        root.style.setProperty('--themeColor', '#443')
        root.style.setProperty('--themeHover', '#220')
        root.style.setProperty('--themeActive', '#220')
        root.style.setProperty('--themeLayer', 'rgba(250, 250, 250, 0.8)')
        root.style.setProperty('--themeFilter', 'screen')
        root.style.setProperty('--themeDarkFilter', 'brightness(1.17)')
        root.style.setProperty('--themePure0', 'rgba(255, 255, 255, 1)')
        root.style.setProperty('--themePure1', 'rgba(255, 255, 255, 0)')
        root.style.setProperty('--themeControlBackground', 'rgba(80, 80, 80, 0.1)')
        root.style.setProperty('--themeButtonBackground', '#FFF')
        root.style.setProperty('--controlBlur', '#553')
        root.style.setProperty('--dockBorderSize', '1px')
        root.style.setProperty('--actualFilter', 'rgba(255, 255, 255, .8)')
    }
    if (store.getState().theme === 'dark') {
        root.style.setProperty('--themeTable', '#171717')
        root.style.setProperty('--themeBorder', '0 0 1.5px #EEE')
        root.style.setProperty('--themeColor', '#EEE')
        root.style.setProperty('--themeHover', '#AAB')
        root.style.setProperty('--themeActive', '#FFF')
        root.style.setProperty('--themeLayer', 'rgba(53, 53, 53, 0.8)')
        root.style.setProperty('--themeFilter', 'luminosity')
        root.style.setProperty('--themeDarkFilter', 'brightness(.25)')
        root.style.setProperty('--themePure0', 'rgba(64, 64, 64, 1)')
        root.style.setProperty('--themePure1', 'rgba(0, 0, 0, 0)')
        root.style.setProperty('--themeControlBackground', 'rgba(255, 255, 255, 0.1)')
        root.style.setProperty('--themeButtonBackground', '#535353')
        root.style.setProperty('--controlBlur', '#BBC')
        root.style.setProperty('--dockBorderSize', '2px')
        root.style.setProperty('--actualFilter', 'rgba(0, 0, 25, .15)')

    }
}
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {storeState: store.getState()}
        this.storeChange = this.storeChange.bind(this)
        store.subscribe(this.storeChange)
    }

    storeChange(){this.setState({storeState: store.getState()})}
    componentDidMount() {
        mapsStore.dispatch({type: 'refresh'})
    }

    render() {
        setTheme()
        let pagesList = []
        if (this.state.storeState.loginState === true) {
            pagesList.push(
                <Switch>
                    <Route exact path={"./"}>
                        <Redirect to={"Overview"}/>
                    </Route>
                    <Route path={"*"} component={AnimationApp}/>
                </Switch>
            )
        }
        else {
            pagesList.push(
                <Switch>
                    <Route path={"*"}>
                        <Login />
                    </Route>
                </Switch>
            )
        }
        return (
            <PersistGate store={store} persistor={exposedMethods}>
                <Router>
                    {pagesList}
                </Router>
            </PersistGate>
        )
    }
}

class AnimationApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            handling: 0,
            redirect: undefined
        }
    }
    wary(e) {
        if (this.state.handling === 1) {
            return
        }
        this.setState({handling: 1})
        this.setState({redirect: e})
        this.setState({redirect: undefined})
    }
    themeSwitcherWary() {
        if (this.state.handling === 1) {
            return
        }
        this.setState({handling: 1})
        store.dispatch({type: 'switchTheme'})
    }

    componentDidMount() {
        let done = () => {
            this.setState({handling: 0})
        }
        store.subscribe(() => {
            setTimeout(done, 500, done)
        })
        this.props.history.listen(location => {
            mapsStore.dispatch({type: 'refresh'})
            if (this.props.location.pathname !== location.pathname) {
                setTimeout(done, 500, done)
            }
        })
    }
    render() {
        const redirect = {
            state: this.state.redirect,
            handling: this.state.handling,
            set: (e) => this.wary(e),
            done: () => this.done()
        }
        const themeSwitchKey = () => this.themeSwitcherWary()

        function handleShortcutKey(key) {
            const destination = ['Overview', 'LineHeat', 'HeatTimeline', 'PassengerAnalytics', 'Authenticate']
            redirect.set(<Redirect to={destination[key - 1]}/>)
        }
        // keyboard shortcuts
        window.addEventListener("keyup", function (e) {
            if (e.defaultPrevented) {
                return;
            }
            if (e.key !== undefined) {
                if (e.key === '1') {handleShortcutKey(1)}
                if (e.key === '2') {handleShortcutKey(2)}
                if (e.key === '3') {handleShortcutKey(3)}
                if (e.key === '4') {handleShortcutKey(4)}
                if (e.key === 'L' || e.key === 'l') {handleShortcutKey(5)}
                if (e.key === 'K' || e.key === 'k') {themeSwitchKey()}
            }
            else if (e.code !== undefined) {
                if (e.code === 'Digit1') {handleShortcutKey(1)}
                if (e.code === 'Digit2') {handleShortcutKey(2)}
                if (e.code === 'Digit3') {handleShortcutKey(3)}
                if (e.code === 'Digit4') {handleShortcutKey(4)}
                if (e.code === 'KeyL') {handleShortcutKey(5)}
                if (e.code === 'KeyK') {themeSwitchKey()}
            }
        })

        return (
            <React.Fragment>
                {this.state.redirect}
                <div className="Dock">
                    <NavLink key={"Overview"} to={"Overview"} activeClassName={"active"} exact>
                        <button className={"DockNavigation"}>概览<span>1</span></button>
                    </NavLink>
                    <NavLink key={"LineHeat"} to={"LineHeat"} activeClassName={"active"}>
                        <button className={"DockNavigation"}>线路分析<span>2</span></button>
                    </NavLink>
                    <NavLink key={"HeatTimeline"} to={"HeatTimeline"} activeClassName={"active"}>
                        <button className={"DockNavigation"}>时段分析<span>2</span></button>
                    </NavLink>
                    <NavLink key={"PassengerAnalytics"} to={"PassengerAnalytics"} activeClassName={"active"}>
                        <button className={"DockNavigation"}>用户画像<span>3</span></button>
                    </NavLink>
                    <NavLink key={"Authenticate"} to={"Authenticate"} activeClassName={"active"}>
                        <button className={"DockNavigation"}>认证与设置<span>L</span></button>
                    </NavLink>
                </div>
                <TransitionGroup>
                    <CSSTransition
                        key={this.props.location}
                        classNames={"fade"}
                        timeout={250}
                    >
                        <Switch>
                            <Route path={`*/Overview`} component={Overview}/>
                            <Route path={`*/LineHeat`} component={LineHeat}/>
                            <Route path={`*/HeatTimeline`} component={HeatTimeline}/>
                            <Route path={`*/PassengerAnalytics`} component={PassengerAnalytics}/>
                            <Route path={`*/Authenticate`} component={Login}/>
                            <Route path={`*`}>
                                <Redirect to={"Overview"}/>
                            </Route>
                        </Switch>
                    </CSSTransition>
                </TransitionGroup>
            </React.Fragment>
        )
    }
}

export default App;
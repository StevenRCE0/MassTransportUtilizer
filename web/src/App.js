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
import store, { exposedMethods } from "./Store";

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
        root.style.setProperty('--themeFilter', 'multiply')
        root.style.setProperty('--themeDarkFilter', 'brightness(.65)')
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
    render() {
        // keyboard shortcuts
        window.addEventListener("keydown", function (e) {
            if (e.defaultPrevented) {
                return;
            }
            function handleShortcutKey(key) {
                const destination = ['Overview', 'LineHeat', 'HeatTimeline', 'PassengerAnalytics', 'Authenticate']
                window.location.replace('./' + destination[key - 1])
            }
            if (e.key !== undefined) {
                if (e.key === '1') {handleShortcutKey(1)}
                if (e.key === '2') {handleShortcutKey(2)}
                if (e.key === '3') {handleShortcutKey(3)}
                if (e.key === '4') {handleShortcutKey(4)}
                if (e.key === 'L' || e.key === 'l') {handleShortcutKey(5)}
            }
            else if (e.code !== undefined) {
                if (e.code === 'Digit1') {handleShortcutKey(1)}
                if (e.code === 'Digit2') {handleShortcutKey(2)}
                if (e.code === 'Digit3') {handleShortcutKey(3)}
                if (e.code === 'Digit4') {handleShortcutKey(4)}
                if (e.code === 'KeyL') {handleShortcutKey(5)}
            }
        })

        return (
            <React.Fragment>
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
                        <button className={"DockNavigation"}>客流分析<span>3</span></button>
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
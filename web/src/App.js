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

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = store.getState()
        this.storeChange = this.storeChange.bind(this)
        store.subscribe(this.storeChange)
    }

    storeChange(){
        this.setState(store.getState())
    }

    render() {
        let pagesList = []
        if (this.state.loginState === true) {
            pagesList.push(
                <Switch>
                    <Route exact path={"./"}>
                        <Redirect to={"Overview"}/>
                    </Route>
                    <Route path={"*"} component={AnimationApp}/>
                </Switch>)
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
                    <NavLink to={"Overview"} activeClassName={"active"} exact>
                        <button className={"DockNavigation"}>概览<span>1</span></button>
                    </NavLink>
                    <NavLink to={"LineHeat"} activeClassName={"active"}>
                        <button className={"DockNavigation"}>线路分析<span>2</span></button>
                    </NavLink>
                    <NavLink to={"HeatTimeline"} activeClassName={"active"}>
                        <button className={"DockNavigation"}>时段分析<span>2</span></button>
                    </NavLink>
                    <NavLink to={"PassengerAnalytics"} activeClassName={"active"}>
                        <button className={"DockNavigation"}>客流分析<span>3</span></button>
                    </NavLink>
                    <NavLink to={"Authenticate"} activeClassName={"active"}>
                        <button className={"DockNavigation"}>认证<span>L</span></button>
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

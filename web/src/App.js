import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
    NavLink,
    useLocation
} from "react-router-dom";
import {TransitionGroup, CSSTransition} from "react-transition-group";
import Overview from "./Overview";
import PassengerAnalytics from "./PassengerAnalytics";
import Login from "./Authenticate";
import './index.css';
import {Authenticate} from "./Store/methods";

class App extends React.Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path={"./"}>
                        <Redirect to={"Overview"}/>
                    </Route>
                    <Route path={"*"} component={AnimationApp}/>
                </Switch>
            </Router>
        )
    }
}

class AnimationApp extends React.Component {
    render() {
        // authentication
        const loginState =

        // keyboard shortcuts
        window.addEventListener("keydown", function (e) {
            if (e.defaultPrevented) {
                return;
            }
            function handleShortcutKey(key) {
                const destination = ['Overview', 'PassengerAnalytics', 'Authenticate', 'LineHeat']
                window.location.replace('./' + destination[key - 1])
            }
            if (e.key !== undefined) {
                if (e.key === '1') {handleShortcutKey(1)}
                if (e.key === '2') {handleShortcutKey(2)}
                if (e.key === '3') {handleShortcutKey(4)}
                if (e.key === 'L' || e.key === 'l') {handleShortcutKey(3)}
            }
            else if (e.code !== undefined) {
                if (e.code === 'Digit1') {handleShortcutKey(1)}
                if (e.code === 'Digit2') {handleShortcutKey(2)}
                if (e.code === 'Digit3') {handleShortcutKey(4)}
                if (e.code === 'KeyL') {handleShortcutKey(3)}
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

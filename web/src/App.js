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
import './index.css';

function App() {
    return (
        <Router>
            <Switch>
                <Route exact path={"./"}>
                    <Redirect to={"Overview"}/>
                </Route>
                <Route path={"*"}>
                    <AnimationApp/>
                </Route>
            </Switch>
        </Router>
    );
}

function AnimationApp() {
    const location = useLocation();
    const { match } = this.props;

    window.addEventListener("keydown", function (e) {
        if (e.defaultPrevented) {
            return;
        }
        function handleShortcutKey(key) {
            const destination = ['Overview', 'PassengerAnalytics']
            window.location.replace('./' + destination[key - 1])
        }
        if (e.key !== undefined) {
            if (e.key === '1') {handleShortcutKey(1)}
            if (e.key === '2') {handleShortcutKey(2)}
        }
        else if (e.code !== undefined) {
            if (e.code === 'Digit1') {handleShortcutKey(1)}
            if (e.code === 'Digit2') {handleShortcutKey(2)}
        }
    })
    return (
        <React.Fragment>
            <div className="Dock">
                <NavLink to={"Overview"} activeClassName={"active"} exact>
                    <button className={"DockNavigation"}>概览<span>1</span></button>
                </NavLink>
                <NavLink to={"PassengerAnalytics"} activeClassName={"active"}>
                    <button className="DockNavigation">客流情况分析<span>2</span></button>
                </NavLink>
            </div>
            <TransitionGroup>
                <CSSTransition
                    key={location}
                    classNames={"fade"}
                    timeout={250}
                >
                    <Switch>
                        <Route path={`${match.url}/Overview`} component={Overview}/>
                        <Route path={`${match.url}/PassengerAnalytics`} component={PassengerAnalytics}/>
                    </Switch>
                </CSSTransition>
            </TransitionGroup>
        </React.Fragment>
    )
}

export default App;

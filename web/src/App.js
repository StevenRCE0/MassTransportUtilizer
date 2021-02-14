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
                <Route exact path={"/"}>
                    <Redirect to={"/Overview"}/>
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
    const modalElement = []

    window.addEventListener("keydown", function (e) {
        if (e.defaultPrevented) {
            return;
        }
        if (e.key !== undefined) {
            if (e.key === '1') {window.location.replace('/Overview')}
            if (e.key === '2') {window.location.replace('./PassengerAnalytics')}
        }
        else if (e.code !== undefined) {
            if (e.code === 'Digit1') {window.location.replace('/Overview')}
            if (e.code === 'Digit2') {window.location.replace('/PassengerAnalytics')}
        }
    })
    return (
        <React.Fragment>
            {modalElement}
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
                        <Route path={"/Overview"}>
                            <Overview/>
                        </Route>
                        <Route path={"/PassengerAnalytics"}>
                            <PassengerAnalytics/>
                        </Route>
                    </Switch>
                </CSSTransition>
            </TransitionGroup>
        </React.Fragment>
    )
}

export default App;

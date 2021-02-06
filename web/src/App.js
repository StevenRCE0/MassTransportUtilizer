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
    return (
        <React.Fragment>
            {modalElement}
            <div className="Dock">
                <NavLink to={"Overview"} activeClassName={"active"} exact>
                    <button className={"DockNavigation"}>概览</button>
                </NavLink>
                <NavLink to={"PassengerAnalytics"} activeClassName={"active"}>
                    <button className="DockNavigation">客流情况分析</button>
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

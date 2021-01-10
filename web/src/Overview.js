import React from "react";
import * as Widgets from "./widgets";

class Overview extends React.Component {
    render() {
        return (
            <div className={"GridContainer"}>
                <div className={"div1"}>
                    <Widgets.MapsBlock />
                </div>
                <div className={"div2"}>
                    <Widgets.DashboardOne />
                </div>
                <div className={"div3"}>
                    <Widgets.DashboardOne />
                </div>
                <div className={"div4"}>
                    <Widgets.DashboardOne />
                </div>
                <div className={"div5"}>
                    <Widgets.DashboardOne />
                </div>
                <div className={"div6"}>
                    <Widgets.Dashboard />
                </div>
                <div className={"div7"}>
                    <Widgets.Dashboard />
                </div>
                <div className={"div8"}>
                    <Widgets.Trends />
                </div>
                <div className={"div9"}>
                    <Widgets.SimpleTrends />
                </div>
                <div className={"div10"}>
                    <Widgets.SimpleBars />
                </div>
            </div>
        )
    }
}

export default Overview
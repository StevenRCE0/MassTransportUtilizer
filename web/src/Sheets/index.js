import React from "react";
import "./style.css";

export class Dock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            now: '概览'
        }
    }

    getNavigation(standing) {
        const directions = ["概览", "客流组成分析"]
        let elements = directions.map(function (way) {
            let now = "DockNavigation"
            if (way === standing) {
                now += " activated"
            }
            return (
                <button className={now}>{way}</button>
            )
        })
        return elements
    }

    render() {
        return (
            <div className={"Dock"}>
                {this.getNavigation(this.state.now)}
            </div>
        )
    }
}
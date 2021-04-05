import React from "react";
import './style.css';
import * as Widgets from "../Widgets/widgets";

const body = document.body

export class LineHeat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    calculateSize() {
        this.setState({
            size: Math.min(document.documentElement.clientHeight / 8, body.scrollWidth / 8)
        })
    }
    componentDidMount() {
        this.calculateSize()
        window.addEventListener('resize', this.calculateSize)
    }
    componentWillUnmount() {
        window.removeEventListener('resize', this.calculateSize)
    }

    render() {
        return(
            <div className={"LHGrid"}>
                <div className="div1"></div>
                <div className="div2"></div>
                <div className="div3"></div>
                <div className="div4"></div>
                <div className="div5"></div>
                <div className="div6"></div>
                <div className="div7"></div>
                <div className="div8"></div>
                <div className="div9"></div>
                <div className="div10"></div>
                <div className="div11"></div>
                <div className="div12"></div>
                <div className="div13"></div>
                <div className="div14"></div>
                <div className="div15"></div>
                <div className="div16"></div>
                <div className="div17"></div>
                <div className="div18"></div>
                <div className="div19"></div>
                <div className="div20"></div>
            </div>
        )
    }
}

export class HeatTimeline extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    calculateSize = () => {
        this.setState({
            size: body.scrollHeight / 5
        })
        console.log(this.state.size)
    }
    componentDidMount() {
        this.calculateSize()
        window.addEventListener('resize', this.calculateSize)
    }
    componentWillUnmount() {
        window.removeEventListener('resize', this.calculateSize)
    }

    render() {
        const {size} = this.state
        return(
            <div className={"THGrid"}>
                <div className="div1">
                    <Widgets.Trends
                        port={{'height': size * 1, 'width': body.scrollWidth - 60}}
                    />
                </div>
                <div className="div2">
                    <Widgets.Trends
                        port={{'height': size * 1, 'width': body.scrollWidth - 60}}
                    />
                </div>
                <div className="div3">
                    <Widgets.AreaChartTrends
                        port={{'height': size * 1, 'width': body.scrollWidth - 60}}
                    />
                </div>
                <div className="div4"></div>
                <div className="div5"></div>
                <div className="div6"></div>
            </div>
        )
    }
}
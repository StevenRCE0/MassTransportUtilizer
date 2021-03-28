import React from "react";
import './style.css';
import * as Widgets from "../Widgets/widgets";

const body = document.body

class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    calculateSize = () => {
        this.setState({
            size: Math.min(body.scrollHeight / 6, body.scrollWidth / 8)
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

    retrieveData(name) {
        if (name === 'overall') {
            return(
                {
                    name: '综合压力',
                    value: 60
                }
            )
        }
        if (name === 'overloadedStation') {
            return(
                {
                    name: 'Sta99',
                    value: 99
                }
            )
        }
    }

    render() {
        const {size} = this.state
        return (
                <div className={"OverviewGrid"}>
                    <div className={"div1"}>
                        <Widgets.MapsBlock
                            port={{"height": size * 4, "width": size * 4}}
                        />
                    </div>
                    <div className={"div2"}>
                        <Widgets.DashboardOne size={size} data={this.retrieveData('overall')}/>
                    </div>
                    <div className={"div3"}>
                        <Widgets.DashboardOne size={size} data={this.retrieveData('overloadedStation')}/>
                    </div>
                    <div className={"div4"}>
                        <Widgets.DashboardOne size={size}/>
                    </div>
                    <div className={"div5"}>
                        <Widgets.DashboardOne size={size}/>
                    </div>
                    <div className={"div6"}>
                        <Widgets.Dashboard size={size}/>
                    </div>
                    <div className={"div7"}>
                        <Widgets.Dashboard size={size}/>
                    </div>
                    <div className={"div8"}>
                        <Widgets.Trends
                            port={{"height": size, "width": size * 2}}
                        >
                            Trends
                        </Widgets.Trends>
                    </div>
                    <div className={"div9"}>
                        <Widgets.SimpleTrends
                            port={{"height": size, "width": size * 3}}
                        >
                            SimpleTrends
                        </Widgets.SimpleTrends>
                    </div>
                    <div className={"div10"}>
                        <Widgets.SimpleBars
                            port={{"height": size, "width": size * 2}}
                            tint={["#2196f3", "#8bc34a"]}
                        >
                            Simple Bars
                        </Widgets.SimpleBars>
                    </div>
                </div>
        )
    }
}

export default Index
import React from "react";
import './style.css';
import * as Widgets from "../Widgets/widgets";

class Index extends React.Component {

    constructor(props) {
        super(props);
        this.state = {}
    }


    calculateSize = () => {
        this.setState({
            size: Math.min(window.innerHeight / 6, window.innerWidth / 8)
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
        const {size} = this.state
        return (
            <React.Fragment>
                <div className={"OverviewGrid"}>
                    <div className={"div1"}>
                        <Widgets.MapsBlock
                            port={{"height": size * 4, "width": size * 4}}
                        />
                    </div>
                    <div className={"div2"}>
                        <Widgets.DashboardOne size={size}/>
                    </div>
                    <div className={"div3"}>
                        <Widgets.DashboardOne size={size}/>
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
                        />
                    </div>
                    <div className={"div9"}>
                        <Widgets.SimpleTrends
                            port={{"height": size, "width": size * 3}}
                        />
                    </div>
                    <div className={"div10"}>
                        <Widgets.SimpleBars
                            port={{"height": size, "width": size * 2}}
                            tint={["#2196f3", "#8bc34a"]}
                        />
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default Index
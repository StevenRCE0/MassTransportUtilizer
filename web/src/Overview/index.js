import React from "react";
import axios from "axios";
import './style.css';
import * as Widgets from '../Widgets/widgets';
import { MapsBlock } from '../Widgets/MapsBlock';
import { mapsStore } from "../Store";

const body = document.body

class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mapsStore: mapsStore.getState()
        }
        this.storeChange = this.storeChange.bind(this)
        mapsStore.subscribe(this.storeChange)
    }

    storeChange() {
        this.setState({mapsStore: mapsStore.getState})
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
            return (
                {
                    name: '综合压力',
                    value: 60
                }
            )
        }
        if (name === 'overloadedStation') {
            let result = {
                name: 'Sta233',
                flow: 50
            }
            console.log(this.state.mapsStore)
            return result
            // return (this.state.mapsStore.heatData.highestFlow)
        }
        if (name === 'distPressure') {
            return ([
                {name: 'dist1', value: 85},
                {name: 'dist3', value: 83},
                {name: 'dist5', value: 77},
                {name: 'dist6', value: 66}
            ])
        }
        if (name === 'lineStats') {
            let lineStatsResponse
            try {
                axios.post('/python/predict', {})
                    .then(response => {lineStatsResponse = response})
            }
            catch (error) {console.error(error)}
            return lineStatsResponse
        }
    }

    render() {
        const {size} = this.state
        return (
                <div className={"OverviewGrid"}>
                    <div className={"div1"}>
                        <Widgets.DashboardOne size={size} data={this.retrieveData('overloadedStation')}/>
                    </div>
                    <div className={"div2"}>
                        <Widgets.DashboardOne size={size} data={this.retrieveData('overall')}/>
                    </div>
                    <div className={"div3"}>
                        <Widgets.Dashboard size={size} data={this.retrieveData('distPressure')}>
                            客流高峰区域
                        </Widgets.Dashboard>
                    </div>
                    <div className={"div4"}>
                        <Widgets.Dashboard size={size} data={this.retrieveData('distPressure')}>
                            客流高峰区域
                        </Widgets.Dashboard>
                    </div>
                    <div className={"div5"}>
                        <MapsBlock
                            port={{"height": size * 4, "width": size * 4}}
                        />
                    </div>
                    {/*<div className={"div6"}>*/}
                    {/*    <Widgets.Dashboard size={size} data={this.retrieveData('distPressure')}>*/}
                    {/*        客流高峰区域*/}
                    {/*    </Widgets.Dashboard>*/}
                    {/*</div>*/}
                    {/*<div className={"div7"}>*/}
                    {/*    <Widgets.Dashboard size={size}/>*/}
                    {/*</div>*/}
                    {/*<div className={"div8"}>*/}
                    {/*    <Widgets.Trends*/}
                    {/*        port={{"height": size, "width": size * 2}}*/}
                    {/*    >*/}
                    {/*        Trends*/}
                    {/*    </Widgets.Trends>*/}
                    {/*</div>*/}
                    {/*<div className={"div9"}>*/}
                    {/*    <Widgets.SimpleTrends*/}
                    {/*        port={{"height": size, "width": size * 3}}*/}
                    {/*        tooltip={true}*/}
                    {/*    >*/}
                    {/*        SimpleTrends*/}
                    {/*    </Widgets.SimpleTrends>*/}
                    {/*</div>*/}
                    {/*<div className={"div10"}>*/}
                    {/*    <Widgets.SimpleBars*/}
                    {/*        port={{"height": size, "width": size * 2}}*/}
                    {/*        tint={["#2196f3", "#8bc34a"]}*/}
                    {/*    >*/}
                    {/*        Simple Bars*/}
                    {/*    </Widgets.SimpleBars>*/}
                    {/*</div>*/}
                </div>
        )
    }
}

export default Index
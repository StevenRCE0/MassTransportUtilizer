import React from "react";
import './style.css';
import * as Widgets from "../Widgets/widgets";
import store, {mapsStore} from "../Store";
import {fixDictionaryKeys} from "../Widgets/widgets";

const body = document.body

function getLineTimelines(timelineData) {
    let result = {
        xAxisMeasurements: '日',
        lines:
            fixDictionaryKeys(timelineData, ['name', 'values'])
    }
    console.log(result)
    return result
}

export class LineHeat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mapsState: mapsStore.getState().dashboardData,
        }
        mapsStore.subscribe(() => {
            this.setState({mapsState: mapsStore.getState().dashboardData})
        })
    }
    calculateSize = () => {
        this.setState({
            height: body.scrollHeight / 5,
            width: body.scrollWidth / 2.2,
            size: Math.min(body.scrollHeight / 5, body.scrollWidth / 3)
        })
    }
    componentDidMount() {
        window.addEventListener('resize', this.calculateSize)
        this.calculateSize()
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.calculateSize)
    }

    render() {
        const {height, width, mapsState} = this.state
        return(
            <div className={"LHGrid"} key={'pages-line-heat'}>
                <div className="div1">
                    <Widgets.SimpleBars
                        port={{height: height, width: width * 2}}
                        data={mapsState.lineFlow}
                        keys={['linename', 'flow']}
                        tint={['#09B8A3', '#23EB62', '#F0438F', '#EBBF23', '#A1C0F5', '#0977B8', '#B98AF5', '#F7DF34', '#F75A43', '#65A1C2']}
                        label
                        axis
                    >
                        当前全网线路客流
                    </Widgets.SimpleBars>
                </div>
                <div className="div2">
                    <Widgets.SimpleTrends
                        port={{height: height, width: width * 2}}
                        data={{
                            xAxisMeasurements: 'meow',
                            lines: [
                                {
                                    name: 'wow',
                                    values: [1, 2, 3]
                                },
                                {
                                    name: 'argh',
                                    values: [23, 12, 12]
                                }
                            ]
                        }}
                        tooltip
                        axis
                    />
                </div>
                <div className="div3"></div>
                <div className="div4"></div>
                <div className="div5"></div>
                <div className="div6"></div>
            </div>
        )
    }
}

export class HeatTimeline extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            storeState: store.getState(),
            timelineData: mapsStore.getState().dashboardData.sevenFlow
        }
        store.subscribe(() => this.setState({storeState: store.getState()}))
        mapsStore.subscribe(() => this.setState({timelineData: mapsStore.getState().dashboardData.sevenFlow}))
    }
    calculateSize = () => {
        this.setState({
            width: body.scrollWidth / 2.2,
            height: body.scrollHeight / 10,
        })
    }
    componentDidMount() {
        this.calculateSize()
        window.addEventListener('resize', this.calculateSize)
        mapsStore.dispatch({type: 'refresh'})
    }
    componentWillUnmount() {
        window.removeEventListener('resize', this.calculateSize)
    }

    render() {
        const { height, width } = this.state
        const testData = {
            xAxisMeasurement: '日',
            lines: [{
                name: '1号线', values: [1, 2, 3, 4, 5, 6]
            }]
        }
        return(
            <div className={"THGrid"} key={'pages-timeline-heat'}>
                <div className="div1">
                    <Widgets.SimpleTrends
                        port={{'height':  height, 'width': width * 2}}
                        data={testData}
                        tooltip
                        axis
                    >
                        近日客流量时间分布
                    </Widgets.SimpleTrends>
                </div>
                <div className="div2">
                    <Widgets.Trends
                        port={{'height': height, 'width': width}}
                    />
                </div>
                <div className="div3">
                    <Widgets.AreaChartTrends
                        port={{'height': height, 'width': width}}
                    />
                </div>
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
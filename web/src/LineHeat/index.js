import React from "react";
import './style.css';
import * as Widgets from "../Widgets/widgets";
import store, {mapsStore, searchArray} from "../Store";

const body = document.body
const lineArray = ['1号线', '2号线', '3号线', '4号线', '5号线', '10号线', '11号线', '12号线']
const tintArray=['#09B8A3', '#23EB62', '#A1C0F5', '#0977B8', '#658EA4', '#F5DE2F', '#F58CB2', '#7FDAFA', '#7A5DF9']

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
            height: body.scrollHeight / 12,
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

    getLineMap(name) {
        const lineData = this.state.mapsState.hotPowerGraph
        const mapArray = searchArray(lineData, 'line', name, 'level')
        return {
            xAxisMeasurement: '站点',
            lines: [
                {name: name, values: mapArray}
            ]
        }
    }
    getBlocks() {
        const { height, width } = this.state
        const outerMethods = (name) => this.getLineMap(name)
        return lineArray.map(function (data, index) {
            return ([
                <div className={"div" + (index + 2)}>
                    <Widgets.SimpleTrends
                        port={{'height': height, 'width': width * 2}}
                        data={outerMethods(lineArray[index])}
                        tint={[tintArray[index]]}
                        tooltip
                        axis
                    >
                        {lineArray[index]}客流记录和预测数据
                    </Widgets.SimpleTrends>
                </div>
            ])
        }, height, width, outerMethods, lineArray, tintArray)

    }
    getLineBars() {
        const {overallFlow} = this.state.mapsState
        return this.state.mapsState.lineFlow.map(function (line) {
            if (line.linename === '全网') {
                return {linename: '全网', flow: overallFlow}
            }
            return line
        }, overallFlow)
    }

    render() {
        const {height, width} = this.state
        return(
            <div className={"LHGrid"} key={'pages-line-heat'}>
                <div className="div1">
                    <Widgets.SimpleBars
                        port={{height: height, width: width * 2}}
                        data={this.getLineBars()}
                        keys={['linename', 'flow']}
                        tint={['#09B8A3', '#23EB62', '#F0438F', '#EBBF23', '#A1C0F5', '#0977B8', '#B98AF5', '#F7DF34', '#F75A43', '#65A1C2']}
                        label
                        axis
                    >
                        当前全网线路客流
                    </Widgets.SimpleBars>
                </div>
                {this.getBlocks()}
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

    getLineTimeline(index, name) {
        try {
            const result = {
                xAxisMeasurement: '日',
                lines: [{
                    name: name,
                    values: this.state.timelineData[index].values
                }]
            }
            return (result)
        }
        catch (e) {}
        return {
            xAxisMeasurements: '加载中',
            lines: []
        }
    }
    getLineTimelines() {
        try {
            let lineMapArray = this.state.timelineData.map(function (lineData) {
                return (
                    {
                        name: lineData.linename,
                        values: lineData.values
                    }
                )
            })
            return {
                xAxisMeasurement: '日',
                lines: lineMapArray
            }
        }
        catch (e) {}
        return {
            xAxisMeasurements: '加载中',
            lines: []
        }
    }
    getBlocks() {
        const { height, width } = this.state
        const outerMethods = (line, name) => this.getLineTimeline(line, name)
        return this.state.timelineData.map(function (line, index) {
            return ([
                <div className={"div" + (index + 2)}>
                    <Widgets.SimpleTrends
                        port={{'height': height, 'width': width}}
                        data={outerMethods(index, lineArray[index])}
                        tint={[tintArray[index]]}
                        tooltip
                        axis
                    >
                        {lineArray[index]}客流记录和预测数据
                    </Widgets.SimpleTrends>
                </div>
            ])
        }, height, width, outerMethods, lineArray, tintArray)

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
                {this.getBlocks()}
            </div>
        )
    }
}
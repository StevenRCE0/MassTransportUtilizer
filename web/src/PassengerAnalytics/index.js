import React from "react";
import './style.css';
import * as Widgets from '../Widgets/widgets';
import {PassengerMapsBlock} from "../Widgets/MapsBlock";
import store, {mapsStore} from "../Store";

const body = document.body
const passengerArray=['16岁以下', '16~25', '25~40', '40~60', '60岁以上', '16岁以下', '16~25', '25~40', '40~60', '60岁以上', '16岁以下', '16~25', '25~40', '40~60', '60岁以上']
const tintArray=[['#09B8A3', '#23EB62', '#A1C0F5', '#0977B8', '#658EA4'], ['#F5E3D0', '#F5DE2F', '#F58CB2', '#7FDAFA', '#7A5DF9']]

class PassengerAnalytics extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            stationInward: mapsStore.getState().ageMapSpectating.inward,
            stationOutward: mapsStore.getState().ageMapSpectating.outward,
            activated: store.getState().passengerMode,
        }
        mapsStore.subscribe(() => {
            this.setState({
                stationInward: mapsStore.getState().ageMapSpectating.inward,
                stationOutward: mapsStore.getState().ageMapSpectating.outward,
            })
            this.forceUpdate()
        })
        store.subscribe(() => {
            this.setState({activated: store.getState().passengerMode})
        })
    }

    calculateSize = () => {
        this.setState({
            height: body.scrollHeight / 6,
            width: body.scrollWidth / 6,
            size: Math.min(body.scrollHeight / 6, body.scrollWidth / 10)
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

    arrayCoherence(keys, values, slice) {
        let newArray = []
        try {
            values.map(function (value, index) {
                if (slice === undefined) {
                    let newDictionary = {
                        key: keys[index],
                        value: value
                    }
                    newArray.push(newDictionary)
                }
                else if (index >= slice[0] && index <= slice[1]) {
                    let newDictionary = {
                        key: keys[index],
                        value: value
                    }
                    newArray.push(newDictionary)
                }
                return true
            })
        }
        catch (e) {
            newArray = [{key: '数据加载中', value: 100}]
        }

        return newArray
    }
    getSlice() {
        if (this.state.activated === '进站') {
            return [0, 4]
        }
        if (this.state.activated === '出站') {
            return [5, 9]
        }
        if (this.state.activated === '总客流') {
            return [10, 14]
        }
    }
    getSum(type, data0, data1) {
        try {
            if (type === 'inOut') {
                let inward = 0
                let outward = 0
                data0.slice(10, 14).map(function (value) {
                    inward += value
                    return true
                })
                data1.slice(10, 14).map(function (value) {
                    outward += value
                    return true
                })
                return [
                    {key: '进站', value: inward},
                    {key: '出站', value: outward}
                ]
            }
            if (type === 'inOutBar') {
                let inward = 0
                let outward = 0
                data0.slice(10, 14).map(function (value) {
                    inward += value
                    return true
                })
                data1.slice(10, 14).map(function (value) {
                    outward += value
                    return true
                })
                //eslint-ignore-next-line
                return {'进站': inward, '出站': outward}
            }
            if (type === 'gender') {
                let girls = 0
                let boys = 0
                data0.slice(0, 4).map(function (value) {
                    girls += value
                    return true
                })
                data1.slice(0, 4).map(function (value) {
                    girls += value
                    return true
                })
                data0.slice(5, 10).map(function (value) {
                    boys += value
                    return true
                })
                data1.slice(5, 10).map(function (value) {
                    boys += value
                    return true
                })
                return [
                    {key: '女性', value: girls},
                    {key: '男性', value: boys}
                ]
            }
        }
        catch (e) {}
        return ({key: '加载中', value: 0})
    }

    render() {
        const {height, width, size} = this.state
        return(
            <React.Fragment>
                <div className={"PAGrid"}>
                    <div className="div1">
                        <PassengerMapsBlock
                            port={{height: height * 4, width: width * 2}}
                        />
                    </div>
                    <div className="div2">
                        <Widgets.SimplePieCharts
                            size={size * 2}
                            duet
                            tint={tintArray}
                            data={this.arrayCoherence(passengerArray, this.state.stationInward, this.getSlice())}
                            data0={this.getSum('inOut', this.state.stationInward, this.state.stationOutward)}
                        >
                            所选站点乘客结构
                        </Widgets.SimplePieCharts>
                    </div>
                    <div className="div3">
                        <Widgets.SimplePieCharts
                            size={size * 2}
                            tint={tintArray[0]}
                            data={this.arrayCoherence(passengerArray, [88, 99, 77, 66, 55, 44, 33, 22, 11, 44, 55, 66, 77, 88, 99, 100], [10, 14])}
                        >
                            全网乘客结构
                        </Widgets.SimplePieCharts>
                    </div>
                    <div className="div4">
                        <Widgets.SimplePieCharts
                            size={size}
                            data={this.getSum('gender', this.state.stationInward, this.state.stationOutward)}
                            tint={tintArray[1]}
                        >
                            当前站点客流性别比例
                        </Widgets.SimplePieCharts>
                    </div>
                    <div className="div5">
                        <Widgets.SimpleBars
                            port={{"height": size, "width": width}}
                            tint={["#FAA45A", "#FA5A9F"]}
                            data={this.getSum('inOutBar', this.state.stationInward, this.state.stationOutward)}
                            label
                        >
                            当前站点进出站客流
                        </Widgets.SimpleBars>
                    </div>
                    <div className="div6">
                        <Widgets.SimpleBars
                            port={{"height": size, "width": size * 2}}
                            tint={["#5CD0FF", "#98FA8A"]}
                            data={{'女性':55, '男性':50}}
                        >
                            全网乘客性别比例
                        </Widgets.SimpleBars>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default PassengerAnalytics
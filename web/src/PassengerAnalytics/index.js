import React from "react";
import './style.css';
import * as Widgets from '../Widgets/widgets';
import {PassengerMapsBlock} from "../Widgets/MapsBlock";
import store, {mapsStore} from "../Store";

const body = document.body
const passengerArray=['16岁以下', '16~25', '25~40', '40~60', '60岁以上', '16岁以下', '16~25', '25~40', '40~60', '60岁以上', '16岁以下', '16~25', '25~40', '40~60', '60岁以上']

class PassengerAnalytics extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            mapsState: mapsStore.getState().dashboardData,
            activated: store.getState().passengerMode
        }
        mapsStore.subscribe(() => {
            this.setState({mapsStore: mapsStore.getState().dashboardData})
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
    }
    componentWillUnmount() {
        window.removeEventListener('resize', this.calculateSize)
    }

    arrayCoherence(keys, values, slice) {
        let newArray = []
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
                            tint={[['#09B8A3', '#23EB62', '#A1C0F5', '#0977B8', '#658EA4'], ['#F0438F', '#EBBF23']]}
                            data={this.arrayCoherence(passengerArray, [88, 99, 77, 66, 55, 44, 33, 22, 11, 44, 55, 66, 77, 88, 99, 100], this.getSlice())}
                            data0={this.arrayCoherence(passengerArray, [88, 99, 77, 66, 55, 44, 33, 22, 11, 44, 55, 66, 77, 88, 99, 100], this.getSlice())}
                        >
                            所选站点乘客结构
                        </Widgets.SimplePieCharts>
                    </div>
                    <div className="div3">
                        <Widgets.SimplePieCharts
                            size={size * 2}
                            duet
                            tint={[['#09B8A3', '#23EB62', '#A1C0F5', '#0977B8', '#658EA4'], ['#F0438F', '#EBBF23']]}
                            data={this.arrayCoherence(passengerArray, [88, 99, 77, 66, 55, 44, 33, 22, 11, 44, 55, 66, 77, 88, 99, 100], [10, 14])}
                            data0={this.arrayCoherence(passengerArray, [88, 99, 77, 66, 55, 44, 33, 22, 11, 44, 55, 66, 77, 88, 99, 100], [10, 14])}
                        >
                            全网乘客结构
                        </Widgets.SimplePieCharts>
                    </div>
                    <div className="div4">
                        <Widgets.SimplePieCharts
                            size={size}
                            data={this.arrayCoherence(['u', 'v'], [88, 99])}
                            tint={['#A1C0F5', '#0977B8']}
                        >
                            当前站点客流性别比例
                        </Widgets.SimplePieCharts>
                    </div>
                    <div className="div5">
                        <Widgets.SimpleBars
                            port={{"height": size, "width": size * 2}}
                            tint={["#2196f3", "#8bc34a"]}
                            data={{u:90, p:5}}
                        >
                            Simple Bars
                        </Widgets.SimpleBars>
                    </div>
                    <div className="div6">
                        <Widgets.SimpleBars
                            port={{"height": size, "width": size * 2}}
                            tint={["#2196f3", "#8bc34a"]}
                            data={{u:90, p:5}}
                        >
                            Simple Bars
                        </Widgets.SimpleBars>
                    </div>
                    <div className="div7">
                        <Widgets.SimpleBars
                            port={{"height": size, "width": size * 2}}
                            tint={["#2196f3", "#8bc34a"]}
                            data={{u:90, p:5}}
                        >
                            Simple Bars
                        </Widgets.SimpleBars>
                    </div>
                    <div className="div8">
                        <Widgets.SimpleBars
                            port={{"height": size, "width": size * 2}}
                            tint={["#2196f3", "#8bc34a"]}
                            data={{u:90, p:5}}
                        >
                            Simple Bars
                        </Widgets.SimpleBars>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default PassengerAnalytics
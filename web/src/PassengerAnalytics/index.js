import React from "react";
import './style.css';
import * as Widgets from '../Widgets/widgets';
import {PassengerMapsBlock} from "../Widgets/MapsBlock";
import {mapsStore} from "../Store";

const body = document.body

class PassengerAnalytics extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            mapsState: mapsStore.getState().dashboardData,
        }
    }

    calculateSize = () => {
        this.setState({
            height: body.scrollHeight / 6,
            width: body.scrollWidth / 6,
            size: Math.min(body.scrollHeight / 6, body.scrollWidth / 10)
        })
        mapsStore.subscribe(() => {
            this.setState({mapsState: mapsStore.getState().dashboardData})
        })
    }
    componentDidMount() {
        this.calculateSize()
        window.addEventListener('resize', this.calculateSize)
    }
    componentWillUnmount() {
        window.removeEventListener('resize', this.calculateSize)
    }

    ArrayCoherence(keys, values) {
        let newArray = []
        values.map(function (value, index) {
            let newDictionary = {
                key: keys[index],
                value: value
            }
            newArray.push(newDictionary)
            return true
        })
        return newArray
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
                        {/*<Widgets.SimpleBars*/}
                        {/*    port={{"height": size, "width": size * 2}}*/}
                        {/*    tint={["#2196f3", "#8bc34a"]}*/}
                        {/*    data={{u:90, p:5}}*/}
                        {/*>*/}
                        {/*    Simple Bars*/}
                        {/*</Widgets.SimpleBars>*/}
                    </div>
                    <div className="div2">
                        <Widgets.SimplePieCharts
                            size={size * 2}
                            duet
                            tint={[['#09B8A3', '#23EB62'], ['#F0438F', '#EBBF23']]}
                            data={this.ArrayCoherence(['u', 'v'], [88, 99])}
                            data0={this.ArrayCoherence(['u', 'v'], [88, 99])}
                        >
                            当前站点乘客结构
                        </Widgets.SimplePieCharts>
                    </div>
                    <div className="div3">
                        <Widgets.SimplePieCharts
                            size={size * 2}
                            data={this.ArrayCoherence(['u', 'v'], [88, 99])}
                            tint={['#A1C0F5', '#0977B8']}
                        >
                            线网乘客结构
                        </Widgets.SimplePieCharts>
                    </div>
                    <div className="div4"></div>
                    <div className="div5"></div>
                    <div className="div6"></div>
                    <div className="div7"></div>
                    <div className="div8"></div>
                    <div className="div9"></div>
                    <div className="div10"></div>
                </div>
            </React.Fragment>
        )
    }
}

export default PassengerAnalytics
import React from "react";
import './style.css';
import * as Widgets from '../Widgets/widgets';
import { MapsBlock } from '../Widgets/MapsBlock';
import { mapsStore, refreshDashboard } from "../Store";

const body = document.body

class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mapsState: mapsStore.getState().dashboardData,
            size: undefined
        }
        this.storeChange = this.storeChange.bind(this)
        mapsStore.subscribe(this.storeChange)
    }

    storeChange() {
        this.setState({mapsState: mapsStore.getState().dashboardData})
    }

    calculateSize = () => {
        this.setState({
            size: Math.min(body.scrollHeight / 6, body.scrollWidth / 8)
        })
    }
    componentDidMount() {
        window.addEventListener('resize', this.calculateSize)
        this.calculateSize()
    }
    componentWillUnmount() {
        window.removeEventListener('resize', this.calculateSize)
    }
    setData(name) {
        if (name === 'overall') {
            const data = this.state.mapsState.highestFlow
            if (data !== undefined) {return data}
            return ({name: '数据暂缺', value: 0})
        }
        if (name === 'overloadedStation') {
            const data = this.state.mapsState.highestFlow
            if (data !== undefined) {return data}
            return ({name: '数据暂缺', value: 0})
        }
        if (name === 'distPressure') {
            return ([
                {name: 'dist1', value: 85},
                {name: 'dist3', value: 83},
                {name: 'dist5', value: 77},
                {name: 'dist6', value: 66}
            ])
        }
    }

    render() {
        const {size} = this.state
        return (
                <div className={"OverviewGrid"}>
                    <div className={"div1"}>
                        <Widgets.DashboardOne size={size} data={undefined}/>
                    </div>
                    <div className={"div2"}>
                        <Widgets.DashboardOne size={size} data={undefined}/>
                    </div>
                    <div className={"div3"}>
                        <Widgets.Dashboard size={size} data={undefined}>
                            客流高峰区域
                        </Widgets.Dashboard>
                    </div>
                    <div className={"div4"}>
                        <Widgets.Dashboard size={size} data={undefined}>
                            客流高峰区域
                        </Widgets.Dashboard>
                    </div>
                    <div className={"div5"}>
                        <MapsBlock
                            port={{"height": size * 4, "width": size * 4}}
                        />
                    </div>
                </div>
        )
    }
}

export default Index
import React from "react";
import './style.css';
import * as Widgets from '../Widgets/widgets';
import { MapsBlock } from '../Widgets/MapsBlock';
import { mapsStore } from "../Store";
import {Redirect} from "react-router-dom";

const body = document.body

class Index extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            mapsState: mapsStore.getState().dashboardData,
            size: Math.min(body.scrollHeight / 6, body.scrollWidth / 8),
        }
        mapsStore.subscribe(() => {
            console.log('newState')
            this.setState({mapsState: mapsStore.getState().dashboardData})
            this.forceUpdate()
        })
    }
    mapsStoreListener() {
        this.setState({mapsState: mapsStore.getState().dashboardData})
    }
    calculateSize = () => {
        this.setState({
            size: Math.min(body.scrollHeight / 6, body.scrollWidth / 8)
        })
    }
    componentDidMount() {
        window.addEventListener('resize', this.calculateSize)
        setTimeout(() => {mapsStore.dispatch({type: 'refresh'})}, 500)
        this.calculateSize()
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.calculateSize)
    }

    render() {
        const {size, mapsState} = this.state
        console.log(this.state.mapsState.highestFlow)
        if (mapsState === undefined) {
            setTimeout(function () {
                return (<Redirect to={'.'}/>)
            },1000)

        }
        return (
            <div className={"OverviewGrid"}>
                <div className={"div1"}>
                    <Widgets.DashboardOne size={size} data={mapsState.highestFlow}>
                        客流最高站点
                    </Widgets.DashboardOne>
                </div>
                <div className={"div2"}>
                    <Widgets.DashboardOne size={size} data={undefined}/>
                </div>
                <div className={"div3"}>
                    <Widgets.Dashboard size={size} data={mapsState.highestDist4}>
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
                        port={{"height": size * 5, "width": size * 4}}
                    />
                </div>
            </div>
        )
    }
}

export default Index
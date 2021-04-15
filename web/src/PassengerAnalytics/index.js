import React from "react";
import './style.css';
import * as Widgets from '../Widgets/widgets';

const body = document.body

class PassengerAnalytics extends React.Component {

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
    render() {
        const {size} = this.state
        return(
            <React.Fragment>
                <div className={"PAGrid"}>
                    <div className="div1">
                            <Widgets.SimpleBars
                                port={{"height": size, "width": size * 2}}
                                tint={["#2196f3", "#8bc34a"]}
                            >
                                Simple Bars
                            </Widgets.SimpleBars>
                    </div>
                    <div className="div2"></div>
                    <div className="div3"></div>
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
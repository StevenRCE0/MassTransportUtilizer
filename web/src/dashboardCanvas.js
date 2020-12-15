import React from 'react';
import ReactDOM from 'react-dom';
import {Rect} from "react-konva";

class Dashboard extends React.Component {
    render() {
        return (
            <Rect
                x={10} y={10} width={50} height={50}
                fill={this.state.color}
                shadowBlur={10}
            />
        )
    }
}

export default Dashboard
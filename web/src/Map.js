import React from "react";
import {Stage, Layer, Circle, Group, Text, Ring} from "react-konva";

class Point extends React.Component {
    constructor(props) {
        super(props);
        this.state = {x: this.props.x, y: this.props.y, level: this.props.level, type: this.props.type, station: this.props.station}
    }
    render() {
        const basis = 2;
        const multiplier = 2;
        const radius = this.state.level * multiplier * basis;
        return(
            <Group x={this.state.x} y={this.state.y}>
                <Ring innerRadius={radius} outerRadius={radius * 1.5} fill={'#F00'} stroke={'#FFF'} shadowBlur={6} shadowColor={'rgba(0, 0, 0, .5)'}/>
                <Text text={this.state.station} fontSize={20} x={radius * 1.5 + 5}/>
            </Group>
        )
    }
}

class MapFuture extends React.Component {

    render() {
        let pointSet = [];
        pointSet.push(
            <Point x={50} y={500} level={5} station={'sta999'}/>
        )
        pointSet.push(
            <Point x={100} y={50} level={2} station={'sta666'}/>
        )

        return(
            <Stage height={window.innerHeight} width={window.innerWidth}>
                <Layer>
                    {pointSet}
                </Layer>
            </Stage>
        )
    }
}

export default MapFuture
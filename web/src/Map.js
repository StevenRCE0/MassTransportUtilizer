import React from "react";
import {Stage, Layer, Circle, Group, Text, Ring, Line, Rect} from "react-konva";
import "./dashboard.css";

class Point extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.id,
            x: this.props.x,
            y: this.props.y,
            level: this.props.level,
            type: this.props.type,
            line: this.props.line,
            station: this.props.station
        }
    }
    render() {
        const basis = 2;
        const multiplier = 2;
        const radius = this.state.level * multiplier * basis;
        return(
            <Group x={this.state.x} y={this.state.y}>
                <Circle
                    radius={radius * 0.5}
                    fill={'#FFF'}
                    onClick={() => this.props.setPanel(0, 'station', [this.state.x, this.state.y], 1)}
                />
                <Ring
                    innerRadius={radius * 0.5}
                    outerRadius={radius}
                    fill={'#990'}
                />
                <Text text={this.state.station} fontSize={20} x={radius * 1.5 + 5}/>
            </Group>
        )
    }
}
class Path extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.id,
            x1: this.props.x1,
            y1: this.props.y1,
            x2: this.props.x2,
            y2: this.props.y2,
            level: this.props.level,
            line: this.props.line
        }
    }
    render() {
        const strokeWidth = 5 + this.state.level * 0.1;
        return(
            <Line
                x={0}
                y={0}
                points={[this.state.x1, this.state.y1, this.state.x2, this.state.y2]}
                stroke={'#BBB'}
                strokeWidth={strokeWidth}
            />
        )
    }
}
class Panel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            x: this.props.x,
            y: this.props.y,
        }
        if (this.props.type === 'station') {

        }
    }
    render() {
        const width = 50;
        const height = 80;

        return (
            <Group>
                <Rect width={width} height={height} fill={'#EEE'}/>
            </Group>
        )
    }
}

class MapFuture extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            panel: {pos: [], id: 0}
        }
    }
    setPanel (id, type, pos, activated) {
        this.setState({panel: {pos, id}});
        alert('nyan');
    }
    showPanel () {
        if (this.state.pos === undefined) {
            return(
                <React.Fragment/>
            )
        }
        return(
            <Panel
                x={this.state.pos[0]}
                y={this.state.pos[1]}
            />
        )
    }
    render() {
        let pointSet = [];
        let pathSet = [];
        pointSet.push(
            <Point x={50} y={500} level={5} station={'sta999'} setPanel={(id, type, pos, activated) => {this.setPanel(id, type, pos, activated)}}/>
        )
        pointSet.push(
            <Point x={100} y={50} level={2} station={'sta666'} setPanel={(id, type, pos, activated) => {this.setPanel(id, type, pos, activated)}}/>
        )
        pathSet.push((
            <Path x1={50} y1={500} x2={100} y2={50} level={20}/>
        ))

        return(
            <div className={"Layer"}>
                <Stage height={window.innerHeight} width={window.innerWidth}>
                    <Layer id={'FMpaths'}>
                        {pathSet}
                    </Layer>
                    <Layer id={'FMstations'}>
                        {pointSet}
                    </Layer>
                    <Layer id={'FMpanels'}>
                        {this.showPanel()}
                    </Layer>
                </Stage>
            </div>
        )
    }
}

export default MapFuture
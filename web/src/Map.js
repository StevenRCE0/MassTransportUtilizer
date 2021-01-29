import React from "react";
import {Stage, Layer, Circle, Group, Text, Ring, Line, Rect} from "react-konva";
import "./Overview/style.css";

let stationData = require('./stationaryPlaceholder/stations.json');
let pathData = require('./stationaryPlaceholder/paths.json');
const lineTintArray = [
    "#ADEA7D", "#FBDE5D", "#E23424", "#3487E9", "#6937E5","#984323", "#000", "#000", "#AF7525", "#8643B5", "#567874", "#227754", "#85468E"
]

class Point extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.id,
            x: this.props.x,
            y: this.props.y,
            level: this.props.level,
            type: this.props.type,
            line: this.props.line.match('^[0-9]+'),
            station: this.props.station.match('[0-9]+'),
        }
    }

    render() {
        const basis = 2;
        const multiplier = 2;
        const radius = this.state.level * multiplier * basis;
        return (
            <Group x={this.state.x} y={this.state.y}>
                <Circle
                    radius={radius * 0.5}
                    fill={'#FFF'}
                    onClick={() => this.props.setPanel(0, 'station', [this.state.x, this.state.y], 1)}
                />
                <Ring
                    innerRadius={radius * 0.5}
                    outerRadius={radius}
                    fill={this.props.tint}
                />
                <Text
                    text={this.state.station}
                    fontSize={9}
                    stroke={'#FFF'}
                    fillAfterStrokeEnabled={true}
                    x={-radius}
                />
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
            line: this.props.line.match('^[0-9]+'),
        }
    }

    render() {
        const strokeWidth = 5 + this.state.level * 0.1
        const coordinates = (this.props.additionalCoordinates !== undefined) ? [this.state.x1, this.state.y1].concat(this.props.additionalCoordinates).concat([this.state.x2, this.state.y2]) : [this.state.x1, this.state.y1, this.state.x2, this.state.y2]
        return (
            <Line
                x={0}
                y={0}
                points={coordinates}
                stroke={lineTintArray[this.state.line]}
                strokeWidth={strokeWidth}
                lineJoin={'round'}
                lineCap={'round'}
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
        this.state = {}
    }

    setPanel(id, type, pos, activated) {
        this.setState({panel: {pos, id}});
        alert('nyan');
    }


    showPanel() {
        if (this.state.pos === undefined) {
            return (
                <React.Fragment/>
            )
        }
        return (
            <Panel
                x={this.state.pos[0]}
                y={this.state.pos[1]}
            />
        )
    }

    render() {
        const widthIndex = this.props.width / 20000
        const heightIndex = this.props.height / 20000
        const pathSet = pathData.map(function (path) {
            return (
                <Path
                    x1={path.x1 * widthIndex}
                    y1={path.y1 * heightIndex}
                    x2={path.x2 * widthIndex}
                    y2={path.y2 * heightIndex}
                    additionalCoordinates={(path.additionalCoordinates !== undefined) ? path.additionalCoordinates.map(function (turnPoint, pointIndex) {
                        return((pointIndex / 2 === 0) ? turnPoint * widthIndex : turnPoint * heightIndex)
                    }) : undefined}
                    level={1}
                    line={path.line}
                />
            )
        });
        const pointSet = stationData.map(function (point) {
            return (
                <Point
                    x={point.x * widthIndex} y={point.y * heightIndex} level={1} station={point.station} line={point.line}
                    tint={lineTintArray[point.line.match("^[0-9]+")]}
                />
            )
        })

        return (
            <Stage height={this.props.height + 50} width={this.props.width + 50}>
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
        )
    }
}

export default MapFuture
import React from "react";
import {Stage, Layer, Circle, Group, Text, Ring, Line} from "react-konva";
import "./Overview/style.css";
import store from './Store';

const stationData = require('./stationaryPlaceholder/stations.json');
const pathData = require('./stationaryPlaceholder/paths.json');
const lineTintArray = [
    "#ADEA7D", "#FBDE5D", "#E23424", "#3487E9", "#6937E5","#984323", "#000", "#000", "#000", "#000", "#E67874", "#009734", "#43B7AE"
]

function hoverResponse(type, id, line) {
    store.dispatch({
        type: 'hoverUpdate',
        hoverType: type,
        hoverID: id,
        line: line
    })
}

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
        const multiplier = (this.props.type === "1") ? 3 : 2;
        const radius = this.state.level * multiplier * basis;
        return (
            <Group x={this.state.x} y={this.state.y} onClick={this.props.onClick}>
                <Circle
                    radius={radius * 0.5}
                    fill={'#FFF'}
                />
                <Ring
                    innerRadius={radius * 0.5}
                    outerRadius={radius}
                    fill={(this.props.type === "1") ? '#171717' : this.props.tint}
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
            additionalCoordinates: this.props.additionalCoordinates,
            level: this.props.level,
            line: this.props.line.match('^[0-9]+'),
        }
    }

    render() {
        const strokeWidth = 5 + this.state.level * 0.1
        const coordinates = (this.state.additionalCoordinates !== undefined) ? [this.state.x1, this.state.y1].concat(this.state.additionalCoordinates).concat([this.state.x2, this.state.y2]) : [this.state.x1, this.state.y1, this.state.x2, this.state.y2]
        return (
            <Line
                x={0}
                y={0}
                points={coordinates}
                stroke={lineTintArray[this.state.line]}
                strokeWidth={strokeWidth}
                lineJoin={'round'}
                lineCap={'round'}
                onClick={this.props.onClick}
                draggable={true}
            />
        )
    }
}

class MapFuture extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mode: this.props.mode
        }
    }

    render() {
        const widthIndex = this.props.width / 17500
        const heightIndex = this.props.height / 20000
        const heatMode = (this.state.mode === '热力图')
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
                    onClick={() => hoverResponse('path', path.id, path.line)}
                />
            )
        });
        const pointSet = stationData.map(function (point) {
            return (
                <Point
                    x={point.x * widthIndex} y={point.y * heightIndex}
                    level={heatMode ? point.level : 1}
                    type={point.type}
                    station={point.station}
                    line={point.line}
                    tint={lineTintArray[point.line.match("^[0-9]+")]}
                    onClick={() => hoverResponse('station', point.station, point.line)}
                />
            )
        })

        return (
            <Stage height={this.props.height + 50} width={this.props.width + 250}>
                <Layer id={'FMpaths'}>
                    {pathSet}
                </Layer>
                <Layer id={'FMstations'}>
                    {pointSet}
                </Layer>
            </Stage>
        )
    }
}

export default MapFuture
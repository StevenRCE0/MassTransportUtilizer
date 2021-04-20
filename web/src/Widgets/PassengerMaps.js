import React from "react";
import {Circle, Group, Ring, Text, Stage, Layer} from "react-konva";
import {mapsExposedMethods, mapsStore} from "../Store";
import {PersistGate} from "redux-persist/integration/react";
import {lineTintArray, hoverResponse} from "./Map";

const transformToCentre = {
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
}

class Point extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.id,
            x: this.props.x,
            y: this.props.y,
            level: this.props.level,
            line: this.props.line.match('^[0-9]+'),
            station: this.props.station.match('[0-9]+'),
        }
    }
    render() {
        const basis = 1.5;
        const multiplier = (this.props.type === "1") ? 3 : 2;
        const radius = this.state.level * multiplier * basis;
        return (
            <Group x={this.state.x} y={this.state.y} onClick={this.props.onClick}>
                <Circle
                    radius={radius}
                    fill={(this.props.type === "1") ? '#171717' : this.props.tint}
                />
                <Ring
                    innerRadius={radius}
                    outerRadius={radius+3}
                    fill={'#FFF'}
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

class PassengerMaps extends React.Component {
    render() {
        const widthIndex = this.props.width / 16000
        const heightIndex = this.props.height / 19000
        const offset = {x: 40, y: 60}
        const pointSet = mapsStore.getState().stationData.map(function (point) {
            return (
                <React.Suspense fallback={<Point/>}>
                    <Point
                        x={point.x * widthIndex + offset.x} y={point.y * heightIndex + offset.y}
                        level={1}
                        type={point.type}
                        station={point.station}
                        line={point.line}
                        tint={lineTintArray[point.line.match("^[0-9]+")]}
                        onClick={() => hoverResponse('age', point.station, point.line, point.age)}
                    />
                </React.Suspense>
            )
        })
        return (
            <PersistGate store={mapsStore} persistor={mapsExposedMethods}>
                <Stage style={transformToCentre} width={this.props.width + 250} height={this.props.height + 150}>
                    <Layer id={'PMstations'} style={transformToCentre}>
                        {pointSet}
                    </Layer>
                </Stage>
            </PersistGate>
        )
    }
}

export default PassengerMaps
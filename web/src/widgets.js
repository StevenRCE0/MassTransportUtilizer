import React from 'react';
import './dashboard.css';
import {
    RadialBarChart,
    RadialBar,
    PolarAngleAxis,
    Legend,
    Cell,
    LineChart,
    CartesianGrid,
    XAxis,
    YAxis, Line
} from "recharts";
// import {Layer, Rect, Stage} from "react-konva
// import {CircularProgress} from "@material-ui/core";

function linesConstructor(dataArray, tintArray) {
    return dataArray.map(
        function (line, index) {
            return (
                <Line
                    key={index}
                    type={"monotone"}
                    datakey={"key"}
                    stroke={tintArray[index]}
                />
            )
        }
    )
}

export class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {size: 300, rounded: 20}
    }
    render() {
        const spacing = this.state.rounded * 1.5
        const data = [{name: '摸鱼', value: 40}, {name: '摸到', value: 90}, {name: '意识', value: 60}, {name: '模糊', value: 70}];
        const tint = ["#137A7F", "#373B3E", "#E12885", "#66CCFF"]
        const frame = {height: this.state.size, width: this.state.size, borderRadius: this.state.rounded}
        return (
            <div className={'Layer'} style={frame}>
                <RadialBarChart
                    style={{position: 'absolute', left: spacing, top: spacing}}
                    width={this.state.size / 2.75}
                    height={this.state.size / 2.75}
                    data={data.slice(0, 1)}
                    innerRadius={this.state.size / 5}
                >
                    <PolarAngleAxis
                        type={"number"}
                        domain={[0, 100]}
                        angleAxisId={0}
                        tick={false}
                    />
                    <RadialBar
                        minAngle={0}
                        angleAxisId={0}
                        dataKey={"value"}
                        cornerRadius={"100%"}
                        background
                    >
                        <Cell fill={tint[0]}/>
                    </RadialBar>
                    <Legend verticalAlign={"middle"} align={"center"} iconSize={0} wrapperStyle={{transform: "translateX(4px)"}}/>
                </RadialBarChart>
                <RadialBarChart
                    style={{position: 'absolute', right: spacing, top: spacing}}
                    width={this.state.size / 2.75}
                    height={this.state.size / 2.75}
                    data={data.slice(1, 2)}
                    innerRadius={this.state.size / 5}
                >
                    <PolarAngleAxis
                        type={"number"}
                        domain={[0, 100]}
                        angleAxisId={0}
                        tick={false}
                    />
                    <RadialBar
                        minAngle={0}
                        angleAxisId={0}
                        dataKey={"value"}
                        cornerRadius={"100%"}
                        background
                    >
                        <Cell fill={tint[1]}/>
                    </RadialBar>
                        <Legend verticalAlign={"middle"} align={"center"} iconSize={0} wrapperStyle={{transform: "translateX(4px)"}}/>
                </RadialBarChart>
                <RadialBarChart
                    style={{position: 'absolute', left: spacing, bottom: spacing}}
                    width={this.state.size / 2.75}
                    height={this.state.size / 2.75}
                    data={data.slice(2, 3)}
                    innerRadius={this.state.size / 5}
                >
                    <PolarAngleAxis
                        type={"number"}
                        domain={[0, 100]}
                        angleAxisId={0}
                        tick={false}
                    />
                    <RadialBar
                        minAngle={0}
                        angleAxisId={0}
                        dataKey={"value"}
                        cornerRadius={"100%"}
                        background
                    >
                        <Cell fill={tint[2]}/>
                    </RadialBar>
                        <Legend verticalAlign={"middle"} align={"center"} iconSize={0} wrapperStyle={{transform: "translateX(4px)"}}/>
                </RadialBarChart>
                <RadialBarChart
                    style={{position: 'absolute', right: spacing, bottom: spacing}}
                    width={this.state.size / 2.75}
                    height={this.state.size / 2.75}
                    data={data.slice(3, 4)}
                    innerRadius={this.state.size / 5}
                >
                    <PolarAngleAxis
                        type={"number"}
                        domain={[0, 100]}
                        angleAxisId={0}
                        tick={false}
                    />
                    <RadialBar
                        minAngle={0}
                        angleAxisId={0}
                        dataKey={"value"}
                        cornerRadius={"100%"}
                        background
                    >
                        <Cell fill={tint[3]}/>
                    </RadialBar>
                    <Legend verticalAlign={"middle"} align={"center"} iconSize={0} wrapperStyle={{transform: "translateX(4px)"}}/>
                </RadialBarChart>

            </div>
        )
    }
}

export class Trends extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            width: 500,
            height: 300,
            rounded: 20
        }
    }
    render() {
        const frame = {
            height: this.state.height,
            width: this.state.width,
            borderRadius: this.state.rounded
        }
        const tint = ["#A00", "#00A"]
        const data = [
            {
                name: 'Page A', key: 4000, pv: 2400, amt: 2400,
            },
            {
                name: 'Page B', uv: 3000, pv: 1398, amt: 2210,
            },
            {
                name: 'Page C', uv: 2000, pv: 9800, amt: 2290,
            },
            {
                name: 'Page D', uv: 2780, pv: 3908, amt: 2000,
            },
            {
                name: 'Page E', uv: 1890, pv: 4800, amt: 2181,
            },
            {
                name: 'Page F', uv: 2390, pv: 3800, amt: 2500,
            },
            {
                name: 'Page G', uv: 3490, pv: 4300, amt: 2100,
            },
        ];
        return (
            <div className={"Layer"} style={frame}>
                <LineChart
                    data={data}
                    width={this.state.width - 2 * this.state.rounded}
                    height={this.state.height - 2 * this.state.rounded}
                    margin={{
                        top: this.state.rounded,
                        left: this.state.rounded
                    }}
                >
                    <CartesianGrid/>
                    <XAxis/>
                    <YAxis/>
                    <Legend/>
                    <Line dataKey={"uv"}/>
                    <Line dataKey={"pv"}/>
                    {/*{linesConstructor(data, tint)}*/}
                </LineChart>
            </div>
        )
    }
}
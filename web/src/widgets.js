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
    YAxis, Line, BarChart, Bar
} from "recharts";
import './Controllers/Switch';
import MapFuture from "./Map";
import MapSwitch from "./Controllers/Switch";
// import {Layer, Rect, Stage} from "react-konva
// import {CircularProgress} from "@material-ui/core";

const transformToCentre = {
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
}

function linesConstructor(dataArray, tintArray, state) {
    const lines = dataArray.lines
    let converted = []
    let drawn = []
    lines.map(function (line, lineIndex) {
        line.values.map(function(y, x) {
            const partPoint = {}
            partPoint["index"] = x;
            partPoint[line.name] = y;
            converted[x] = Object.assign(partPoint, converted[x])
            return partPoint
        })
        drawn.push(
            <Line
                type={"monotone"}
                dot={{r: 6}}
                id={lineIndex}
                dataKey={line.name}
                stroke={tintArray[lineIndex]}
                strokeWidth={4}
            />
        )
        return converted
    })

    return (
        <LineChart
            data={converted}
            width={state.width - 2 * state.rounded}
            height={state.height - 2 * state.rounded}
            margin={{
                top: state.rounded * 2,
                left: state.rounded * 2
            }}
        >
            <Legend />
            {drawn}
        </LineChart>
    )
}

function barConstructor(dataArray, tintArray, state) {
    let keys = []
    dataArray.map(function (x) {
        keys.push(Object.keys(x))
        return x
    })
    keys = keys[0]
    console.log(keys)
     const barContent = keys.map(function (key, index) {
        return(
            <Bar
                dataKey={key}
                fill={tintArray[index]}
            />
        )
    })

    return(
        <BarChart
            data={dataArray}
            width={state.width}
            height={state.height}
            style={transformToCentre}
        >
            {barContent}
            <Legend />
        </BarChart>
    )
}

export class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {size: 240, rounded: 20}
    }
    render() {
        const spacing = this.state.rounded * 1.5
        const data = [{name: '摸鱼', value: 40}, {name: '摸到', value: 90}, {name: '意识', value: 60}, {name: '模糊', value: 70}];
        const tint = ["#137A7F", "#373B3E", "#E12885", "#66CCFF"]
        const frame = {height: "100%", width: "100%", borderRadius: this.state.rounded}
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

export class DashboardOne extends React.Component {
    constructor(props) {
        super(props);
        this.state = {size: 120, rounded: 20}
        this.setState({size: this.props.size})
    }
    greatLegend(value) {
        return (
            <span>{value}</span>
        )
    }
    render() {
        const data = {name: '鸽子力', value: 99};
        const tint = "#137A7F"
        const frame = {height: "100%", width: "100%", borderRadius: this.state.rounded, align: "center"}
        return (
            <div className={'Layer'} style={frame}>
                <RadialBarChart
                    data={[data]}
                    width={this.state.size}
                    height={this.state.size}
                    innerRadius={this.state.size / 2}
                    style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)"
                    }}
                >
                    <PolarAngleAxis
                        type={"number"}
                        domain={[0, 100]}
                        angleAxisId={0}
                        tick={false}
                    />
                    <RadialBar
                        angleAxisId={0}
                        dataKey={"value"}
                        cornerRadius={"100%"}
                        background
                    >
                        <Cell fill={tint}/>
                    </RadialBar>
                    <Legend
                        verticalAlign={"middle"}
                        align={"center"}
                        iconSize={0}
                        wrapperStyle={{transform: "translateX(4px)"}}
                        formatter={this.greatLegend}
                    />
                </RadialBarChart>
            </div>
        )
    }
}

export class Trends extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            width: 400,
            height: 300,
            rounded: 20
        }
    }
    render() {
        const frame = {
            height: "100%",
            width: "100%",
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
                        top: this.state.rounded * 2,
                        left: this.state.rounded * 2
                    }}
                >
                    <CartesianGrid/>
                    <XAxis/>
                    <YAxis/>
                    <Legend/>
                    <Line dataKey={"uv"} stroke={tint[0]} strokeWidth={4} dot={{r: 6}}/>
                    <Line dataKey={"pv"} stroke={tint[1]} strokeWidth={4} dot={{r: 6}}/>
                </LineChart>
            </div>
        )
    }
}

export class SimpleTrends extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            width: 400,
            height: 300,
            rounded: 20
        }
    }
    render() {
        const frame = {
            height: "100%",
            width: "100%",
            borderRadius: this.state.rounded
        }
        const tint = ["#EA0", "#08A"]
        const lineData = {
            xAxisMeasurement: "XExample",
            lines: [
                {
                    name: 'One',
                    values: [
                        4000,
                        5000,
                        3500,
                        5000
                    ]
                },
                {
                    name: "Two",
                    values: [
                        7500,
                        5560,
                        2280,
                        5600
                    ]
                },
            ]
        }
        return (
            <div className={"Layer"} style={frame}>
                {linesConstructor(lineData, tint, this.state)}
            </div>
        )
    }
}

export class SimpleBars extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            "width": 300,
            "height": 120,
            rounded: 20,
        }
    }
    render() {
        const data = {"uv": 900, "pv": 609}
        const tint = ["#998", "#753"]
        const frame = {
            "width": "100%",
            "height": "100%",
            "border-radius": this.state.rounded
        }
        return(
            <div className={"Layer"} style={frame}>
                {barConstructor([data], tint, this.state)}
            </div>
        )
    }
}

export class MapsBlock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rounded: 20,
            activated: "普通线路图"
        }
    }

    render() {
        return(
            <div className={"Layer"} style={{borderRadius: this.state.rounded}}>
                <MapSwitch switchOptions={["普通线路图","喵喵喵"]} state={this.state}
                    setState={(e) => (this.setState(e))}
                />
                <MapFuture />
            </div>
        )
    }
}
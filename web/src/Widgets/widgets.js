import React from "react";
import './style.css';
import {
    AreaChart, Area,
    RadialBarChart,
    RadialBar,
    PolarAngleAxis,
    Legend, Tooltip,
    Cell,
    LineChart,
    CartesianGrid,
    XAxis,
    YAxis, Line, BarChart, Bar
} from "recharts";
import '../Controllers/Switch';

const transformToCentre = {
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
}
const defaultRoundCorner = 20;

function setTintArray(propTintArray) {
    if (propTintArray !== undefined) {
        return propTintArray
    } else return ["#137A7F", "#373B3E", "#E12885", "#66CCFF"]
}
function constructData(propData, sampleData) {
    if (propData !== undefined) {
        if (propData == null) {
            console.warn("Null data received")
        }
        return propData
    } else return sampleData
}
function linesConstructor(dataArray, tintArray, state, tooltip) {
    const lines = dataArray.lines
    const tooltipElement = tooltip ? [<Tooltip/>] : []
    let converted = []
    let drawn = []
    lines.map(function (line, lineIndex) {
        line.values.map(function (y, x) {
            const partPoint = {}
            partPoint["index"] = x;
            partPoint[line.name] = y;
            converted[x] = Object.assign(partPoint, converted[x])
            return partPoint
        })
        drawn.push(
            <Line
                type={"monotone"}
                dot={{r: 3}}
                id={lineIndex}
                dataKey={line.name}
                stroke={tintArray[lineIndex]}
                strokeWidth={2}
            />
        )
        return converted
    })

    return (
        <LineChart
            data={converted}
            width={state.width}
            height={state.height}
            style={transformToCentre}
        >
            <Legend/>
            {tooltipElement}
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
    const barContent = keys.map(function (key, index) {
        return (
            <Bar
                dataKey={key}
                fill={tintArray[index]}
            />
        )
    })

    return (
        <BarChart
            data={dataArray}
            width={state.width}
            height={state.height}
            style={transformToCentre}
        >
            {barContent}
            <Legend/>
        </BarChart>
    )
}

export class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rounded: defaultRoundCorner,
        }
    }

    render() {
        let data = [{}, {}, {}, {}]
        try {
            this.props.data.map(function (value, index) {
                data[index] = value
                return true
            })
        }
        catch (e) {console.log('not yet okay... ')}
        const size = this.props.size * 2
        const spacing = size / 8
        const tint = ["#137A7F", "#373B3E", "#E12885", "#66CCFF"]
        const frame = {height: "100%", width: "100%", borderRadius: this.state.rounded}
        let nameLabel;
        if (this.props.children !== undefined) {
            nameLabel = [
                <label className={'widgetLabel'}>
                    {this.props.children}
                </label>
            ]
        }
        else {
            nameLabel = <React.Fragment/>
        }
        return (
            <div className={'Layer'} style={frame}>
                <RadialBarChart
                    style={{position: 'absolute', left: spacing, top: spacing}}
                    width={size / 2.5}
                    height={size / 2.5}
                    data={data.slice(0, 1)}
                    innerRadius={size / 4.75}
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
                    <Legend verticalAlign={"middle"} align={"center"} iconSize={0}
                            wrapperStyle={{transform: "translateX(4px)"}}/>
                </RadialBarChart>
                <RadialBarChart
                    style={{position: 'absolute', right: spacing, top: spacing}}
                    width={size / 2.5}
                    height={size / 2.5}
                    data={data.slice(1, 2)}
                    innerRadius={size / 4.75}
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
                    <Legend verticalAlign={"middle"} align={"center"} iconSize={0}
                            wrapperStyle={{transform: "translateX(4px)"}}/>
                </RadialBarChart>
                <RadialBarChart
                    style={{position: 'absolute', left: spacing, bottom: spacing}}
                    width={size / 2.5}
                    height={size / 2.5}
                    data={data.slice(2, 3)}
                    innerRadius={size / 4.75}
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
                    <Legend verticalAlign={"middle"} align={"center"} iconSize={0}
                            wrapperStyle={{transform: "translateX(4px)"}}/>
                </RadialBarChart>
                <RadialBarChart
                    style={{position: 'absolute', right: spacing, bottom: spacing}}
                    width={size / 2.5}
                    height={size / 2.5}
                    data={data.slice(3, 4)}
                    innerRadius={size / 4.75}
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
                    <Legend verticalAlign={"middle"} align={"center"} iconSize={0}
                            wrapperStyle={{transform: "translateX(4px)"}}/>
                </RadialBarChart>
                {nameLabel}
            </div>
        )
    }
}

export class DashboardOne extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rounded: defaultRoundCorner
        }
    }

    greatLegend(value) {
        return (<span>{value}</span>)
    }

    render() {
        const tint = "#137A7F"
        const frame = {height: "100%", width: "100%", borderRadius: this.state.rounded, align: "center"}
        const size = this.props.size
        let nameLabel;
        if (this.props.children !== undefined) {
            nameLabel = [
                <label className={'widgetLabel'}>
                    {this.props.children}
                </label>
            ]
        }
        else {
            nameLabel = <React.Fragment/>
        }
        return (
            <div className={'Layer'} style={frame}>
                <RadialBarChart
                    data={[this.props.data]}
                    width={size}
                    height={size}
                    innerRadius={size / 2}
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
                {nameLabel}
            </div>
        )
    }
}

export class Trends extends React.Component {
    constructor(props) {
        super(props);
        const mockData = [
            {
                name: 'Page A', uv: 4000, pv: 2400, amt: 2400,
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
        ]
        this.state = {
            rounded: defaultRoundCorner,
            name: this.props.children,
            data: this.props.data === undefined ? mockData : this.props.data
        }
    }


    render() {
        const port = this.props.port
        const frame = {
            borderRadius: this.state.rounded
        }
        const tint = ["#A00", "#00A"]
        let nameLabel;
        if (this.state.name !== undefined) {
            nameLabel = [
                <label className={'widgetLabel'}>
                    {this.props.children}
                </label>
            ]
        }
        else {
            nameLabel = <React.Fragment/>
        }

        return (
            <div className={"Layer"} style={frame}>
                <LineChart
                    data={this.state.data}
                    width={port.width}
                    height={port.height}
                    style={transformToCentre}
                >
                    <CartesianGrid/>
                    <XAxis/>
                    <YAxis/>
                    <Legend/>
                    <Line dataKey={"uv"} stroke={tint[0]} strokeWidth={2} dot={{r: 3}}/>
                    <Line dataKey={"pv"} stroke={tint[1]} strokeWidth={2} dot={{r: 3}}/>
                </LineChart>
                {nameLabel}
            </div>
        )
    }
}

export class SimpleTrends extends React.Component {
    constructor(props) {
        super(props);
        const mockData = {
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
        this.state = {
            rounded: defaultRoundCorner,
            name: this.props.children,
            data: this.props.data === undefined ? mockData : this.props.data,
        }
    }


    render() {
        const port = this.props.port
        const frame = {
            height: "100%",
            width: "100%",
            borderRadius: this.state.rounded
        }
        const tint = ["#EA0", "#08A"]
        let nameLabel;
        if (this.state.name !== undefined) {
            nameLabel = [
                <label className={'widgetLabel'}>
                    {this.props.children}
                </label>
            ]
        }
        else {
            nameLabel = <React.Fragment/>
        }

        return (
            <div className={"Layer"} style={frame}>
                {linesConstructor(this.state.data, tint, port, this.props.tooltip)}
                {nameLabel}
            </div>
        )
    }
}

export class SimpleBars extends React.Component {
    constructor(props) {
        super(props);
        const mockData = constructData(this.props.data, {"uv": 900, "pv": 609})
        this.state = {
            rounded: defaultRoundCorner,
            name: this.props.children,
            data: this.props.data === undefined ? mockData : this.props.data
        }
    }


    render() {
        const port = this.props.port
        const tint = setTintArray(this.props.tint)
        let nameLabel;
        if (this.state.name !== undefined) {
            nameLabel = [
                <label className={'widgetLabel'}>
                    {this.props.children}
                </label>
            ]
        }
        else {
            nameLabel = <React.Fragment/>
        }
        const frame = {
            "width": "100%",
            "height": "100%",
            "border-radius": this.state.rounded
        }
        return (
            <div className={"Layer"} style={frame}>
                {barConstructor([this.state.data], tint, port)}
                {nameLabel}
            </div>
        )
    }
}

export class AreaChartTrends extends React.Component {
    constructor(props) {
        super(props);
        const mockData = [
            {
                "name": "Page A",
                "uv": 4000,
                "pv": 2400,
                "amt": 2400
            },
            {
                "name": "Page B",
                "uv": 3000,
                "pv": 1398,
                "amt": 2210
            },
            {
                "name": "Page C",
                "uv": 2000,
                "pv": 9800,
                "amt": 2290
            },
            {
                "name": "Page D",
                "uv": 2780,
                "pv": 3908,
                "amt": 2000
            },
            {
                "name": "Page E",
                "uv": 1890,
                "pv": 4800,
                "amt": 2181
            },
            {
                "name": "Page F",
                "uv": 2390,
                "pv": 3800,
                "amt": 2500
            },
            {
                "name": "Page G",
                "uv": 3490,
                "pv": 4300,
                "amt": 2100
            }
        ]
        this.state = {
            rounded: defaultRoundCorner,
            name: this.props.children,
            data: this.props.data === undefined ? mockData : this.props.data
        }
    }


    render() {
        const port = this.props.port
        const frame = {
            borderRadius: this.state.rounded
        }
        return (
            <div
                className={'Layer'}
                style={frame}
            >
                <AreaChart
                    width={port.width}
                    height={port.height}
                    data={this.state.data}
                    style={transformToCentre}
                >
                    <defs>
                        <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
                        </linearGradient>
                    </defs>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip />
                    <Area type="monotone" dataKey="uv" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
                    <Area type="monotone" dataKey="pv" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" />
                </AreaChart>
            </div>
        )
    }
}
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
    YAxis, Line, BarChart, Bar, LabelList
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
function makeAvailable(thing) {
    if (thing !== undefined) {return thing}
    return (<React.Fragment/>)
}
function fixDictionaryKeys(data, theKeys, zoom) {
    let emptyData = [{}, {}, {}, {}]
    const zoomSet = zoom === undefined ? 1 : zoom
    const theKeysSet = theKeys === undefined ? ['name', 'value'] : theKeys
    try {
        data.map(function (value, index) {
            emptyData[index] = {'name': value[theKeysSet[0]], 'value': value[theKeysSet[1]] * zoomSet}
            return emptyData
        }, emptyData, theKeysSet, zoomSet)
    }
    catch (e) {}
    return emptyData
}
function makeDictionaryPairs(data, theKeys) {
    let newDictionary = {}
    try {
        data.map(function (value) {
            const key = value[theKeys[0]]
            newDictionary[key] = value[theKeys[1]]
            return true
        }, theKeys)
        console.log(newDictionary)
    }
    catch (e) {}
    return newDictionary
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
function barConstructor(dataArray, tintArray, state, label) {
    let keys = []
    dataArray.map(function (x) {
        keys.push(Object.keys(x))
        return x
    })
    keys = keys[0]
    const barContent = keys.map(function (key, index) {
        let labelSet = []
        if (label === true) {
            labelSet = [<LabelList dataKey={key} position="top" style={{fill: 'var(--themeColor)'}}/>]

        }
        return (
            <Bar
                dataKey={key}
                fill={tintArray[index]}
            >
                {labelSet}
            </Bar>
        )
    }, label)

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
    render() {
        const data = fixDictionaryKeys(this.props.data, this.props.keys, this.props.zoom)
        const size = this.props.size * 1.25
        const innerRadius = size / 3.75
        const spacing = 0
        const tint = this.props.tint === undefined ? ["#137A7F", "#373B3E", "#E12885", "#66CCFF"] : this.props.tint
        const frame = {height: "100%", width: "100%", borderRadius: defaultRoundCorner}
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
                    width={size}
                    height={size}
                    data={data.slice(0, 1)}
                    innerRadius={innerRadius}
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
                        background={{fill: 'var(--themeControlBackground)'}}
                    >
                        <Cell fill={tint[0]}/>
                    </RadialBar>
                    <Legend verticalAlign={"middle"} align={"center"} iconSize={0}
                            wrapperStyle={{transform: "translateX(4px)"}}/>
                </RadialBarChart>
                <RadialBarChart
                    style={{position: 'absolute', right: spacing, top: spacing}}
                    width={size}
                    height={size}
                    data={data.slice(1, 2)}
                    innerRadius={innerRadius}
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
                        background={{fill: 'var(--themeControlBackground)'}}
                    >
                        <Cell fill={tint[1]}/>
                    </RadialBar>
                    <Legend verticalAlign={"middle"} align={"center"} iconSize={0}
                            wrapperStyle={{transform: "translateX(4px)"}}/>
                </RadialBarChart>
                <RadialBarChart
                    style={{position: 'absolute', left: spacing, bottom: spacing}}
                    width={size}
                    height={size}
                    data={data.slice(2, 3)}
                    innerRadius={innerRadius}
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
                        background={{fill: 'var(--themeControlBackground)'}}
                    >
                        <Cell fill={tint[2]}/>
                    </RadialBar>
                    <Legend verticalAlign={"middle"} align={"center"} iconSize={0}
                            wrapperStyle={{transform: "translateX(4px)"}}/>
                </RadialBarChart>
                <RadialBarChart
                    style={{position: 'absolute', right: spacing, bottom: spacing}}
                    width={size}
                    height={size}
                    data={data.slice(3, 4)}
                    innerRadius={innerRadius}
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
                        background={{fill: 'var(--themeControlBackground)'}}
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
    greatLegend(value) {
        return (<span>{value}</span>)
    }

    render() {
        const tint = this.props.tint === undefined ? "#137A7F" : this.props.tint
        const frame = {height: "100%", width: "100%", borderRadius: defaultRoundCorner, align: "center"}
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
                        background={{fill: 'var(--themeControlBackground)'}}
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
            name: this.props.children,
            data: this.props.data === undefined ? mockData : this.props.data
        }
    }


    render() {
        const port = this.props.port
        const frame = {borderRadius: defaultRoundCorner}
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
    render() {
        const port = this.props.port
        const frame = {
            height: "100%",
            width: "100%",
            borderRadius: defaultRoundCorner
        }
        const tint = this.props.tint === undefined ? ["#EA0", "#08A"] : this.props.tint
        const dataToConstruct = fixDictionaryKeys(this.props.data, this.props.keys)
        let nameLabel = makeAvailable(this.props.children)

        return (
            <div className={"Layer"} style={frame}>
                {linesConstructor(dataToConstruct, tint, port, this.props.tooltip)}
                <label className={'widgetLabel'}>
                    {nameLabel}
                </label>
            </div>
        )
    }
}

export class SimpleBars extends React.Component {
    componentDidMount() {
        this.render()
    }

    render() {
        const dataToConstruct = this.props.keys === undefined ? this.props.data : makeDictionaryPairs(this.props.data, this.props.keys)
        const port = this.props.port
        const tint = setTintArray(this.props.tint)
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
        const frame = {
            "width": "100%",
            "height": "100%",
            "border-radius": defaultRoundCorner
        }
        return (
            <div className={"Layer"} style={frame}>
                {barConstructor([dataToConstruct], tint, port, this.props.label)}
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
            name: this.props.children,
            data: this.props.data === undefined ? mockData : this.props.data
        }
    }


    render() {
        const port = this.props.port
        const frame = {
            borderRadius: defaultRoundCorner
        }
        return (
            <div className={'Layer'} style={frame}>
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
                <label className={'widgetLabel'}>
                    {makeAvailable(this.props.children)}
                </label>
            </div>
        )
    }
}

export class GreatLegends extends React.Component {
    getFromData(data, index, key) {
        try {return data[index][key]}
        catch (error) {}
        return undefined
    }
    makeEmpty(inside) {
        return (inside === null || inside === undefined) ? '--' : inside
    }
    render() {
        const frame = {
            "width": "100%",
            "height": "100%",
            "border-radius": defaultRoundCorner
        }
        if (this.props.type === 'array')
        return (
            <div className={"Layer"} style={frame}>
                <div className={'GLContainer'}>
                    <div className={'GLName'}>
                        {this.getFromData(this.props.data, this.props.index, this.props.keys[0])}
                    </div>
                    <div className={'GLValue'}>
                        {this.makeEmpty(this.getFromData(this.props.data, this.props.index, this.props.keys[1]))}
                    </div>
                </div>
                <label className={'widgetLabel'}>
                    {makeAvailable(this.props.children)}
                </label>
            </div>
        )
        if (this.props.type === 'straight') {
            return (
                <div className={'Layer'} style={frame}>
                    <div className={'GLContainer'}>
                        <div className="GLName">
                            {this.props.name}
                        </div>
                        <div className="GLValue">
                            {this.makeEmpty(this.props.value)}
                        </div>
                    </div>
                    <label className={'widgetLabel'}>
                        {makeAvailable(this.props.children)}
                    </label>
                </div>
            )
        }
        return (<React.Fragment/>)
    }
}
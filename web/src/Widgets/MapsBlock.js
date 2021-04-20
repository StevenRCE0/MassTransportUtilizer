import React, { Suspense } from "react";
import store, { mapsStore } from "../Store";
import {
    Button as MaterialButton,
    Card, CardActions, CardContent, Typography,
    FormControl, FormControlLabel, FormGroup, FormLabel,
    Fade, Modal,
    Checkbox, Slider, Select, MenuItem, TextField, InputLabel,
} from "@material-ui/core";
import MapSwitch from "../Controllers/Switch";
import { Button } from "../Controllers/Button";
import { KeyboardDateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import axios from "axios";
import moment from "moment";

const MapFuture = React.lazy(() => import('./Map'));
const PassengerMaps = React.lazy(() => import('./PassengerMaps'))
const defaultRoundCorner = 20;
const transformToCentre = {
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
}

function predictionRequest(userArguments) {
    try {
        axios.post('/python/predict', {
            station: userArguments.boom.station,
            flow: userArguments.boom.flow,
            dayprop: userArguments.holiday,
            weather: userArguments.weather.condition,
            temperatures: [userArguments.weather.temperature.low, userArguments.weather.temperature.high],
        })
            .then(response => {console.log(response)})
    }
    catch (error) {
        console.error(error);
    }
}

export class MapsBlock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            datePicker: false,
            argumentPicker: false,
            activated: "无",
            selectedTime: new Date(store.getState().timeline),
            flowStats: true,
            storeState: store.getState(),
            mapsState: mapsStore.getState(),
            userArguments: {
                holiday: undefined,
                weather: {
                    enabled: false,
                    condition: '阴',
                    temperature: {
                        low: undefined,
                        high: undefined
                    }
                },
                boom: {
                    enabled: false,
                    station: undefined,
                    flow: undefined,
                    type: 0,
                    failure: false,
                }
            }
        }
        store.subscribe(() => this.setState({storeState: store.getState()}))
        mapsStore.subscribe(() => this.setState({mapsState: mapsStore.getState()}))
    }

    handleOpen(modal) {
        if (modal === 'datePicker') {this.setState({datePicker: !this.state.datePicker})}
        if (modal === 'argumentPicker') {this.setState({argumentPicker: !this.state.argumentPicker})}
    }
    handleTime(e) {
        this.setState({selectedTime: e})
    }
    handleChange(e, argument) {
        let newArguments = this.state.userArguments
        if (argument === 'holiday') {
            newArguments.holiday = e.target.checked
        }
        if (argument === 'boomTick') {
            newArguments.boom.enabled = e.target.checked
        }
        if (argument === 'boomType') {
            newArguments.boom.type = e.target.value
        }
        if (argument === 'boom') {
            newArguments.boom.station = this.state.stationSpectating
            newArguments.boom.flow = e
        }
        if (argument === 'weatherTick') {
            newArguments.weather.enabled = e.target.checked
        }
        if (argument === 'weatherTemperatureLow') {
            newArguments.weather.temperature.low = e.target.value
        }
        if (argument === 'weatherTemperatureHigh') {
            newArguments.weather.temperature.high = e.target.value
        }
        if (argument === 'weather') {
            newArguments.weather.condition = e.target.value
        }
        if (argument === 'failure') {
            newArguments.boom.failure = e.target.checked
        }
        this.setState({userArguments: newArguments})
    }
    handlePredictionUpdate(type) {
        predictionRequest(this.state.userArguments, type)
        alert('预测请求已经提交'+this.state.userArguments.boom.flow)
        this.handleOpen('argumentPicker')
    }
    handleTimeUpdate() {
        store.dispatch({
            type: 'timeUpdate',
            time: this.state.selectedTime
        })
        mapsStore.dispatch({
            type: 'refresh'
        })
        this.handleOpen('datePicker')
    }
    triggerStats() {
        this.setState({flowStats: !this.state.flowStats})
    }
    getStats() {
        return(
            <table className={'MapTable'}>
                <tr>
                    <td>线路</td>
                    <td>{this.state.mapsState.lineSpectating}</td>
                </tr>
                <tr>
                    <td>断面客流</td>
                    <td>{this.state.mapsState.stationSpectating.flow}</td>
                </tr>
                <tr>
                    <td>高峰时段</td>
                    <td>9:00</td>
                </tr>
            </table>
        )
    }
    stationArguments() {
        if (this.state.stationSpectating === 'No') {
            return (
                <FormLabel component={'legend'}>没有选择站点</FormLabel>
            )
        }
        else {
            return (
                <React.Fragment>
                    <FormLabel component={'legend'}>{this.state.mapsState.stationSpectating.station}</FormLabel>
                    <FormGroup>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={this.state.userArguments.holiday}
                                    onChange={(event) => this.handleChange(event, 'failure')}
                                />
                            }
                            label={'故障'}
                        />
                        <FormGroup>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={this.state.userArguments.boom.enabled}
                                        onChange={(event) => this.handleChange(event, 'boomTick')}
                                    />
                                }
                                label={'突发客流'}
                            />
                            <FormGroup row>
                                <Select
                                    labelId={'客流类型'}
                                    id={'客流类型'}
                                    value={this.state.userArguments.boom.type}
                                    disabled={!this.state.userArguments.boom.enabled}
                                    onChange={(event) => this.handleChange(event, 'boomType')}
                                    style={{width: '100%'}}
                                >
                                    <MenuItem value={0}>进站</MenuItem>
                                    <MenuItem value={1}>出站</MenuItem>
                                    <MenuItem value={2}>进站加</MenuItem>
                                    <MenuItem value={3}>出站加</MenuItem>
                                </Select>
                            </FormGroup>
                            <FormGroup row>
                                <Slider
                                    defaultValue={3000}
                                    valueLabelDisplay="auto"
                                    step={10}
                                    marks
                                    min={10}
                                    max={110}
                                    disabled={!this.state.userArguments.boom.enabled}
                                    onChange={(foo, event) => this.handleChange(event, 'boom')}
                                />
                            </FormGroup>
                        </FormGroup>

                    </FormGroup>
                </React.Fragment>
            )
        }
    }

    render() {
        return (
            <div className={"Layer"} style={{borderRadius: defaultRoundCorner}}>
                <div
                    className={"MapStats"}
                    style={{
                        opacity: (this.state.flowStats) ? 1 : 0,
                        userSelect: (this.state.flowStats) ? "text" : "none",
                        cursor: (this.state.flowStats) ? "text" : "default"
                    }}
                >
                    {this.getStats()}
                </div>
                <div className={'MapTimestamp'}>
                    <span>预览时间线</span>
                    <span className={this.state.storeState.timeNoGo === true ? '' : 'noGo'}>{this.state.storeState.timeNoGo === true ? '数据可用' : '该时间无数据'}</span>
                    <br />
                    <span className={'TimestampDate'}>
                        {moment(this.state.storeState.timeline).format('MM-DD-YYYY HH:MM')}
                    </span>
                </div>
                <div className={"MapControllers"}>
                    <MapSwitch
                        switchOptions={["无", "热力图"]}
                        setState={(e) => (this.setState(e))}
                        state={this.state}
                    />
                    <div style={{display: "flex", flexDirection: 'row', justifyContent: 'space-between'}}>
                        <Button onClick={() => this.handleOpen('datePicker')}>
                            日期
                        </Button>
                        <div style={{width: '.5em'}}/>
                        <Button onClick={() => store.dispatch({type: 'timeUpdate', live: true})}>
                            实时
                        </Button>
                    </div>

                    <Button onClick={() => this.triggerStats()}>
                        {(this.state.flowStats) ? '隐藏' : '显示'}数据
                    </Button>
                    {this.state.flowStats ? <Button onClick={() => this.handleOpen('argumentPicker')}>模拟数据变更</Button> : ''}
                    <Modal open={this.state.datePicker}>
                        <Fade in={this.state.datePicker}>
                            <Card className={"Panel"} style={transformToCentre}>
                                <CardContent>
                                    <Typography gutterBottom variant={"h5"} component={"h2"}>
                                        选择日期
                                    </Typography>
                                </CardContent>
                                <div style={{margin: "0 20px"}}>
                                    <MuiPickersUtilsProvider utils={MomentUtils}>
                                        <KeyboardDateTimePicker
                                            value={this.state.selectedTime}
                                            onChange={(e) => this.handleTime(e)}
                                        />
                                    </MuiPickersUtilsProvider>
                                </div>
                                <CardActions>
                                    <MaterialButton
                                        size={"small"}
                                        color={"primary"}
                                        onClick={() => this.handleTimeUpdate(this.state.storeState.time)}
                                    >
                                        完成
                                    </MaterialButton>
                                    <MaterialButton
                                        size={"small"}
                                        color={"default"}
                                        onClick={() => this.handleOpen('datePicker')}>
                                        取消
                                    </MaterialButton>
                                </CardActions>
                            </Card>
                        </Fade>
                    </Modal>
                    <Modal open={this.state.argumentPicker}>
                        <Fade in={this.state.argumentPicker}>
                            <Card style={transformToCentre}>
                                <CardContent>
                                    <Typography gutterBottom variant={"h5"} component={"h2"}>
                                        输入参数
                                    </Typography>
                                    <div className={'DualPanel'}>
                                        <FormControl component={'fieldset'}>
                                            <FormLabel component={'legend'}>该时间操作</FormLabel>
                                            <FormGroup row>
                                                <FormControlLabel
                                                    control={
                                                        <Checkbox
                                                            checked={this.state.userArguments.holiday}
                                                            onChange={this.state}
                                                        />
                                                    }
                                                    label={'放假'}
                                                />
                                            </FormGroup>
                                            <FormGroup>
                                                <FormControlLabel
                                                    control={
                                                        <Checkbox
                                                            checked={this.state.userArguments.weather.enabled}
                                                            onChange={(event) => this.handleChange(event, 'weatherTick')}
                                                        />
                                                    }
                                                    label={'变更天气'}
                                                />
                                                <FormGroup>
                                                    <FormControl>
                                                        <InputLabel id={'天气选择标签'}>
                                                            天气类型
                                                        </InputLabel>
                                                        <Select
                                                            labelId="天气选择"
                                                            id="天气选择"
                                                            value={this.state.userArguments.weather.condition}
                                                            disabled={!this.state.userArguments.weather.enabled}
                                                            onChange={(event) => this.handleChange(event, 'weather')}
                                                        >
                                                            <MenuItem value={'阴'}>阴</MenuItem>
                                                            <MenuItem value={'晴'}>晴</MenuItem>
                                                            <MenuItem value={'多云'}>多云</MenuItem>
                                                            <MenuItem value={'小雨'}>小雨</MenuItem>
                                                            <MenuItem value={'中雨'}>中雨</MenuItem>
                                                            <MenuItem value={'大雨'}>大雨</MenuItem>
                                                            <MenuItem value={'中雨'}>暴雨</MenuItem>
                                                            <MenuItem value={'雷阵雨'}>雷阵雨</MenuItem>
                                                        </Select>
                                                    </FormControl>

                                                    <TextField
                                                        id={'最低温度输入'}
                                                        label={'输入最低摄氏温度'}
                                                        type={'number'}
                                                        style={{marginTop: 15}}
                                                        InputLabelProps={{shrink: true,}}
                                                        disabled={!this.state.userArguments.weather.enabled}
                                                        onChange={(event) => this.handleChange(event, 'weatherTemperatureLow')}
                                                    />
                                                    <TextField
                                                        id={'最高温度输入'}
                                                        label={'输入最高摄氏温度'}
                                                        type={'number'}
                                                        style={{marginTop: 15}}
                                                        InputLabelProps={{shrink: true,}}
                                                        disabled={!this.state.userArguments.weather.enabled}
                                                        onChange={(event) => this.handleChange(event, 'weatherTemperatureHigh')}
                                                    />
                                                </FormGroup>
                                            </FormGroup>
                                        </FormControl>
                                        <br />
                                        <FormControl component={'fieldset'}>
                                            {this.stationArguments()}
                                        </FormControl>
                                    </div>
                                </CardContent>
                                <CardActions>
                                    <MaterialButton size={"small"} color={"primary"} onClick={() => this.handlePredictionUpdate('meow')}>
                                        完成
                                    </MaterialButton>
                                    <MaterialButton size={"small"} color={"default"} onClick={() => this.handleOpen('argumentPicker')}>
                                        取消
                                    </MaterialButton>
                                </CardActions>
                            </Card>
                        </Fade>
                    </Modal>
                </div>
                <div className={'Huge'} style={transformToCentre}>
                    <Suspense fallback={<div className={"MLPlaceholder"}>地图正在加载……</div>}>
                        <MapFuture
                            height={this.props.port.height}
                            width={this.props.port.width}
                            mode={this.state.activated}
                        />
                    </Suspense>
                </div>
            </div>
        )
    }
}

export class PassengerMapsBlock extends React.Component {
    render() {
        return (
            <div className={'Layer'} style={{borderRadius: defaultRoundCorner}}>
                <div className={'Huge'} style={transformToCentre}>
                    <Suspense fallback={<div className={'MLPlaceholder'}>乘客画像地图正在加载……</div>}>
                        <PassengerMaps
                            height={this.props.port.height}
                            width={this.props.port.width}
                        />
                    </Suspense>
                </div>
            </div>
        )
    }
}
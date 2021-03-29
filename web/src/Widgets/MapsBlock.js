import React, { Suspense } from "react";
import store from "../Store";
import {
    Button as MaterialButton,
    Card, CardActions,
    CardContent,
    Checkbox,
    Fade, FormControl,
    FormControlLabel,
    FormGroup,
    FormLabel,
    Modal,
    Slider, Typography
} from "@material-ui/core";
import MapSwitch from "../Controllers/Switch";
import {Button} from "../Controllers/Button";
import {KeyboardDateTimePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";

const MapFuture = React.lazy(() => import('./Map'));

const transformToCentre = {
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
}

export class MapsBlock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rounded: 20,
            datePicker: false,
            argumentPicker: false,
            activated: "无",
            selectedTime: new Date(),
            flowStats: true,
            lineSpectating: store.getState().lineSpectating,
            stationSpectating: store.getState().stationSpectating,
            userArguments: {holiday: undefined, boom: {enabled: false, station: undefined, flow: undefined}}
        }
        this.storeChange = this.storeChange.bind(this)
        store.subscribe(this.storeChange)
    }

    storeChange(){
        this.setState(store.getState())
    }

    handleOpen(modal) {
        if (modal === 'datePicker') {this.setState({datePicker: !this.state.datePicker})}
        if (modal === 'argumentPicker') {this.setState({argumentPicker: !this.state.argumentPicker})}
    }
    handleTime(e) {
        this.setState({time: e})
    }
    handleChange(e, argument) {

        const defaultBoomFlow = 3000

        let newArguments = this.state.userArguments
        if (argument === 'holiday') {
            newArguments.holiday = e.target.checked
        }
        if (argument === 'boom') {
            newArguments.boom.enabled = e.target.checked
            if (e.target.checked) {
                newArguments.boom.station = this.state.stationSpectating
                newArguments.boom.flow = defaultBoomFlow
            }
        }
        this.setState({userArguments: newArguments})
    }
    triggerStats() {
        this.setState({flowStats: !this.state.flowStats})
    }
    getStats() {
        return(
            <table className={'MapTable'}>
                <tr>
                    <td>线路</td>
                    <td>{this.state.lineSpectating}</td>
                </tr>
                <tr>
                    <td>客流量</td>
                    <td>99</td>
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
                    <FormLabel component={'legend'}>{this.state.stationSpectating}</FormLabel>
                    <FormGroup>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={this.state.userArguments.holiday}
                                    onChange={this.state}
                                />
                            }
                            label={'故障'}
                        />
                        <FormGroup>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={this.state.userArguments.boom.enabled}
                                        onChange={(e) => this.handleChange(e, 'boom')}
                                    />
                                }
                                label={'突发客流'}
                            />
                            <FormGroup row>
                                <Slider
                                    defaultValue={3000}
                                    valueLabelDisplay="auto"
                                    step={10}
                                    marks
                                    min={10}
                                    max={110}
                                    disabled={!this.state.userArguments.boom.enabled}
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
            <div className={"Layer"} style={{borderRadius: this.state.rounded}}>
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
                <div className={"MapControllers"}>
                    <MapSwitch switchOptions={["无", "热力图"]} state={this.state}
                               setState={(e) => (this.setState(e))}
                    />
                    <Button onClick={() => this.handleOpen('datePicker')}>
                        选择日期
                    </Button>
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
                                            value={this.state.time}
                                            onChange={(e) => this.handleTime(e)}
                                        />
                                    </MuiPickersUtilsProvider>
                                </div>
                                <CardActions>
                                    <MaterialButton size={"small"} color={"primary"}>
                                        完成
                                    </MaterialButton>
                                    <MaterialButton size={"small"} color={"default"} onClick={() => this.handleOpen('datePicker')}>
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
                                                label={'是假期'}
                                            />
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        checked={this.state.userArguments.holiday}
                                                        onChange={this.state}
                                                    />
                                                }
                                                label={'天气'}
                                            />
                                        </FormGroup>
                                    </FormControl>
                                    <br />
                                    <FormControl component={'fieldset'}>
                                        {this.stationArguments()}
                                    </FormControl>

                                </CardContent>
                                <CardActions>
                                    <MaterialButton size={"small"} color={"primary"}>
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
                <div style={transformToCentre}>
                    <Suspense fallback={<div className={"MLPlaceholder"}>Maps loading...</div>}>
                        <div style={{transform: 'translate(+7%, +5%)'}}>
                            <MapFuture
                                height={this.props.port.height}
                                width={this.props.port.width}
                                mode={this.state.activated}
                            />
                        </div>
                    </Suspense>
                </div>
            </div>
        )
    }
}
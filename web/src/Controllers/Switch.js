import React from "react";
import store from "../Store";
import "./style.css";

class MapSwitch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            "allOptions": this.props.switchOptions,
        }
    }
    componentDidMount() {
        this.setState({"activated": this.state.allOptions[0]})
    }
    enumOptions(props, setState) {
        let optionsController = []
        let index = 0
        this.state.allOptions.forEach(
            function (perOption) {
                let acClass = "SwitchTick"
                if (props.activated === perOption) {
                    acClass += " activated"
                }
                optionsController.push(
                    <button
                        id={perOption}
                        key={index}
                        onClick={() => (
                            setState({"activated": perOption})
                        )}
                        className={acClass}
                    >
                        {perOption}
                    </button>
                )
                index++;
            }
        )
        return optionsController
    }

    render() {
        return(
            <div
                className={"SwitchBase"}
            >
                {this.enumOptions(this.props.state, this.props.setState)}
            </div>
        )
    }
}

export class ThemeSwitch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            store: store.getState()
        }
    }
    themeNames = ['深色', '浅色']
    enumOptions() {
        let optionsController = []
        let index = 0
        this.themeNames.forEach(
            function (perOption) {
                const {theme} = store.getState()
                const themeOptions = ['dark', 'light']
                let acClass = "SwitchTick"
                if (theme === themeOptions[index]) {
                    acClass += " activated"
                }
                optionsController.push(
                    <button
                        id={perOption}
                        key={index}
                        onClick={() => {
                            store.dispatch({
                                type: 'switchTheme'
                            })
                        }}
                        className={acClass}
                    >
                        {perOption}
                    </button>
                )
                index++;
            }
        )
        return optionsController
    }
    dispatchTheme(value) {
        store.dispatch({
            type: 'switchTheme',
            theme: value
        })
    }

    render() {
        return(
            <React.Fragment>
                <div
                    id={'controller-theme-switch'}
                    className={"SwitchBase"}
                    style={{position: 'absolute'}}
                >
                    {this.enumOptions()}
                </div>
                <div style={{height: 'calc(11pt + 30px)'}}/>
            </React.Fragment>
        )
    }
}

export default MapSwitch;